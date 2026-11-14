const path = require('path');
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

const rootDir = require('./util/path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});
  
app.listen(3000, () => {
  console.log("Pode abrir a app em http://localhost:3000");
});
