/*
  How it works:
  server = server.js
  client = server.test.js

  executing 'node server.js'
  the server loads the requestHandler method. when a req (any http call including GET)
  is made to the server, this requestHandler is executed. the requesting URL is sent to
  this method. simply parse this URL for 'listings'. ('localhost/' is a hidden field).

  if listings is not the requesting URL, send 404 along with the appropriate header
  message. look in the server.test.js file to see what this message should be.

  note that while the server is waiting for an incoming req, continue to execute all
  other functions (including fs.readFile()). node executes all functions asynchronously, so no
  need to wait for requestHandler to execute first before trying to read from file. Vice versa,
  no need to wait for file to be read to begin execution of a request.
*/

'use strict';
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {

  if( url.parse(request.url).pathname == '/listings' ){
      response.write(listingData);
  }
  else{
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('Bad gateway error');
      response.end();
  }

  response.end();
};

var server = http.createServer(requestHandler);
server.listen(port);
console.log('Server running on localhost...');

fs.readFile('listings.json', 'utf8', function(err, data) {
   if(err){
     throw err;
   }

   listingData = data;
});
