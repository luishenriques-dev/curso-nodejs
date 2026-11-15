# 142. Fetching Products

**Secção 10 — SQL Introduction**

> **Em resumo:** o model dos produtos começa a usar o **MySQL** em vez do ficheiro. O **`fetchAll`** passa a ser **uma linha**: devolve a *promise* do `db.execute('SELECT * FROM products')`. No controller, os produtos chegam no **`.then`**, e não num callback.

---

## O que muda no model

### `models/productModel.js`

```javascript
const db = require('../util/database');

const Cart = require('./cartModel');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {}

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {}
};
```

| Sai | Porquê |
|---|---|
| `require('fs')` e `require('path')` | Já não se trabalha com ficheiros |
| O `const p = path.join(...)` | Já não há caminho para o ficheiro |
| `getProductsFromFile` | O MySQL vai buscar os dados |
| O código do `save`, `deleteById` e `findById` | Vão ser **reescritos** com SQL nas próximas aulas. Por agora ficam **vazios** |
| O argumento `cb` | Agora usam-se **promises**, e não callbacks |

| Entra | Porquê |
|---|---|
| `require('../util/database')` | A pool de ligações da aula 139 |
| `return db.execute(...)` | **Devolve a promise** a quem chamou o `fetchAll` |

> 💡 O **`return`** é importante: o `fetchAll` não trata do resultado, **passa-o** ao controller, que é quem decide o que fazer com ele.

> ⚠️ O **carrinho** fica **avariado** por agora. Ainda usa o ficheiro, e o model dos produtos já não.

---

## O que muda no controller

### `controllers/shopController.js` (o `getIndex`)

```javascript
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};
```

```
// antes (callback)
Product.fetchAll(products => {
  res.render(..., { prods: products, ... });
});

// agora (promise)
Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render(..., { prods: rows, ... });
  })
  .catch(err => console.log(err));
```

O `res.render` vai para **dentro do `.then`**, porque só lá dentro é que os produtos já chegaram. É a mesma regra dos callbacks.

---

## A desestruturação: `[rows, fieldData]`

Lembra-te que o resultado é **um array com dois arrays** (aula 141). Em vez de escrever `result[0]` e `result[1]`, dá para **tirá-los logo** para duas variáveis:

```javascript
.then(result => {
  const rows = result[0];
  const fieldData = result[1];
})

// é o mesmo que:
.then(([rows, fieldData]) => { ... })
```

| Variável | É… |
|---|---|
| **`rows`** | `result[0]` → os **produtos** |
| `fieldData` | `result[1]` → os metadados |

Os nomes são **escolha tua**. O que conta é a **posição**: o primeiro nome fica com o primeiro elemento, e o segundo com o segundo.

---

## No `app.js`

Sai o **código de teste** das aulas 139–141 (o `db.execute(...)` com o `console.log`). A ligação passa a ser usada **só no model**.

---

## Testar

1. Abre `localhost:3000`: aparece o **livro** da base de dados.
2. Muda o título no MySQL (por exemplo, junta um `!`) e recarrega a página: a mudança aparece. Os dados vêm **mesmo** da base de dados.

---

## 📝 Tarefa do professor

A página **Products** (`/products`) ainda está **avariada**: o `getProducts` ainda usa o callback antigo. **Corrige-a** para usar o `fetchAll().then(...)`, como o `getIndex`. A solução está na próxima aula.

---

## ✅ A reter

- **`fetchAll()`** → **`return db.execute('SELECT * FROM products')`**.
- No controller: **`Product.fetchAll().then(...).catch(...)`**, com o `res.render` **dentro do `.then`**.
- **`([rows, fieldData])`** → desestruturação: tira os dois arrays do resultado.
- **`rows`** = os produtos.