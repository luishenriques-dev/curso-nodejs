const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('This always runs!');
    next();
});

app.use('/users', (req, res, next) => {
    console.log('View Users Page');
    res.send('<h1>This is a "Users" Page</h1>');
});

app.use('/', (req, res, next) => {
    console.log('Hello World Page');
    res.send('<h1> Hello World From ExpressJS </h1>');
});

app.listen(3000, ()  => {
    console.log('http://localhost:3000');
});