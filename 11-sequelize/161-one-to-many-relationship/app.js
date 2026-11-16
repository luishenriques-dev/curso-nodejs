const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/errorController");
const sequelize = require("./util/database");

const Product = require('./models/productModel');
const User = require('./models/userModel');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
Product.belongsTo(User, { constraints: true, onDelete: 'SET NULL' });
User.hasMany(Product);
sequelize
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
    app.listen(3000, () => {
      console.log("Pode abrir a app em http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
