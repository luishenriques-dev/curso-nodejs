# 97. Adding Controllers

**Secção 7 — The Model View Controller (MVC)**

> **Em resumo:** as funções `(req, res, next) => {...}` saem das rotas e passam para uma pasta **`controllers`**. As rotas ficam **só com o caminho, o método e que controller chamar**. A app funciona igual, mas o código fica **mais arrumado**.

---

## Antes e depois

| | Antes | Depois |
|---|---|---|
| `routes/admin.js` | Caminho + **toda a lógica** + o array `products` | Só caminho + **nome do controller** |
| `routes/shop.js` | Caminho + **toda a lógica** | Só caminho + **nome do controller** |
| `controllers/products.js` | — | **Toda a lógica** dos produtos + o array `products` |

**Porquê?** Quando a app crescer, as rotas iam ficar enormes. Assim, abres a rota e vês **num relance** que caminhos existem. Se quiseres saber **o que acontece**, vais ao controller.

---

## A nova estrutura

```
97-adding-controllers/
├── app.js
├── controllers/         ← nova
│   └── products.js      ← toda a lógica dos produtos
├── routes/
│   ├── admin.js         ← só caminhos
│   └── shop.js          ← só caminhos
├── views/
└── ...
```

---

## O código desta aula

### `controllers/products.js`

```javascript
const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title, price: req.body.price });
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
};
```

> 💡 O `price` no `push` é o meu desafio da aula 91. O professor ainda só guarda o `title`.

### `routes/admin.js`

```javascript
const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
```

### `routes/shop.js`

```javascript
const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;
```

### `app.js` (só o que muda)

```javascript
const adminRoutes = require('./routes/admin');   // antes: adminData
...
app.use('/admin', adminRoutes);                  // antes: adminData.routes
```

O `admin.js` voltou a exportar **só o router** (`module.exports = router`), por isso o `.routes` deixa de ser preciso. É o contrário do que se fez na aula 79.

---

## Os nomes das funções

O nome é escolha tua. O professor usa **método + o que faz**:

| Função | Quer dizer |
|---|---|
| `getAddProduct` | **GET** da página "Add Product" → mostra o formulário |
| `postAddProduct` | **POST** do "Add Product" → guarda o produto |
| `getProducts` | **GET** dos produtos → mostra a loja |

Com o **`exports.nome = ...`**, um ficheiro pode exportar **várias funções** (aula 79). No `require`, ficam todas dentro do **`productsController`**.

---

## ⚠️ Sem parênteses!

```javascript
router.get('/add-product', productsController.getAddProduct);     // ✅
router.get('/add-product', productsController.getAddProduct());   // ❌
```

| | O que acontece |
|---|---|
| **Sem `()`** | Entregas a função ao Express: *"guarda-a, e corre-a **quando** chegar um pedido"* |
| **Com `()`** | Corres a função **já**, quando o servidor arranca, sem `req` nem `res`. Dá erro |

É como dar a alguém **o teu número de telefone** (sem `()`), em vez de **lhe ligares já** (com `()`).

---

## Os caminhos do `require`

| De onde | Para o controller |
|---|---|
| `routes/admin.js` ou `routes/shop.js` | `'../controllers/products'` → sobe para a raiz e entra em `controllers` |

> 💡 O `path` e o `rootDir` deixam de ser precisos nas rotas, por isso os seus `require` podem ser apagados. Também o `require('./admin')` do `shop.js` sai, porque os produtos agora estão no controller.

---

## Organizar controllers

Não tem de haver **um controller por ficheiro de rotas**. O professor agrupa **por tema**: tudo o que mexe em produtos vai para o `products.js`, mesmo vindo de rotas diferentes (`admin` e `shop`). Mais tarde pode haver, por exemplo, um `users.js` para a lógica de utilizadores.

---

## ✅ A reter

- **`controllers/`** → a lógica. **`routes/`** → só caminho + método + controller.
- **`exports.getAddProduct = (req, res, next) => {...}`** → várias funções exportadas.
- Na rota: **`productsController.getAddProduct`**, **sem `()`**.
- O array `products` passa para o controller, e o `admin.js` volta a exportar **só o router**.
- A app funciona **igual**: só mudou a organização.