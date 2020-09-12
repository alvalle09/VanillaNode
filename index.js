
 /*
 *
 * Primary file for the API
 *
 * 
 */

 // Dependencies
 var http = require("http");

 // The server shold respond to all requests with a string
 var server = http.createServer(function(req, res){
    res.end('Hola Mundo!!!\n');
 });

 // Start the server, and have it listen onport 3000
 server.listen(3000, function() {
     console.log("The server is listening on port 3000...");
 });