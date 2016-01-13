var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request
    is sent to the '/listings' path. Otherwise, it should send a 404 error.

    HINT: explore the request object and its properties
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

   if (parsedUrl.pathname == '/listings') {
     response.writeHead(200, {"Content-Type": "text/html"});
     response.write(listingData);
   }
   else { //send a 404 error
     response.writeHead(404, {"Content-Type": "text/html"});
     response.write("Bad gateway error");
   }

   response.end();
};

server = http.createServer(requestHandler);
console.log('Server created');

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.
   */

   if (err) throw err;
   listingData = data;

   server.listen(port);
   
});
