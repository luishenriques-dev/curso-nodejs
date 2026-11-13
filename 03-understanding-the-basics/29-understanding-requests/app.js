const http = require('http'); // core module to create the server

const server = http.createServer((req, res) => { // runs for every request
  console.log(req.url, req.method, req.headers); // only the 3 useful fields: path, method and headers
});

server.listen(3000); // start listening on port 3000