/*
* Export an init method that will define a set of routes
* handled by this file.
* @param app - The Express app
*/

var globalObject = {};
exports.init = function(app) {
 
 app.get("/user/:username/:userinfo", getUser);
 app.put("/user/:username/:userInfo/:uservalue",putUser);
 }

// Handle the getUser route
putUser = function(request, response) {
	globalObject.username = request.params.username;
	globalObject.userinfo = request.params.userinfo;
	globalObject.uservalue = request.params.uservalue;
 	response.end("Adding the user "+request.params.username+" and info "+request.params.userinfo
 		+" with value "+request.params.uservalue);
 }
getUser = function(request, response) {
 console.log(globalObject);
 response.end("The user is "+globalObject.username+" and the requested info is "+globalObject.uservalue);
 }