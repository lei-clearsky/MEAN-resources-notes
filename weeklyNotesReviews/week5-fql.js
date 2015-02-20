// Place your code here:

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


	for (var key in searchObj) {
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
				if (obj[key] === searchObj[key]) {
					searchQueryArr.push(obj);
				}
			});
			this.data = searchQueryArr;
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







