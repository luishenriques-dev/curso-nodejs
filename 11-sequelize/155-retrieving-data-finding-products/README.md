# 155. Retrieving Data & Finding Products

**Secção 11 — Understanding Sequelize**

> **Em resumo:** o model do Sequelize não tem `fetchAll`. Para ir buscar todos os produtos, usa-se **`Product.findAll()`**, que devolve uma *promise* **já com a lista de produtos**: acabou-se o `[rows, fieldData]`.

---

## O código desta aula

### `controllers/shopController.js`

```javascript
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};
```

---

## Antes e depois

```javascript
// Secção 10 (mysql2)
Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render(..., { prods: rows, ... });
  })

// Secção 11 (Sequelize)
Product.findAll()
  .then(products => {
    res.render(..., { prods: products, ... });
  })
```

| | `mysql2` | Sequelize |
|---|---|---|
| Método | `fetchAll` (escrito por mim) | **`findAll`** (vem com o Sequelize) |
| O que chega ao `.then` | `[linhas, metadados]` | **Só a lista de produtos** |
| Desestruturação | `([rows, fieldData])` | **Não é precisa** |

> 💡 A página funciona **sem mudar o EJS**: os produtos têm os **mesmos nomes de campo** (`title`, `price`…), por isso o `product.title` continua a funcionar.

---

## Opções do `findAll`

O `findAll` pode receber um objeto de opções, por exemplo, um **`where`** para filtrar:

```javascript
Product.findAll({ where: { price: 9.99 } })
// → SELECT * FROM products WHERE price = 9.99
```

Nesta aula não se usa: vai-se buscar **tudo**. Há mais opções na documentação do Sequelize.

---

## ✅ A reter

- **`Product.findAll()`** → todos os produtos (é o `SELECT * FROM products`).
- O `.then` recebe **logo a lista**, sem `[rows, fieldData]`.
- **`findAll({ where: {...} })`** → com filtro.
- O **CRUD** até agora: **C** (`create`) ✅, **R** (`findAll`) ✅.