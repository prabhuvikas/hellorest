

/**
Primary File for the api
*/
const http =require('http');
const https = require('https');

var config = require('./config');
var fs = require('fs');
var unifiedServer = require("./server")

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





