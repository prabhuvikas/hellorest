//create and export configuration variables

// Container for all the environments

var environments={};

//staging by defualt environment

environments.staging={
	'httpport':3000,
	'envname':"staging",
	'httpsport':3001

}

//Production object

environments.production={
	'httpport':5000,
	'envname':"production",
	'httpsport':5001
}


//determine which one to be exported based on the commandline

var currentenvironment = typeof(process.env.NODE_ENV)=='string'? process.env.NODE_ENV.toLowerCase():"staging";

//check if the environment exist

var environmenttoexport = typeof(environments[currentenvironment])=='object'?environments[currentenvironment]:environments['staging'];

//Export module
module.exports = environmenttoexport;


