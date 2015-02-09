// var fs = require('fs');
// //console.log(fs)
// console.log( fs.readFileSync('./file1.txt').toString() );
// // var greeter = require('./greeter');
// // var name = 'Lei';
// // var hello = greeter.greet(name);
// // var shout = greeter.shout(name);
// // console.log(hello);
// // console.log(shout);

// // var fs = require('fs');
// // console.log(fs);
// // console.log(fs.readFileSync('./file1.txt'));

// var fs = require('fs');
// fs.readFile('./file1.txt', function(err, data) {
//     console.log(data);  // buffer object
//     console.log(data.toString());
// });
var buffer = '';
var fs = require('fs');
fs.readFile('./file1.txt', function(err, data) {
     buffer = data.toString();  // buffer object
     console.log(buffer);
});
