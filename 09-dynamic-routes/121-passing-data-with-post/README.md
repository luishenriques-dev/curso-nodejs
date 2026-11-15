# 121. Passing Data with POST Requests

**Secção 9 — Dynamic Routes & Advanced Models**

> 🛒 **O exemplo é o carrinho** (que saltei), mas a aula ensina **duas técnicas** que se usam noutras partes: mandar o **ID num formulário escondido** e **passar variáveis a um include**.

> **Em resumo:** num pedido **POST**, os dados não precisam de ir no URL: vão no **corpo do pedido** (`req.body`). Para o botão "Add to Cart" dizer **qual produto** é, usa-se um **`<input type="hidden">`** com o ID.

---

## GET vs POST: onde vão os dados

| Pedido | Onde vão os dados | Como se leem |
|---|---|---|
| **GET** (abrir uma página, clicar num link) | No **URL** → `/products/123` | `req.params` (aula 118) |
| **POST** (submeter um formulário) | No **corpo do pedido** | `req.body` (aula 64) |

O botão "Add to Cart" é um **formulário POST**, por isso o ID vai no **corpo**, e não no URL.

> 💡 Também dava para pôr o ID no URL de um POST (`/cart/123`), mas não é preciso.

---

## Técnica 1 — O input escondido

### `views/shop/product-detail.ejs`

```html
<form action="/cart" method="post">
    <button class="btn" type="submit">Add to Cart</button>
    <input type="hidden" name="productId" value="<%= product.id %>">
</form>
```

| Parte | O que faz |
|---|---|
| `type="hidden"` | O campo **não aparece** na página, mas **é enviado** com o formulário |
| `name="productId"` | O **nome** com que chega ao `req.body` |
| `value="<%= product.id %>"` | O **ID** do produto, escrito pelo EJS |

### `controllers/shop.js`

```javascript
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;     // o ID que veio do input escondido
  console.log(prodId);
  res.redirect('/cart');
};
```

### `routes/shop.js`

```javascript
router.post('/cart', shopController.postCart);
```

A **mesma morada** `/cart` tem um **GET** (ver o carrinho) e um **POST** (adicionar ao carrinho). É a ideia das "duas portas" da aula 73.

> 💡 Esta técnica volta a aparecer para **editar** e **apagar** produtos.

---

## Técnica 2 — Passar variáveis a um include

O mesmo formulário "Add to Cart" aparece em **3 páginas** (detalhe, lista de produtos e página inicial). Por isso, o professor passa-o para um include: **`views/includes/add-to-cart.ejs`**.

### O problema dentro de um ciclo

Na lista de produtos, o include está **dentro de um `for`**. O **`product`** do ciclo só existe **dentro do ciclo**, e o include **não o recebe sozinho**. Dá erro: `product is not defined`.

### A solução: um segundo argumento no `include`

```html
<% for (let product of prods) { %>
    ...
    <%- include('../includes/add-to-cart.ejs', { product: product }) %>
<% } %>
```

```
{ product: product }
   ↑         ↑
   nome no   variável do ciclo
   include
```

É a mesma ideia do **`res.render('pagina', { ... })`**: o objeto diz **que dados** o ficheiro recebe.

> 💡 Na página de **detalhe** não é preciso, porque o `product` não está dentro de um ciclo: está disponível na página toda.

---

## ✅ A reter

- **GET** → dados no **URL** (`req.params`). **POST** → dados no **corpo** (`req.body`).
- **`<input type="hidden" name="productId" value="...">`** → mandar o ID **sem aparecer**.
- O mesmo caminho pode ter **GET e POST** (`/cart`).
- Include **dentro de um ciclo** → passar a variável: **`include('...', { product: product })`**.