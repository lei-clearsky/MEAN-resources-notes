//console.log(process.argv);

// var arr = [].slice.call(process.argv, 2);
// //var argvArr = arr.slice(2);
// arr.forEach(function(entry){
// 	console.log(entry);
// });

// console.log("Node starting...");
// var buffer = '';
// var fs = require('fs');
// fs.readFile('./file1.txt', function(err, data) {
//      buffer = data.toString();  // buffer object
//      console.log(buffer);
// });
 
 
// fs.watchFile('./file1.txt', {interval:2}, function(prev, curr) {
//   //console.log(curr);
//   	fs.readFile('./file1.txt', function(err, data) {
//      	buffer = data.toString();  // buffer object
//      	console.log(buffer);
// 	});
//   // display an update was made, then console.log the new updated file!
  
// });

var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var async = require('async');
var ejs = require('ejs');
var socketio = require('socket.io');


// take a list of files from the command line.
// now we can watch three files using:
// node app.js file1.js file2.js file3.js
var filenames = Array.prototype.slice.call(process.argv, 2);
console.log(filenames);

// create the express app
var app = express();


// connect the Morgan logging middleware to our app
app.use( logger('dev') );

// start a server listening on port 1234
var server = app.listen( 1234 );
var io = socketio.listen( server );

app.set('view engine', 'ejs');

// when someone requests http://localhost:1234/, run the callback
// function listed here and respond with the data
// we call this the "/" (or "Root") route.
// solution 1
// app.get("/", function(request, response) {
// 	fs.readFile(filenames[0], function(err, data1) {
// 		fs.readFile(filenames[1], function(err, data2) {
// 			fs.readFile(filenames[2], function(err, data3) {
//    				response.send('<pre>' + data1.toString() + data2.toString() + data3.toString() + '</pre>');
//   			});
//   		});
//   	});
// });

// solution 2
// app.get("/", function(request, response) {
// 	var responseArr = [];
// 	filenames.forEach(function(file){
// 		fs.readFile(file, function(err, data) {
// 			responseArr.push(data);
// 			if (responseArr.length === filenames.length)
// 				response.send('<pre>' + responseArr.join('\r\n') + '</pre>');	
// 		});
// 	});
// });

// solution 3 - track order
// app.get("/", function(request, response) {
// 	var responseArr = [], counter = 0;
// 	filenames.forEach(function(file, index){
// 		fs.readFile(file, function(err, data) {
// 			responseArr[index] = data.toString();
//			console.log(counter);
// 			if (counter === filenames.length -1)
// 				response.send('<pre>' + responseArr.join('\r\n') + '</pre>');

//			counter ++;	
// 		});
// 	});
// });


filenames.forEach(function (filename) {
	fs.watchFile(filename, function (curr, prev) {
		io.sockets.emit('filechanged', {
			filename: filename,
			filetext: curr.toString()
		});
	});
});

// solution 4 - async (workshop solution)
app.get('/', function (request, response) {
	 var mapFilenamesToContent = function(filename, next) {
	    // your code here, and in parameter list above
	    fs.readFile(filename, function(err, data) {
			// process data
			next(err, { id: filename.replace(/[^0-9]/ig, ""),
  						data: data.toString(),
  						filename: filename});
		});
	};

	async.map(filenames, mapFilenamesToContent, function (err, results) {
	    if (err) 
			console.log('async.map error:', err);
	    //response.send( '<pre>' + results.join("\n\n") + '</pre>' );
	    console.log('results', results)
	    response.render( 'mainView', { files: results} );
	});
});

// solution 5
// app.get('/', function (request, response) {

// 	async.map(filenames, function(aFileName, moveOn) {
// 		// this is the iterator
// 		fs.readFile(aFileName, function(err, data){
// 			moveOn(err, data.toString()) // replace null with err
// 		})

// 	}, function (err, arrayOfAllFiles) {
// 	    if (err) 
// 			console.log('async.map error:', err);
// 	    response.send(arrayOfAllFiles);
// 	});
// });

// with template
// app.get('/', function (request, response) {

// 	async.map(filenames, function(aFileName, moveOn) {
// 		// this is the iterator
// 		fs.readFile(aFileName, function(err, data){
// 			moveOn(err, { id: aFileName.replace(/[^0-9]/ig, ""),
//   						data: data.toString(),
//   						filename: aFileName) // replace null with err
// 		})

// 	}, function (err, arrayOfAllFiles) {
// 	    if (err) 
// 			console.log('async.map error:', err);
// 	    response.render('mainView', {
// 	    	files: arrayOfAllFiles
// 	    })
// 	});
// });







