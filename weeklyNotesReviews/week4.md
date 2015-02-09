<h1>Node</h1>
<p>process in node instead of window in the browser.</p>
<h3>Cooking Metaphor</h3>
<ul>
	<li>javascript (program): recipe</li>
	<li>javascript (programming language): recipe language</li>
	<li>V8 (engine/VM/interpreter): chef</li>
	<li>Node (runtime environment): kitchen</li>
	<li>Yosemite (operating system): building</li>
</ul>
<p>module.exports in fileA (every file can only export one object), var myObj = require('./fileA') in fileB to access data from fileA</p>
<p>node package manager (npm), node modules, package.json, npm create node_modules, npmjs.com</p>
<p>asynchronous, blocking and non-blocking concurrency</p>
<p><a href = "http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo">npm throws error without sudo</a><p/>
<p><a href = "http://www.irradiatedsoftware.com/sizeup/">SizeUp</a><p/>
<p>promise() and deferred() in jquery<p/>
<h2>Questions</h2>
<p>JavaScript originally had no concept of modules. Entire .js files could be combined by the browser in a single web page via 'script' tags, but one JS file could not import specific parts of another file in a controlled way.</p>
<p>Asynchronous functions</p>
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
