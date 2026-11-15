# 129. Displaying Cart Items on the Cart Page

**Secção 9 — Dynamic Routes & Advanced Models**

> ⏭️ **Aula saltada (carrinho).** Resumo só para referência.

> **Em resumo:** a página do carrinho passa a **mostrar os produtos** que lá estão, com a **quantidade** de cada um. O carrinho só guarda **IDs e quantidades**, por isso é preciso **juntar** essa informação com os dados dos produtos (título, etc.).

---

## O problema

| Ficheiro | O que tem |
|---|---|
| `cart.json` | Só o **ID** e a **quantidade**: `{ "id": "0.123", "qty": 2 }` |
| `products.json` | Os **dados** do produto: título, imagem, preço… |

Para mostrar *"Book (2)"*, é preciso **ir aos dois** e juntá-los.

---

## O código (referência)

### `models/cart.js` — ler o carrinho

```javascript
static getCart(cb) {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb(null);                          // ainda não há carrinho
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}
```

### `controllers/shop.js` — juntar carrinho + produtos

```javascript
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {                             // 1. lê o carrinho
    Product.fetchAll(products => {                   // 2. lê todos os produtos
      const cartProducts = [];
      for (const product of products) {              // 3. para cada produto da loja...
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {                       //    ...está no carrinho?
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};
```

Cada elemento do `cartProducts` fica assim:

```javascript
{ productData: { title: 'Book', price: '12', ... }, qty: 2 }
```

### `views/shop/cart.ejs`

```html
<main>
    <% if (products.length > 0) { %>
        <ul>
            <% products.forEach(p => { %>
                <li><%= p.productData.title %> (<%= p.qty %>)</li>
            <% }) %>
        </ul>
    <% } else { %>
        <h1>No Products in Cart!</h1>
    <% } %>
</main>
```

---

## Coisas que valem a pena (mesmo sem o carrinho)

| O quê | O que é |
|---|---|
| **Callbacks dentro de callbacks** | Para ler **dois ficheiros**, um `fetchAll` vai **dentro** do `getCart`. O professor avisa que mais à frente há uma forma mais limpa (as *promises*) |
| **Juntar dados de dois sítios** | Com o `find`, procura-se num array o elemento que corresponde a outro. É o que uma base de dados faz sozinha (um *join*) |
| **`forEach` no EJS** | Outra forma de fazer o ciclo, em vez do `for...of` (aula 91). Atenção aos fechos: **`<% }) %>`** |

---

## ✅ A reter

- O carrinho guarda **IDs e quantidades**. Os dados do produto vêm do **`products.json`**.
- Juntam-se os dois com um ciclo + **`find`** → `{ productData, qty }`.
- Para ler dois ficheiros: **callback dentro de callback**.
- No EJS: **`products.forEach(p => { %> ... <% }) %>`**.