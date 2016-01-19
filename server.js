var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  if(parsedUrl.pathname == '/listings') {
    response.end(listingData);
  }
  else {
    response.writeHead(404);
    response.end('Bad gateway error path');
  }
  /*
    Your request handler should send listingData in the JSON format if a GET request
    is sent to the '/listings' path. Otherwise, it should send a 404 error.

    HINT: explore the request object and its properties
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {

  listingData = data;
  /*
    This callback function should save the data in the listingData variable,
    then start the server.
   */
});

server = http.createServer(requestHandler);
server.listen(port);
console.log('Server listening on: http://127.0.0.1:' + port);
console.log('Is the server started?');
