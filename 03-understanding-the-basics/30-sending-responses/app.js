const http = require('http'); // core module to create the server

const server = http.createServer((req, res) => { // runs for every request; sends the same page to all
  console.log(req.url, req.method, req.headers); // path, method and headers

  res.setHeader('Content-Type', 'text/html'); // tell the browser the body is HTML
  res.write('<html>'); // write the page piece by piece...
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end(); // ...and send it (nothing can be written after this)
});

server.listen(3000); // start listening on port 3000