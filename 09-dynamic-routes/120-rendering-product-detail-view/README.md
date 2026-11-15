# 120. Rendering the Product Detail View

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** em vez de mostrar o produto no terminal (aula 119), o controller passa a mostrar uma **página de detalhe**: título, imagem, preço e descrição. Junta-se tudo o que se viu nas aulas 117–119.

---

## O caminho completo, do clique à página

```
1. Clicas em "Details"            → /products/0.456              (aula 117)
2. A rota apanha o ID             → /products/:productId          (aula 118)
3. O controller lê o ID           → req.params.productId = "0.456"
4. Pede a ficha ao model          → Product.findById("0.456", ...) (aula 119)
5. Mostra a página com essa ficha → res.render('shop/product-detail', { product })   ← esta aula
```

---

## O código desta aula

### `controllers/shop.js`

```javascript
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};
```

Em vez do `console.log` e do `redirect`, agora há um **`res.render`** dentro do callback, porque só lá dentro é que a ficha já chegou.

| Dado | Valor | Para quê |
|---|---|---|
| `product` | A ficha que o `findById` encontrou | A página mostra os dados dela |
| `pageTitle` | **`product.title`** | O separador do browser mostra o **nome do produto** |
| `path` | `'/products'` | Destaca o link **Products** no menu |

> 💡 **`product: product`**: o da **esquerda** é o **nome** que a página vai usar. O da **direita** é a **variável** com a ficha. É a ideia da aula 82.

### `views/shop/product-detail.ejs`

```html
<%- include('../includes/head.ejs') %>
</head>

<body>
    <%- include('../includes/navigation.ejs') %>
    <main class="centered">
        <h1><%= product.title %></h1>
        <hr>
        <div>
            <img src="<%= product.imageUrl %>" alt="<%= product.title %>">
        </div>
        <h2><%= product.price %></h2>
        <p><%= product.description %></p>
        <form action="/cart" method="post">
            <button class="btn" type="submit">Add to Cart</button>
        </form>
    </main>
<%- include('../includes/end.ejs') %>
```

> ⚠️ Os includes levam **`../`**: o ficheiro está em **`views/shop/`**, e os includes estão em **`views/includes/`**. O caminho conta **a partir do ficheiro** (aula 92), por isso é preciso subir uma pasta.

### `public/css/main.css`

```css
.centered {
  text-align: center;
}
```

Centra o conteúdo da página.

---

## Os erros que o professor teve (e porquê)

| Erro | Porquê | Correção |
|---|---|---|
| `pageTitle is not defined` | O **`head.ejs`** usa o `pageTitle` em todas as páginas | Passar **`pageTitle`** no `render` |
| `path is not defined` | O **`navigation.ejs`** usa o `path` em todas as páginas | Passar **`path`** no `render` |

> 💡 **Regra:** todas as páginas que incluem o `head` e o `navigation` têm de receber **`pageTitle`** e **`path`**.

### Que `path` usar?

Não há nenhum link no menu para **um** produto. O professor escolhe **`'/products'`** porque a página de detalhe **faz parte da área dos produtos**. Assim, o link **Products** fica destacado.

---

## O botão "Add to Cart"

Um formulário **POST** para `/cart`. A rota ainda não existe: o professor faz o carrinho nas aulas seguintes, que **saltei**.

---

## Testar

1. Na lista de produtos, clica em **Details**.
2. Aparece a **página do produto**: título, imagem, preço, descrição e o botão.
3. O separador do browser mostra **o nome do produto**.
4. No menu, o link **Products** está destacado.

---

## ✅ A reter

- **Clique → rota com `:productId` → `req.params` → `findById` → `res.render`**.
- O `res.render` vai **dentro** do callback do `findById`.
- **`product: product`** → a página recebe a ficha com o nome `product`.
- Todas as páginas precisam de **`pageTitle`** e **`path`**, por causa do `head` e do `navigation`.
- Views em subpastas → **`'../includes/...'`** nos includes.