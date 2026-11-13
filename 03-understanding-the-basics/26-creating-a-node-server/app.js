const http = require('http'); // core module to create the server

const server = http.createServer((req, res) => { // runs for every request
  console.log(req); // print the whole request in the terminal
});

server.listen(3000); // start listening on port 3000