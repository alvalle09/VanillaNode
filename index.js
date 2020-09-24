/*
 *
 * Primary file for the API
 *
 *
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(function (req, res) {
  // Get the url and parse it
  const parsedUrl = url.parse(req.url, true);

  // // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // // Get the HTTP Method
  const method = req.method.toLowerCase();

  // // Get headers as an objec
  const headers = req.headers;

  // // Get payload, if any
  const decoder = new StringDecoder("utf-8");
  var buffer = "";

  req.on("data", function (data) {
    buffer += decoder.write(data);
  });

  req.on("end", function () {
    buffer += decoder.end();

    // Send the response
    res.end("Hola Mundo!!!\n");

    // Log the request path ( objects are passed as separate parms in console log)
    console.log('Request received with headers:', headers);
    console.log('Request received with payload:', buffer);
    console.log('Request received on path:' + trimmedPath + ' with method:' + method + ' and query parms: ', queryStringObject);
  });

});

//  // Start the server, and have it listen onport 3000
server.listen(3000, function () {
  console.log("The server is listening on port 3000...");
});

// define route handlers
const handlers = {};

// sample handler
handlers.sample = function(data, callback){
  // callback an http status code, and a payload object
  callback(406, {'name': 'sample handler'});
};

// not found handler
handlers.notFound = function(data, callback){
  callback(404);
};


// setup request router
const router = {
  'sample': handlers.sample
}