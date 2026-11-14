const products = [];
const fs = require("fs"); // para ler e escrever ficheiros
const path = require("path"); // para o caminho do ficheiro

module.exports = class Product {
  constructor(title) {
    this.title = title; // cada produto criado guarda o seu título
  }

  // agora: lê o ficheiro, junta o produto, volta a escrever
  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json",
    );
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  // agora: lê o ficheiro
  static fetchAll() {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json",
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return [];
      }
      return JSON.parse(fileContent);
    });
  }
};
