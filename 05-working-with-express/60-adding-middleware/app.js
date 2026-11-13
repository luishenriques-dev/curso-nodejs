const http = require('http'); // core module to create the server

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('In the middleware!');
    next();
});

app.use((req, res, next) => {
    console.log('In another middleware!');
});

const server = http.createServer(app); 

server.listen(3000, () => {
    console.log('http://localhost:3000')
});