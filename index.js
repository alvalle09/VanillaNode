
 /*
 *
 * Primary file for the API
 *
 * 
 */

 // Dependencies
 const http = require("http");
 const url = require('url');

 var server = http.createServer(function(req, res){
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    //console.log(parseUrl)

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    var method = req.method.toLowerCase();

    // Send the response
    res.end('Hola Mundo!!!\n');

   // Log the request path
   console.log('Request received on path:' + trimmedPath + ' with method:' + method + ' and query parms: ', queryStringObject);
    
 });

 // Start the server, and have it listen onport 3000
 server.listen(3000, function() {
     console.log("The server is listening on port 3000...");
 });