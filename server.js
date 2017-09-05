var http = require('http'),
fs = require('fs'),
url = require('url'),

port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {

	// parasedURL = urlObject
	// url.parse(request.url) splits the URL into href, search, query, pathname
	// ex: access with parsedUrl.pathname
	var parsedUrl = url.parse(request.url);

	if (parsedUrl.pathname == '/listings'){

		// Respond with a 200 status for standard response with no issues
		response.writeHead(200, {'Content-Type': 'application/json'});

		// Start and end response that responds with the JSON file
		response.write(listingsData);
		response.end();


	}
	// If a GET request is NOT sent to the /listings path
	else{

		// Respond with a 404 status via writeHead
		// Give a textual response of 'Bad gateway error'
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write('Bad gateway error');
		response.end();
	}
};

// Creates the server but does not start it
server = http.createServer(requestHandler);

// Reads the json file into memory
fs.readFile('listings.json', 'utf8', function(err, data) {

	listingsData = data;

	// Starts the server
	server.listen(port, function(){
		console.log('Server is active');
	});

});
