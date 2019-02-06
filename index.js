

/**
Primary File for the api
*/
const http =require('http');
const https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');

//Create a server
var httpServer = http.createServer(function(req,res)
{
	unifiedServer(req,res);
});

//Listen to a port
httpServer.listen(config.httpport,function () {
	// body...
	console.log("I am listening tell me...",config.httpport,config.envname)
})

var httpsServerOptions =
{
	'key':fs.readFileSync('./key.pem'),
	'cert':fs.readFileSync('./cert.pem')
}

//create a https server
 var httpsServer =https.createServer(httpsServerOptions,function(req,res)
 {
 	console.log("got request")
 	unifiedServer(req,res);
 });

//start the https server
httpsServer.listen(config.httpsport,function () {
	// body...
	console.log("I am listening at https tell me...",config.httpsport,config.envname)
})


//define the handlers
var handlers ={}

handlers.ping= function (data,callback){
	//callback a http status code and a payload objectc
	callback(200);

}
// Not found handlers
handlers.notFound= function(data,callback){
	callback(404);
}

// define a request router
var router ={
	"ping":handlers.ping
}

// all the server logic for http and https goes in here

var unifiedServer = function(req,res)
{
	//get the url and parse it
	var parsedUrl= url.parse(req.url,true)

	//get the path from the url
	var path =parsedUrl.pathname;
	var trimmedpath = path.replace(/^\/+|\/+$/g,'')

	// get the http method
	var method = req.method.toLowerCase();

	//get the Query String Object
	var querystring = parsedUrl.query;
	var headers = req.headers;

	var decoder = new StringDecoder('utf-8')
	var buffer =''
	req.on('data',function(data)
	{
		buffer+=decoder.write(data);
		//console.log("Received buffer "+buffer );
	})

	req.on('end',function()
	{
		buffer += decoder.end();
		//choose the handler where the request should go to
		//if not found send to notfound

		var chosenHandler = typeof(router[trimmedpath])!='undefined' ?  router[trimmedpath]:handlers.notFound;

		//Construct a dataobject to send to the handler

		var data ={
			'trimmedpath':trimmedpath,
			'querystring':querystring,
			'method':method,
			'headers':headers,
			'payload':buffer	
		}

		//call the handler
		chosenHandler(data,function(statuscode,payload){
			//use the status code default
			statuscode=typeof(statuscode)=='number'?statuscode:200;
			
			//default payload
			payload=typeof(payload)=='object'?payload:{}

			// convert the payload to string
			var payloadString = JSON.stringify(payload);

			//return the response
			res.setHeader('Content-Type','application/json')
			res.writeHead(statuscode);
			res.end(payloadString);

			console.log("Returning response",statuscode,payloadString);


		})
		
	})

}


