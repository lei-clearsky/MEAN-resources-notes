// ruby


var order = customer.getOrder();
var food = check.cook(order);
customer.give(food);

// js
var order = customer.getOrder()
chef.cook(order, function(err, food) {
	customer.give(food);
});
var order2 = customer2.getOrder

// execute order: line 9, 10, 13, 11

var someAsyncTask = function(callback) {
	var randTime = Math.floor(Math.random() * 1000);
	setTimeout(function(){
		console.log('async task completed in ' + randTime);
	}, randTime)
}

var counter = 0;

for (var i = 0; i < 5; i++) {
	someAsyncTask(function() {
		counter++;
		if (counter === 5){
			console.log('we are done.');
		}
	})
}

// how to run each item in order (as a waterfall)
someAsyncTask(function(){
	console.log('done with 1');
	someAsyncTask(function(){
		console.log('done with 2');
		someAsyncTask(function() {
			console.log('done with 3');
		});
	});
});

// use recursion
var asyncIterator = function(n, message) {
	someAsyncTask(function() {
		if(n < 6){
			asyncIterator(n+1, message)
		}else{
			console.log(message);
		}
	});
}

var async = require('async');

var someData = [1,2,3,4,5];
var iterator = function(fileName, tick){
	fs.readFile(fileName, function(){

	});
}
async.eachSeries(collectionOfFilenames, iterator, masterCallback);

async.map(fileNames, function(theFileYoureOn, tick){
	fs.readFile(theFileYoureOn, function(err, buffer) {
		tick(null, buffer.toString())
	}, function(err, files) {
		console.log('all done');
	});
})
