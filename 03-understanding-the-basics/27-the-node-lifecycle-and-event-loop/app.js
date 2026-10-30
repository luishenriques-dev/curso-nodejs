// Load the http module to create an HTTP server.
const http = require('http');
// Configure the HTTP server to respond with "Hello World" to all requests.
const server = http.createServer((req, res) => {
  console.log(req); // This line logs the request object to the console, which contains details about the incoming request.
  /* This line is commented out, but if uncommented, it would terminate the Node.js process after handling the request.
  process.exit(); */
});

// Listen on port 3000 and IP address
server.listen(3000);