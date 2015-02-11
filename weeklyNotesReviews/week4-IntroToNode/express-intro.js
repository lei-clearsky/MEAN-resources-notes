var express = require('express')
var app = express();

app.use(function(request, response, next) {
	console.log(request.verb);
	console.log(request.method);
	console.log(request.url);
	next()
})

app.get('/', function(request, response){
	//console.log(Object.keys(request));
	//console.log(Object.keys(response));
	response.send('hello world');
})

app.get('/anotherRoute', function(req, res){
	//console.log(Object.keys(request));
	//console.log(Object.keys(response));
	res.send('hello world in anotherRoute');
})

app.listen(2345)
