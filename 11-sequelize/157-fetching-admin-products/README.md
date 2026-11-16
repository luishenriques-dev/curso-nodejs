# 157. Fetching Admin Products

**Secção 11 — Understanding Sequelize**

> **Em resumo:** a página **Admin Products** passa a usar o **`findAll()`** do Sequelize, como a loja (aula 155). O professor deixa-a como **exercício**, e eu já a tinha feito antes desta aula.

---

## O código desta aula

### `controllers/adminController.js` — o `getProducts`

```javascript
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};
```

É **o mesmo código** do `getIndex` e do `getProducts` da loja (aula 155). Só mudam a **view** (`admin/products`), o **título** e o **path**.

| Antes (callback) | Agora (promise) |
|---|---|
| `Product.fetchAll(products => { ... })` | `Product.findAll().then(products => { ... }).catch(...)` |

---

## 💡 O `redirect` depois de adicionar

Com esta página a funcionar, já dá para pôr o **`postAddProduct`** (aula 153) a **responder**, para o browser não ficar a carregar:

```javascript
.then(result => {
  console.log('Created Product');
  res.redirect('/admin/products');
})
```

---

## O que ainda não funciona

Na página Admin Products, os botões **Edit** e **Delete** ainda usam o código antigo. São as próximas aulas:

| Botão | Aula |
|---|---|
| **Edit** | 158 — Updating Products |
| **Delete** | 159 — Deleting Products |

---

## ✅ A reter

- Admin Products → **`Product.findAll().then(...).catch(...)`**.
- Mesmo código da loja: só mudam a view, o título e o path.
- Próximo: o **U** e o **D** do CRUD (editar e apagar).