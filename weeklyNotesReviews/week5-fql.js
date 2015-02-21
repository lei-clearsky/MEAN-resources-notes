// Lei's solution

// Adds properties of obj2 into obj1
function merge(obj1, obj2) {
	var mergedObj = {};

	forEach(arguments, function(argument){
		for (var key in argument){
			mergedObj[key] = argument[key];
		}
	});	

	return mergedObj;
}

// every function using reduce
function every(arr, func) {
	var everyChecker = function(current, next) {
		return current && func(next);
	}
	return reduce(arr, true, everyChecker);
}

// reduce
function reduce(arr, startNum, reduceFunc) {
	var currentNum = startNum;
	forEach(arr, function(el) {
		currentNum = reduceFunc(currentNum, el);
	});
	return currentNum;
}

function forEach(arr, func) {
	for (var i = 0, len = arr.length; i < len; i++)
		func(arr[i]);
}


var FQL = function(data) {
	this.data = data;
};

FQL.prototype.exec = function() {
	return this.data;
}

FQL.prototype.count = function() {
	return this.data.length;
}

FQL.prototype.limit = function(limitLen) {
	this.data = this.data.slice(0, limitLen);
	return this;
}

FQL.prototype.where = function(searchObj) {
	var thisData = this.data;
	var searchResult = [];
	var searchQueryArr = [];
	// for (var key in searchObj) {
	// 	forEach(tempData, function(obj) {
	// 		if (typeof searchObj[key] === 'function') {
	// 			if (searchObj[key](obj[key]))
	// 				searchResult.push(obj);

	// 		} else {
	// 			if (obj[key] === searchObj[key])
	// 				searchResult.push(obj);
	// 		}

	// 	});
	// }


	// forEach(thisData, function(obj) {
	// 	for (var key in searchObj) {
	// 		if (typeof searchObj[key] === 'function') {
	// 			searchQueryArr.push(searchObj[key](obj[key]));

	// 		} else {
	// 			searchQueryArr.push(obj[key] === searchObj[key]);
	// 		}
	// 	}

	// 	if (every(searchQueryArr, function(next){
	// 		return next;
	// 	})){
	// 		searchResult.push(obj);
	// 	}
	// 	searchQueryArr = [];
			
	// });
	// // console.log(searchResult);
	// this.data = searchResult;
	// return this;
	
	var indexTableIndex = this.data.length - 1;

	for (var key in searchObj) {
		if (this.data[indexTableIndex] && this.data[indexTableIndex]['index'] !== undefined && typeof searchObj[key] !== 'function') {
			//console.log('test');
			//this.getIndicesOf(key, searchObj[key]);
			var indices = this.getIndicesOf(key, searchObj[key]);
			var thisData = this.data;
			searchQueryArr = [];
			forEach(indices, function(index) {				
				searchQueryArr.push(thisData[index]);
			})
			this.data = searchQueryArr;
		} else {
			if (typeof searchObj[key] === 'function') {
				searchQueryArr = [];
				forEach(this.data, function(obj) {
					if (searchObj[key](obj[key])) {
						searchQueryArr.push(obj);
					}
				});
				this.data = searchQueryArr;
			} else {

				searchQueryArr = [];
				forEach(this.data, function(obj) {
					// if (obj[key] === searchObj[key]) {
					if (obj[key] === searchObj[key]) {
						searchQueryArr.push(obj);
					}
				});
				//console.log(this.data);
				this.data = searchQueryArr;
			}
		}
	}

	// for (var key in searchObj) {
	// 	if (typeof searchObj[key] === 'function') {
	// 		reduceData(searchObj[key](obj[key]));
	// 	} else {
	// 		reduceData(searchObj[key](obj[key]));
	// 	}
	// }

	// function reduceData (statement) {
	// 	searchQueryArr = [];
	// 	forEach(this.data, function(obj) {
	// 		if (statement]) {
	// 			searchQueryArr.push(obj);
	// 		}
	// 	});
	// 	this.data = searchQueryArr;
	// }

	return this;

}

FQL.prototype.select = function(selectArr) {
	var thisData = this.data;
	var selectedData = [];

	forEach(thisData, function(obj){
		var selectedObj = {};
		for (var i = 0; i < selectArr.length; i ++) {
			selectedObj[selectArr[i]] = obj[selectArr[i]];
		}
		selectedData.push(selectedObj);
			
	});

	this.data = selectedData;
	return this;
}

FQL.prototype.order = function(orderStr) {
	var thisData = this.data;
	thisData.sort(function (a, b) {
	  if (a[orderStr] > b[orderStr]) {
	    return 1;
	  }
	  if (a[orderStr] < b[orderStr]) {
	    return -1;
	  }
	  // a must be equal to b
	  return 0;
	});
	this.data = thisData;
	return this;
}

FQL.prototype.left_join = function(tableArr, func) {
	
	var thisData = this.data;
	var resultData = [];
	forEach(thisData, function(obj){
		forEach(tableArr.data, function(obj2){
			if (func(obj, obj2)) {
				resultData.push(merge(obj, obj2));
			}
				
		});
	});
	
	// for (var i = 0; i < thisData.length; i++){
	// 	//console.log('table array length is ' , tableArr);
	// 	for (var j = 0; j < tableArr.data.length; j++){
	// 		//console.log('test');
	// 		if (func(thisData[i], tableArr.data[j])) {
	// 			resultData.push(merge(thisData[i], tableArr.data[j]));
	// 			//console.log('obj: ' + thisData[i]);
	// 		}	
	// 	}			
	// }

	this.data = resultData;
	return this;
}

// FQL.prototype.addIndex = function(indexName) {
// 	var indexTable = {};
// 	indexTable[indexName] = {};

// 	for (var i = 0; i < this.data.length; i ++) {

// 		var newIndexKey = this.data[i][indexName].toString();

// 		if (indexTable[indexName][newIndexKey] !== undefined) {
// 			indexTable[indexName][newIndexKey].push(i);
// 		} else {
// 			indexTable[indexName][newIndexKey] = [];
// 			indexTable[indexName][newIndexKey].push(i);
// 		}		
// 	}
// 	this.data.push(indexTable);
// 	return this;
// }

// FQL.prototype.getIndicesOf = function (indexTable, key) {
// 	var indexTableIndex = this.data.length - 1;
// 	if (this.data[indexTableIndex][indexTable] == undefined) {
// 		return undefined;
// 	} else {
// 		return this.data[indexTableIndex][indexTable][key];
// 	}
		
// }


FQL.prototype.addIndex = function(indexName) {
	var indexTableIndex = this.data.length - 1;
	var indexTables = {index: {}};
	if (this.data[indexTableIndex]['index'] === undefined) {
		this.data.push(indexTables);
	}
	var indexTable = {};
	//indexTable[indexName] = {};

	for (var i = 0; i < indexTableIndex + 1; i ++) {

		var newIndexKey = this.data[i][indexName];

		if (indexTable[newIndexKey] !== undefined) {
			indexTable[newIndexKey].push(i);
		} else {
			indexTable[newIndexKey] = [];
			indexTable[newIndexKey].push(i);
		}		
	}
	//console.log(this.data[this.data.length - 1]);
	this.data[this.data.length - 1]['index'][indexName] = indexTable;
	return this;
}

FQL.prototype.getIndicesOf = function (indexTable, key) {
	var indexTableIndex = this.data.length - 1;
	if (this.data[indexTableIndex]['index'] === undefined) {
		return undefined;
	} else {
		return this.data[indexTableIndex]['index'][indexTable][key];
	}
		
}

// Norman's solution

// Place your code here:

// Adds properties of obj2 into obj1
function merge(obj1, obj2) {
   for (var key in obj2) {
        obj1[key] = obj2[key]
      };
      return obj1;
};


var FQL = function(data) {
    this.data = data;
};

FQL.prototype.exec = function() {
    return this.data
};

FQL.prototype.count = function() {
    return this.data.length;
};

FQL.prototype.limit = function(val) {
    this.data = this.data.slice(0, val);
    return this;
};

FQL.prototype.where = function(searchObj) {    
    var resultsArr = [];
    var tempArr = [];
    
    for (var key in searchObj) {
        if (this[key]) {
            for (var key in searchObj) {
                 tempArr = this.getIndicesOf(key, searchObj[key].toString());
            };
            for (var i = 0; i < tempArr.length; i++) {
                resultsArr.push(this.data[i]);
            }
            this.data = resultsArr;
        }
        else if (typeof searchObj[key] === 'function') {
            resultsArr = [];
            this.data.forEach(function(obj) {
                if (searchObj[key](obj[key])) {
                    resultsArr.push(obj);
                };
            });
            this.data = resultsArr;
        }
        else {
            resultsArr = [];
            this.data.forEach(function(obj) {
                if (obj[key] === searchObj[key]) {
                    resultsArr.push(obj);
                };
            });

            this.data = resultsArr;
        }
    }
    return this;
};


FQL.prototype.select = function(arr) {    
    var tempData = [];
    this.data.forEach(function(obj) {
        var objTemp = {};
        for (var i = 0; i < arr.length; i++) {
            objTemp[arr[i]] = obj[arr[i]];            
        }
        tempData.push(objTemp);        
    });
    this.data = tempData;
    return this;
};

FQL.prototype.order = function(key) {
    var tempData = [];
    this.data.sort(function(a, b) {
        // if (a[key] > b[key]) {
        //     return 1;
        // }
        // else if (a[key] < b[key]) {
        //     return -1;
        // }
        // return 0;
        return a[key] - b[key];
    });
    return this;
};

FQL.prototype.left_join = function(table, func) {
    var dataResult = [];
    this.data.forEach(function(obj) {
        table.data.forEach(function(obj2) {
            if (func(obj, obj2)) {
                dataResult.push(merge(obj2,obj));
            }
        });
    });
    this.data = dataResult;
    return this;
};

FQL.prototype.addIndex = function(index) {
    var dataResult = [];
    var data = this.data;
    var i = 0;
    this.data.forEach(function(obj) {
            var key = obj[index];
            var tempObj = {}
            tempObj[key] = i;
            dataResult.push(tempObj);    
            i++;
    });    
    this[index] = dataResult;        
}

FQL.prototype.getIndicesOf = function(index, value) {
    var indexResult = [];
    var indexTemp = this[index];
    if (indexTemp === undefined) {
        return undefined;
    }
    else {
        indexTemp.forEach(function(obj) {
            for (var key in obj) {
                if (key === value) {
                    indexResult.push(obj[key])
                };
            };
        });
        return indexResult;
    };
};


