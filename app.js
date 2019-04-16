var app = require('http').createServer(handler)
var fs = require('fs');
var url = require('url');
var io = require('socket.io')(app);
var logger = require('./config/winston');
var converter = require('./converter');

app.listen(8000);
var path;

function handler(req, res){

	path = url.parse(req.url).pathname;

	if(path === '/'){
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
	//------
	//This solution is not exist in documentation of socket.io.
	//but still works. If necessary, changes can be made.
	//Output of ip can change time to time.
	//In localhost possible outputs are: [::1] or [::ffff:127.0.0.1].
	var ip = socket.request.connection._peername.address;
	// -----
	var date = new Date();
	socket.on('latin_request',function(data){
		logger.log('info', {IP: ip, Date: date, Path: 'Latin to Morse', Data: data.req_data});
		var morse_code = converter.latin_morse(data.req_data);
		socket.emit('latin_response',{
			response : morse_code
		});
	}),

	socket.on('morse_request',function(data){
		logger.log('info', {IP: ip, Date: date, Path: 'Morse to Latin', Data: data.req_data});
		var latin_alphabet = converter.morse_latin(data.req_data);
		socket.emit('morse_response',{
			response : latin_alphabet
		});
	})
});