/*
 * Refresh key points in week 1
 */

// 1/19/2015
// loops

// repeat 
// remember to use push() and join() method
function repeat(str, times) {
	var finalString = '';
	// instead of using finalString += str
	// push str to array and then use join method 
	// is faster therefore less expensive
	var strArray = [];
	for (var i = 0; i < times; i ++) {
		strArray.push(str);
	}

	finalString = strArray.join('');

	return finalString;
}

// join 
function join(arr, delim) {
	var finalString = '';
	// save arr.length to len to be called once only
	// calling arr.length multiple times is expensive
	for (var i = 0, len = arr.length; i < len; i++ ) {
		finalString += arr[i];
		if (delim && i <= len - 2)
			finalString += delim;
	}

	return finalString;
}

// sum
function sum(arr) {
	var len = arr.length, sum = 0;
	// using while loop here is more efficient
	while(len--) {
		sum += arr[len];
	}
	return sum;
}

// paramify
// paramify is used to create urls
function paramify(obj) {
	var finalString = '', objArray = [];
	for(var key in obj) {
		// make sure this obj has this key
		if (obj.hasOwnProperty(key)) {
			objArray.push(key + '=' + obj[key]);
		}
	}
	// use array to sort element alphabetically
	objArray.sort();
	finalString = objArray.join('&');
	return finalString; // or return join(finalString, '&');
}

// factorial
// use recursion
function factorial(n) {
	// base
	if (n <= 1)
		return 1;
	return n * factorial(n - 1);
}

// concat string 
function concatString() {
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
	// http://stackoverflow.com/questions/2091138/why-doesnt-join-work-with-function-arguments
	var args = Array.prototype.slice.call(arguments, 0);
	return args.join('');
	// or return join(args, '');
}

// calculator
// remember this awesome pattern!
// function Calculator() {
// 	this.currentValue = 0;
// }

// (function(CP){
// 	CP.method1 = function() {
// 		// body
// 	}
// 	CP.method2 = function(val) {
// 		// body
// 	}
// 	CP.method3 = function(val) {
// 		// body
// 	}
// })(Calculator.prototype);

// The following pattern is bad 
// since this will overwrite all methods in this class's prototype

// Calculator.prototype = {
// 	method1: function() {
// 		// body
// 	},
// 	method2: function() {
// 		// body
// 	},
// 	method3: function() {
// 		// body
// 	}
// }

function Calculator() {
	this.numStack = [];
}

(function(CP) {
	CP.checkEmpty = function() {
		if (this.numStack.length < 2)
			throw "calculator is empty";
	}
	CP.compute = function(func) {
		this.checkEmpty();
		var num1 = this.numStack.pop();
		var num2 = this.numStack.pop();
		this.numStack.push(func(num1, num2));
	}
	CP.value = function() {
		return this.numStack[this.numStack.length - 1];
	}
	CP.add = function() {
		this.compute(function(a, b) {
			return a + b;
		});
	}
	CP.minus = function() {
		this.compute(function(a, b) {
			return a - b;
		});
	}
	CP.divide = function() {
		this.compute(function(a, b) {
			return a / b;
		});
	}
	CP.times = function() {
		this.compute(function(a, b) {
			return a * b;
		});
	}
})(Calculator.prototype);

// countWords
function countWords(words) {
	return words.split(' ').length;
}

// makeAdder
function makeAdder(num1) {
	return function(num2) {
		return num1 + num2;
	}
}

// forEach
function forEach(arr, func) {
	for (var i = 0, len = arr.length; i < len; i++)
		func(arr[i]);
}

// map
function map(arr, func) {
	var newArr = [];
	forEach(arr, function(el) {
		newArr.push(func(el));
	});
	return newArr;
}

// filter
function filter(arr, func) {
	var newArr = [];
	forEach(arr, function(el) {
		if (func(el))
			newArr.push(el);
	});
	return newArr;
}

// contains
// use for in loop to access keys in a object
function contains(arrOrObj, num) {
	for(var key in arrOrObj)
		if (arrOrObj.hasOwnProperty(key)) {
			if (arrOrObj[key] === num)
				return true;
		}
	}
	return false;
}

// reduce
function reduce(arr, startNum, reduceFunc) {
	var currentNum = startNum;
	forEach(arr, function(el) {
		currentNum = reduceFunc(currentNum, el);
	});
	return currentNum;
}

// sums an array using reduce
function sum(arr) {
	return reduce(arr, 0, function(a, b){
		return a + b;
	})
}

// every function using reduce
function every(arr, func) {
	var everyChecker = function(current, next) {
		return current && func(next);
	}
	return reduce(arr, true, everyChecker);
}

// any function using reduce
function any() {
	var anyChecker = function(current, next) {
		return current || func(next);
	}
	return reduce(arr, false, anyChecker);

}

// once function using closure
function once(func) {
	var runOnce = false;
	return function() {
		if (!runOnce) {
			runOnce = true;
			func();
		}
	}
}

// more examples about closure
function functionMaker() {
  var runTimes = 0;

  return {
    functionA: function() {
      runTimes++;
    },
    functionB: function() {
      runTimes++;
    },
    reportRunTimes: function() {
      console.log(runTimes);
    }
  }
}

// 1/20/2015
// countWordsInReduce
function countWordsInReduce(currentNum, next){
	return currentNum + countWords(next);
}

// rewrite reduce
function reduce(arr, startNum, func) {
	var currentNum = startNum;
	forEach(arr, function(el) {
		currentNum = func(currentNum, arr[el]);
	});
	return currentNum;
}

// rewrite sum
function sum(arr) {
	var add = function(a, b) {
		return a + b;
	};
	return reduce(arr, 0, add);
}

// rewrite every
function every(arr, func) {
	var everyFunc = function(current, next) {
		return current && func(next);
	}

	return reduce(arr, true, everyFunc);
}

// rewrite any
function any(arr, func) {
	var anyFunc = function(current, next) {
		return current || func(next);
	}

	return reduce(arr, false, everyFunc);
}

// 






