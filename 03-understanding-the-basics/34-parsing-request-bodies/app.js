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

  if (url === '/message' && method === 'POST') { // only the form submission
    const body = []; // box to collect the pieces (chunks) of the request body
    req.on('data', (chunk) => { // runs every time a piece arrives
      console.log(chunk); // raw bytes, e.g. <Buffer 6d 65 ...>
      body.push(chunk);
    });
    req.on('end', () => { // runs once, when all pieces have arrived
      const parsedBody = Buffer.concat(body).toString(); // join the pieces and turn them into text: 'message=hello'
      const message = parsedBody.split('=')[1]; // keep what's after the '=': 'hello'
      fs.writeFileSync('message.txt', message);
    });

    // ⚠️ this runs BEFORE the listeners above (they only run later)
    res.statusCode = 302; // 302 = redirect
    res.setHeader('Location', '/'); // back to the form
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