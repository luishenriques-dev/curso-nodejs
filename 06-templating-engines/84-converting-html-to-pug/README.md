# 84. Converting HTML Files to Pug

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> ⏭️ **Aula saltada (Pug).** Resumo só para referência. O que interessa para o EJS está na secção **🔧 O que muda no servidor**.

> **Em resumo:** as páginas **Add Product** e **404** também passam a ser templates. As rotas trocam o `sendFile` pelo `render`, e cada uma envia o seu **`pageTitle`**.

---

## 🔧 O que muda no servidor (precisas disto para o EJS)

### `routes/admin.js` (a rota GET)

```javascript
router.get('/add-product', (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product' });
});
```

### `app.js` (a 404)

```javascript
app.use((req, res, next) => {
  res.status(404).render('404');
});
```

> 💡 Ainda **sem dados** na 404. O `pageTitle` entra na aula 86.

Em todas as rotas, a regra é a mesma: **sem `path.join`** e **sem extensão**, porque o Express procura na pasta `views` com o engine definido no `app.set`.

---

## O resto da aula: converter para Pug (só referência)

- Cria-se o `add-product.pug` e o `404.pug` a partir dos `.html`.
- Na página Add Product, a classe **`active`** passa para o link **Add Product**.
- O `add-product` também precisa do **`forms.css`** (do CSS novo da aula 79).
- O professor **não apaga os `.html`**, para depois poder experimentar os outros engines.

---

## ✅ A reter

- **`res.render('add-product', { pageTitle: 'Add Product' })`** no `admin.js`.
- **`res.status(404).render('404')`** no `app.js`.