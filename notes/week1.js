/*
 * Refresh key points in week 1
 */
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
function Calculator() {
	this.currentValue = 0;
}

(function(CP){
	CP.method1 = function() {
		// body
	}
	CP.method2 = function(val) {
		// body
	}
	CP.method3 = function(val) {
		// body
	}
})(Calculator.prototype);

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


