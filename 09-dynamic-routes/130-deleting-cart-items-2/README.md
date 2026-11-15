# 130. Deleting Cart Items

**Secção 9 — Dynamic Routes & Advanced Models**

> ⏭️ **Aula saltada (carrinho).** Resumo só para referência.

> **Em resumo:** cada produto no carrinho ganha um botão **Delete**, que o tira **só do carrinho** (o produto continua na loja). O botão é um **formulário POST** com o ID num **input escondido**.

---

## O código (referência)

### `views/shop/cart.ejs` (cada item da lista)

```html
<li>
    <p><%= p.productData.title %> (<%= p.qty %>)</p>
    <form action="/cart-delete-item" method="POST">
        <input type="hidden" value="<%= p.productData.id %>" name="productId">
        <button class="btn" type="submit">Delete</button>
    </form>
</li>
```

### `routes/shop.js`

```javascript
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
```

### `controllers/shop.js`

```javascript
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;              // o ID do input escondido
  Product.findById(prodId, product => {           // vai buscar o produto, para saber o preço
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};
```

---

## A técnica que vale a pena: o input escondido

```html
<input type="hidden" value="<%= p.productData.id %>" name="productId">
```

| Parte | O que faz |
|---|---|
| `type="hidden"` | O campo **não aparece** na página, mas **é enviado** com o formulário |
| `value="..."` | O ID do produto, escrito pelo EJS |
| `name="productId"` | O nome com que chega ao **`req.body.productId`** (aula 64) |

É assim que um botão **diz ao servidor qual produto** é, num pedido **POST**. É a mesma técnica usada para **apagar um produto** da loja (aula 127).

> 💡 O professor podia ter mandado também o **preço** num input escondido, mas prefere mandar **só o ID** e ir buscar o resto no servidor. É mais limpo, e **mais seguro**: o utilizador podia alterar o preço no browser.

---

## Nota do professor

Guardar dados em ficheiros tem limites. Também falta, por exemplo, só redirecionar **depois** de apagar (com um callback). Tudo isto melhora na **próxima secção**, com a **base de dados**.

---

## ✅ A reter

- Botão Delete = **formulário POST** + **`<input type="hidden">`** com o ID.
- O ID chega em **`req.body.productId`**.
- Mandar **só o ID** e ir buscar o resto (o preço) **no servidor**.
- Apagar do carrinho **não apaga** o produto da loja.