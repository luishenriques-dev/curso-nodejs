const express = require('express');
const app = express();

app.use('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1> This is a "Add Product" Page! </h1>');
});

app.use('/', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1> Hello World from ExpressJS! </h1>');
});

app.listen(3000, () => {
    console.log('Pode abrir a app em http://localhost:3000');
});
