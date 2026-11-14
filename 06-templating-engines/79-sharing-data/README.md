# 79. Sharing Data Across Requests & Users

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> **Em resumo:** os produtos do formulário passam a ser **guardados** num **array** no `admin.js`. Esse array é **exportado**, e o `shop.js` vai buscá-lo. Funciona, mas tem um problema: os dados são **os mesmos para todos os utilizadores**.

---

## Antes desta aula

O formulário enviava o produto, e o servidor só fazia `console.log(req.body)`. **Não guardava nada.**

---

## Passo 1 — Uma "caixa" para guardar os produtos

No `routes/admin.js`, cria-se um array vazio:

```javascript
const products = [];
```

> 💡 É `const`, mas **podes pôr coisas lá dentro**. O `const` só impede de trocar o array por outro. Não impede de lhe acrescentar elementos.

---

## Passo 2 — Guardar o produto quando o formulário é enviado

Na rota POST, em vez de só mostrar no terminal:

```javascript
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});
```

| Parte | O que faz |
|---|---|
| `req.body.title` | O que o utilizador escreveu no campo `title` |
| `{ title: ... }` | Um objeto novo com esse título. Mais tarde vai ter mais campos, como o preço |
| `products.push(...)` | **Acrescenta** esse objeto ao array |

---

## Passo 3 — Exportar duas coisas em vez de uma

Até aqui, o `admin.js` exportava **só o router**:

```javascript
module.exports = router;
```

Agora tem de exportar **o router e os produtos**:

```javascript
exports.routes = router;
exports.products = products;
```

É como uma **caixa com dois compartimentos**: um chama-se `routes`, e o outro `products`.

---

## Passo 4 — O `app.js` tem de se ajustar

Como o `admin.js` agora exporta uma "caixa", o `app.js` tem de ir buscar **o compartimento das rotas**:

```javascript
const adminData = require('./routes/admin');

app.use('/admin', adminData.routes);
```

> ⚠️ Se te esqueceres do **`.routes`**, a app dá erro, porque o `app.use` recebe a caixa inteira, e não o router.

---

## Passo 5 — O `shop.js` vai buscar os produtos

```javascript
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  console.log('shop.js', adminData.products);
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});
```

O `require('./admin')` tem só **um ponto**, porque o `shop.js` e o `admin.js` estão **na mesma pasta** (`routes/`).

### O teste

1. Abre a loja (`/`). No terminal aparece `shop.js []`, o array vazio.
2. Adiciona um produto, por exemplo "Book".
3. Voltas à loja, e no terminal aparece `shop.js [ { title: 'Book' } ]`.

O produto que o `admin.js` guardou **aparece no `shop.js`**. Os dois ficheiros estão a mexer **no mesmo array**.

---

## ⚠️ O problema: os dados são de TODOS

O professor abre a loja **noutro browser**, que é como ser **outra pessoa**, noutro computador. O "Book" **também lá está**.

O array vive **no servidor**, enquanto ele está a correr. Por isso:

- **todos os utilizadores** veem os mesmos dados;
- se o utilizador A muda alguma coisa, o B **vê logo a mudança**.

Isto quase **nunca** é o que se quer, sobretudo com **dados pessoais** (o carrinho de compras de cada um, por exemplo).

Mais ou menos:

| Quando | O que acontece aos dados |
|---|---|
| **Agora** (variável) | Partilhados por **todos**. Desaparecem quando o servidor **reinicia** |
| Mais à frente (sessões, secção 14) | Guardados **por utilizador** |
| Mais à frente (base de dados) | Guardados **para sempre** |

Por agora serve, porque o objetivo é **praticar**: pôr estes dados dentro das páginas, que é o que vem a seguir.

---

## A analogia: o quadro na parede da loja 🧾

O array `products` é um **quadro de ardósia pendurado na loja**.

- O **funcionário do armazém** (`admin.js`) escreve lá os produtos novos.
- O **funcionário da loja** (`shop.js`) lê o mesmo quadro.

O problema é que o quadro está **à vista de todos os clientes**: o que um escreve, todos veem. E se a loja **fecha** (o servidor reinicia), alguém **apaga o quadro**.

---

## ⚠️ HTML e CSS novos

O professor anexa a esta aula **HTML e CSS novos**, com mais estilo e marcação que se vai usar nesta secção. Os **`.html`** vão para a pasta **`views/`**, e os **`.css`** para a **`public/css/`**.

---

## ✅ A reter

- **`const products = []`** no `admin.js` → onde se guardam os produtos.
- **`products.push({ title: req.body.title })`** na rota POST → guarda o produto.
- **`exports.routes`** + **`exports.products`** → exporta duas coisas.
- No `app.js`: **`adminData.routes`**. No `shop.js`: **`adminData.products`**.
- Os dados ficam **no servidor**, **partilhados por todos os utilizadores**, e **perdem-se** quando ele reinicia. Serve para praticar, mas não para uma app a sério.