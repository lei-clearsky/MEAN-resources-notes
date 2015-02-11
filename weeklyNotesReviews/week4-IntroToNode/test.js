var someAsyncTask = function(callback) {
	var randTime = Math.floor(Math.random() * 1000);
	setTimeout(function(){
		console.log('async task completed in ' + randTime);
		callback()
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