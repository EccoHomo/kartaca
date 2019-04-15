var app = require('http').createServer(handler)
var fs = require('fs');
var url = require('url');
var io = require('socket.io')(app);
var logger = require('./config/winston');
var converter = require('./converter');

app.listen(8000);
var hostname;
var path;
function handler(req, res){
	logger.log('info', "Method: " + req.method, req.headers);
	hostname = req.headers.host;
	path = url.parse(req.url).pathname;
	if(path === '/'){
		logger.log('info',"Connection to " + hostname + path);
		fs.readFile(__dirname + '/html_pages/index.html',function(err, data){
			if(err){
				res.writeHead(500);
				return res.end('Error loading the page.');
			}

			res.writeHead(200);
			res.end(data);
		});
	}else if(path === '/latin_morse.html'){
		fs.readFile(__dirname + '/html_pages/latin_morse.html',function(err, data){
			if(err){
				res.writeHead(500);
				return res.end('Error loading the page.');
			}

			res.writeHead(200);
			res.end(data);
		});
	}else if(path === '/morse_latin.html'){
		logger.log('info',"Connection to " + hostname + path);
		fs.readFile(__dirname + '/html_pages/morse_latin.html',function(err, data){
			if(err){
				res.writeHead(500);
				return res.end('Error loading the page.');
			}

			res.writeHead(200);
			res.end(data);
		});
	}else{
		res.writeHead(505);
		res.end("Error loading the page.");
	}
}

io.on('connection',function(socket){
	socket.on('latin_request',function(data){
		var morse_code = converter.latin_morse(data.req_data);
		socket.emit('latin_response',{
			response : morse_code
		});
	}),

	socket.on('morse_request',function(data){
		var latin_alphabet = converter.morse_latin(data.req_data);
		socket.emit('morse_response',{
			response : latin_alphabet
		});
	}),

	socket.on('disconnect',function(){
		logger.log('info',"Disconnection from " + hostname + path);
	})
});