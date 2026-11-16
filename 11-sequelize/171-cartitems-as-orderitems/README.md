# 171. Storing CartItems as OrderItems

**Secção 11 — Understanding Sequelize**

> ⏭️ **Aula saltada.** É sobre as encomendas. Fica só o README, com as ideias que servem para qualquer relação.

> **Em resumo:** um botão **"Order Now"** no carrinho cria uma encomenda com **tudo o que está no carrinho**. Passos: **`req.user.getCart()`** → **`cart.getProducts()`** → **`req.user.createOrder()`** → **`order.addProducts(...)`**. Como cada produto tem uma quantidade diferente, usa-se o **`map`** para pôr em cada produto um campo **`orderItem: { quantity }`**, que o Sequelize lê.

---

## A view e a rota

**`views/shop/cart.ejs`**: por baixo da lista, um formulário com o botão:

```ejs
<hr>
<div class="centered">
  <form action="/create-order" method="POST">
    <button type="submit" class="btn">Order Now!</button>
  </form>
</div>
```

**`routes/shop.js`**:

```javascript
router.post('/create-order', shopController.postOrder);
```

---

## O controller: `postOrder`

```javascript
exports.postOrder = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};
```

| Passo | Código | Método "mágico" vindo de… |
|---|---|---|
| 1. O carrinho | `req.user.getCart()` | `User.hasOne(Cart)` |
| 2. Os produtos do carrinho | `cart.getProducts()` | `Cart.belongsToMany(Product)` |
| 3. Uma encomenda nova, já ligada ao utilizador | `req.user.createOrder()` | `User.hasMany(Order)` |
| 4. Pôr os produtos na encomenda | `order.addProducts([...])` | `Order.belongsToMany(Product)` |

> 💡 Não é preciso fazer `require` do `Cart` nem do `Order` no controller: chega-se a eles **através do `req.user`**.

---

## Ideia 1 — `addProducts` (plural) junta vários de uma vez

- **`addProduct(produto, { through: { quantity } })`** (aula 167) → **um** produto, **uma** quantidade.
- **`addProducts([...])`** → **vários** produtos de uma vez.

Mas cada produto tem a **sua** quantidade, por isso não dá para usar um `through` só. A solução é pôr a quantidade **dentro de cada produto**, num campo com o **nome do model da tabela do meio**:

```javascript
product.orderItem = { quantity: 3 };
```

> ⚠️ O nome tem de ser **igual** ao do `sequelize.define('orderItem', ...)`: `orderItem`, com o **o minúsculo** e o **I maiúsculo**.

---

## Ideia 2 — O `map`: transformar cada elemento de um array

```javascript
products.map(product => {
  product.orderItem = { quantity: product.cartItem.quantity };
  return product;
})
```

- O **`map`** corre uma função **para cada elemento** e devolve um **array novo** com os elementos modificados.
- Aqui, **copia a quantidade** do carrinho (`product.cartItem.quantity`) para a encomenda (`product.orderItem`).

> 🧾 **Analogia:** passas as linhas do **talão do carrinho** para o **talão da encomenda**, linha a linha, com a mesma quantidade.

```javascript
// exemplo simples do map:
[1, 2, 3].map(n => n * 2);   // → [2, 4, 6]
```

---

## O resultado (no Workbench)

| Tabela | O que aparece |
|---|---|
| `orders` | Uma encomenda nova, com o **`userId`** |
| `orderItems` | Uma linha **por produto**, com o **`orderId`**, o **`productId`** e a **`quantity`** certa |

> 💡 Nesta aula, o carrinho **ainda não é limpo**, e a página **Orders** ainda não mostra nada. Fica para a aula seguinte.

---

## 🏢 No meu exemplo de empresa

*"Converter um pedido de material numa requisição aprovada"*: ler as linhas do pedido → criar a requisição → copiar as linhas, com as quantidades.

---

## ✅ A reter

- **`createOrder()`** cria a encomenda **já ligada** ao utilizador.
- **`addProducts([...])`** junta **vários** produtos à tabela do meio de uma vez.
- Para os **campos extra** de cada um, põe-se em cada produto um campo com o **nome do model do meio** (`product.orderItem = { quantity }`).
- **`map`** → transforma **cada elemento** de um array e devolve um array novo.