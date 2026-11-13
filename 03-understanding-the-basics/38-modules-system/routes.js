const fs = require('fs'); // core module to work with files

const requestHandler = (req, res) => { // runs for every request    
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
        console.log(chunk);
        body.push(chunk);
        });
        // return: leave the function right after registering the listener,
        // otherwise the default page below would be sent and the redirect would fail
        return req.on('end', () => { // runs later, once all pieces have arrived
        const parsedBody = Buffer.concat(body).toString(); // 'message=hello'
        const message = parsedBody.split('=')[1]; // 'hello'
        fs.writeFile('message.txt', message, err => { // non-blocking: this callback runs once the file is written (err is null if all went well)
            res.statusCode = 302; // 302 = redirect
            res.setHeader('Location', '/'); // back to the form
            return res.end();
            });
        });
    }

    // any other url: default page
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler; // export the function to be used in other files