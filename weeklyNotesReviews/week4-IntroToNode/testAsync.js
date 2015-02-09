var someAsyncTask = function(callback) {
	var randTime = Math.floor(Math.random() * 1000);
	setTimeout(function(){
		console.log('async task completed in ' + randTime);
	}, randTime);
}

var counter = 0;

for (var i = 0; i < 5; i++) {
	someAsyncTask(function() {
		counter++;
		console.log('done with ' + counter);
		if (counter === 5){
			console.log('we are done.');
		}
	})
}

// var asyncIterator = function(n, message) {
// 	someAsyncTask(function() {
// 		if(n < 6){
// 			console.log('test');
// 			asyncIterator(n+1, message)
// 		}else{
// 			console.log(message);
// 		}
// 	});
// }

// asyncIterator(0, 'one done');

// someAsyncTask(function(){
// 	console.log('done with 1');
// 	someAsyncTask(function(){
// 		console.log('done with 2');
// 		someAsyncTask(function() {
// 			console.log('done with 3');
// 		});
// 	});
// });