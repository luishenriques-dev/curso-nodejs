# 122. Adding a Cart Model

**Secção 9 — Dynamic Routes & Advanced Models**

> ⏭️ **Aula saltada (carrinho).** Resumo só para referência.

> **Em resumo:** um **model novo**, o **`Cart`** (carrinho), guardado em **`data/cart.json`**. Ao adicionar um produto: se já estiver no carrinho, **aumenta a quantidade**; se não, **junta-o** com quantidade 1. O **preço total** é atualizado.

---

## Como fica o carrinho no ficheiro

```json
{
  "products": [ { "id": "0.123", "qty": 2 }, { "id": "0.456", "qty": 1 } ],
  "totalPrice": 39.98
}
```

Guarda só o **ID** e a **quantidade** de cada produto. Os outros dados (título, imagem…) já estão no `products.json`.

---

## Porque é que o `Cart` não tem `constructor`

Um **produto** cria-se muitas vezes: `new Product(...)` para cada um. O **carrinho** é **um só**: não se cria um novo a cada produto adicionado. Por isso, o `Cart` só tem **métodos `static`**, como o `addProduct`. Usa-se diretamente a "fôrma", sem `new`.

---

## O código (referência)

### `models/cart.js`

```javascript
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };            // 1. carrinho vazio...
      if (!err) {
        cart = JSON.parse(fileContent);                        //    ...ou o que está no ficheiro
      }

      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];   // 2. já lá está?

      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };               // 3a. sim → copia-o
        updatedProduct.qty = updatedProduct.qty + 1;           //      e soma 1 à quantidade
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;  //      substitui o antigo
      } else {
        updatedProduct = { id: id, qty: 1 };                   // 3b. não → produto novo, qty 1
        cart.products = [...cart.products, updatedProduct];    //      junta-o à lista
      }

      cart.totalPrice = cart.totalPrice + +productPrice;        // 4. atualiza o total

      fs.writeFile(p, JSON.stringify(cart), err => {           // 5. guarda o carrinho
        console.log(err);
      });
    });
  }
};
```

### `controllers/shop.js`

```javascript
const Cart = require('../models/cart');

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {        // vai buscar o produto, para saber o preço
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};
```

---

## Coisas de JavaScript que valem a pena (mesmo sem o carrinho)

| O quê | Exemplo | O que faz |
|---|---|---|
| **`findIndex`** | `lista.findIndex(p => p.id === id)` | Como o `find` (aula 119), mas devolve a **posição** (0, 1, 2…) em vez do elemento. Se não encontrar, dá **`-1`** |
| **Spread num objeto** `{...}` | `{ ...existingProduct }` | Cria uma **cópia** do objeto, com as mesmas propriedades |
| **Spread num array** `[...]` | `[...cart.products, novo]` | Cria uma **cópia** do array, e pode juntar elementos no fim |
| **`+` antes de um texto** | `+productPrice` | Converte **texto em número**: `+"19.99"` → `19.99` |

### ⚠️ O problema do preço como texto

O preço vem do formulário como **texto**. Sem o `+`:

```javascript
0 + "19.99"         // → "019.99"   (junta os textos!)
0 + +"19.99"        // → 19.99      (soma números)
```

É o mesmo tipo de problema do ID sem aspas da aula 119, mas ao contrário: aqui é preciso **transformar texto em número**.

---

## ✅ A reter

- **`Cart`** = model do carrinho, com **só métodos `static`**, porque há **um só** carrinho.
- Produto já no carrinho → **quantidade + 1**. Produto novo → **junta com quantidade 1**.
- **`findIndex`** → a **posição** de um elemento. **`{...obj}`** e **`[...arr]`** → **cópias**.
- **`+texto`** → converte em **número**, para somar em vez de juntar texto.