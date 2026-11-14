# 98. Finishing the Controllers

**Secção 7 — The Model View Controller (MVC)**

> **Em resumo:** a página **404** também passa para um controller: **`controllers/error.js`**. O `app.js` fica só a dizer **que controller usar**, como as outras rotas.

---

## Porquê um controller novo?

A 404 **não tem nada a ver com produtos**: qualquer caminho errado vai lá parar. Por isso não faz sentido pô-la no `products.js`. O professor cria um controller próprio para **erros**: o `error.js`.

> 💡 É opcional: a 404 no `app.js` funcionava bem. Mas assim fica **igual ao resto** do código.

---

## O código desta aula

### `controllers/error.js` (novo)

```javascript
exports.get404 = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
};
```

### `app.js` (só o que muda)

```javascript
const errorController = require('./controllers/error');

...

app.use(errorController.get404);
```

| Linha | O que faz |
|---|---|
| `require('./controllers/error')` | Com **um ponto**, porque o `app.js` está na **raiz** e a pasta `controllers` está ao lado |
| `app.use(errorController.get404)` | O "apanha-tudo" do fim (aula 67), agora com a função no controller. **Sem `()`** |

---

## A estrutura dos controllers

```
controllers/
├── products.js   → getAddProduct, postAddProduct, getProducts
└── error.js      → get404
```

O nome **`get404`** segue o padrão das outras funções: **método + o que mostra**.

---

## ✅ A reter

- A 404 vai para **`controllers/error.js`**, porque não pertence aos produtos.
- No `app.js`: **`app.use(errorController.get404)`**, sem `()`.
- `require` a partir do `app.js` → **`'./controllers/...'`** (um ponto). A partir das rotas → **`'../controllers/...'`** (dois pontos).
- Já temos **Views** e **Controllers**. Falta o **Model**.