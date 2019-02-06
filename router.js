let handlers = require("./handlers")

// define a request router
let router ={
	"ping":handlers.ping,
	"notFound":handlers.notFound,
	"hello":handlers.hello

}

module.exports =router;