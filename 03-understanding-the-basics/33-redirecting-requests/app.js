const http = require('http'); // core module to create the server
const fs = require('fs'); // core module to work with files

const server = http.createServer((req, res) => { // runs for every request
  console.log(req.url, req.method, req.headers); // path, method and headers
  const url = req.url;
  const method = req.method;

  if (url === '/') { // home page: show the form
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter a Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>'); // on submit, the browser sends a POST to /message
    res.write('</html>');
    return res.end(); // return: stop here so the code below doesn't run
  }

  if (url === '/message' && method === 'POST') { // only the form submission (url AND method must match)
    fs.writeFileSync('message.txt', 'This is a message from the server!'); // create the file (dummy text for now)
    res.statusCode = 302; // 302 = redirect
    res.setHeader('Location', '/'); // where the browser should go: back to the form
    return res.end();
  }

  // any other url: default page
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000); // start listening on port 3000