# 86. Finishing the Pug Template

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> ⏭️ **Aula saltada (Pug).** Resumo só para referência. O que interessa para o EJS está na secção **🔧 O que muda no servidor**, e no **checklist** no fim.

> **Em resumo:** cada rota passa a enviar um **`path`**, para o layout saber **que link marcar como ativo**, e um **`pageTitle`**, para o título do separador do browser.

---

## 🔧 O que muda no servidor (precisas disto para o EJS)

### `routes/shop.js`

```javascript
router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
});
```

> ⚠️ O **`docTitle`** da aula 82 passa a chamar-se **`pageTitle`**, igual às outras páginas.

### `routes/admin.js` (a rota GET)

```javascript
router.get('/add-product', (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
});
```

### `app.js` (a 404)

```javascript
app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});
```

---

## Os dois dados novos

### `pageTitle` → o título do separador

Cada página manda o seu, e o layout mostra-o no `<title>`. Antes, o título da 404 aparecia em todas as páginas.

### `path` → qual link está ativo

O layout faz a pergunta: *"o `path` que recebi é `'/admin/add-product'`? Então marca o link **Add Product** como `active`."* O mesmo para o `'/'` e o link **Shop**.

> 💡 O valor do `path` **pode ser qualquer texto**, desde que o `.js` e o template usem o mesmo. O professor usa o próprio caminho da rota porque é fácil de lembrar.

---

## ⚠️ Um erro do professor que podes repetir

```javascript
{ prods: products, pageTitle = 'Shop' }   // ❌ "=" dá erro
{ prods: products, pageTitle: 'Shop' }    // ✅ num objeto usa-se ":"
```

---

## 📋 Checklist antes da aula 91 (EJS)

No teu projeto, confirma que tens:

- [ ] `ejs` instalado (`npm install --save ejs`)
- [ ] No `app.js`: `app.set('view engine', ...)` e `app.set('views', 'views')`
- [ ] No `shop.js`: `res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' })`
- [ ] No `admin.js`: `res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' })`
- [ ] No `app.js`: `res.status(404).render('404', { pageTitle: 'Page Not Found' })`
- [ ] Os produtos guardados com o `products.push(...)` da aula 79

Os nomes **`prods`**, **`pageTitle`** e **`path`** são os que vais usar dentro dos ficheiros `.ejs`.

---

## ✅ A reter

- **`pageTitle`** → o título de cada página.
- **`path`** → diz ao template **que link está ativo**.
- Os dados de cada página são enviados **pelo `res.render`** de cada rota.