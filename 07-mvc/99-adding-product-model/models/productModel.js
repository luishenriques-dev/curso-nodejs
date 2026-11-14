const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;          // cada produto criado guarda o seu título
  }

  save() {
    products.push(this);         // guarda ESTE produto no array
  }

  static fetchAll() {
    return products;             // devolve todos
  }
};