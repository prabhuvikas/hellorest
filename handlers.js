//define the handlers
var handlers ={}

// Ping handlers
handlers.ping= function (data,callback){
	//callback a http status code and a payload object
	callback(200,{"message":"I am breathing"});

}
// Not found handler
handlers.notFound= function(data,callback){
	callback(404,{"message":"Welcome to lost and found department :)"});
}
//sample hello handler
handlers.hello = function(data,callback){

	callback(200,{"message":"Hello there beautiful :)"})
}

module.exports= handlers;