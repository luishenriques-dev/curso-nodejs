const http = require('http'); // core module to create the server

const express = require('express');

const app = express();


const server = http.createServer(app); 

server.listen(3000, () => {
    console.log('http://localhost:3000')
});