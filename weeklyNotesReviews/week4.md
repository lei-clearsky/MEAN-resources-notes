# Node
process in node instead of window in the browser.
## Cooking Metaphor
- javascript (program): recipe
- javascript (programming language): recipe language
- V8 (engine/VM/interpreter): chef
- Node (runtime environment): kitchen
- Yosemite (operating system): building

module.exports in fileA (every file can only export one object), var myObj = require('./fileA') in fileB to access data from fileA
node package manager (npm), node modules, package.json, npm create node_modules, npmjs.com
asynchronous, blocking and non-blocking concurrency
[npm throws error without sudo](http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo)
[SizeUp](http://www.irradiatedsoftware.com/sizeup)
promise() and deferred() in jquery

express - library for node handles http reques and routingt

morgan

# Express
- HTTP, every request gets exect one return
- HTTP request - get, post, verb, route, headers(metadata about request)
  - common verbs - get, post, put, delete
- HTTP response
  - common status
- express

## Questions
- JavaScript originally had no concept of modules. Entire .js files could be combined by the browser in a single web page via 'script' tags, but one JS file could not import specific parts of another file in a controlled way.

- Asynchronous functions
```javascript
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
```
