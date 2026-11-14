const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const rootDir = require('./util/path');

const mainRoutes = require('./routes/main');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});
  
app.listen(3000, () => {
  console.log("Pode abrir a app em http://localhost:3000");
});