const http = require('http'); // core module to create the server
const routes = require('./routes'); // import the request handler function from routes.js


const server = http.createServer(routes); // runs for every request, the function is imported from routes.js

server.listen(3000); // start listening on port 3000