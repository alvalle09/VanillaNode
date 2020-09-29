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

    // Choose handler, if not found, use Not Found handler
    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // construct data obj to send to handler
    const data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    }

    // route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload){
      // use status code called backed by handler, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // use payload called back by the handler, or default to empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // convert payload to a string
      const payloadString = JSON.stringify(payload);

      // Send the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('Returning this response: ', statusCode, payloadString);
    });    

    // Log the request path ( objects are passed as separate parms in console log)
    // console.log('Request received with headers:', headers);
    // console.log('Request received on path:' + trimmedPath + ' with method:' + method + ' and query parms: ', queryStringObject);
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