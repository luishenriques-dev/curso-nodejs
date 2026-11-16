# 168. Adding Existing Products & Retrieving Cart Items

**Secção 11 — Understanding Sequelize**

> ⏭️ **Aula saltada.** É sobre o carrinho. Fica só o README, com as ideias que servem para qualquer relação muitos para muitos.

> **Em resumo:** se o produto **já está** no carrinho, **aumenta-se a quantidade**. A quantidade atual está na **tabela do meio**, e o Sequelize dá acesso a ela através de **`product.cartItem.quantity`**. Depois, volta-se a chamar **`addProduct`** com a quantidade nova: como o par já existe, o Sequelize faz um **`UPDATE`** em vez de um `INSERT`.

---

## Ideia 1 — Ler a coluna extra da tabela do meio: `product.cartItem`

Quando se vai buscar produtos **através do carrinho** (`cart.getProducts()`), cada produto vem com um campo extra: **`cartItem`**, que é **a linha dele na tabela do meio**.

```javascript
product.title              // da tabela products
product.cartItem.quantity  // da tabela cartItems (deste produto, neste carrinho)
```

Também é assim que a **view do carrinho** mostra a quantidade:

```ejs
<%= p.title %> (<%= p.cartItem.quantity %>)
```

> 🧾 **Analogia:** o produto vem **agarrado à sua linha do talão**. O `product` é a ficha do artigo, e o `product.cartItem` é a linha do talão onde ele aparece, com a quantidade.

> 🏢 **No meu exemplo de empresa:** `projeto.colaboradorProjeto.funcao` → a função deste colaborador **neste** projeto.

---

## Ideia 2 — Aumentar a quantidade

```javascript
if (product) {
  const oldQuantity = product.cartItem.quantity;
  newQuantity = oldQuantity + 1;
  return product;
}
```

Depois, o mesmo **`addProduct`** da aula 167:

```javascript
fetchedCart.addProduct(product, {
  through: { quantity: newQuantity }
});
```

Como o par carrinho + produto **já existe** na `cartItems`, o Sequelize **atualiza** a linha em vez de criar outra:

```sql
-- produto novo (aula 167):
INSERT INTO cartItems (cartId, productId, quantity) VALUES (1, 1, 1);
-- produto que já existe (esta aula):
UPDATE cartItems SET quantity = 2 WHERE cartId = 1 AND productId = 1;
```

---

## Ideia 3 — Arrumar o código: os dois casos acabam iguais

Os dois casos (**já existe** / **é novo**) acabam **da mesma forma**: `addProduct` com uma quantidade. Só muda **de onde vem o produto** e **qual é a quantidade**. Por isso, o professor junta o fim num `.then` só:

```javascript
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;                       // ← agora "de fora"
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {                          // já existe
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);        // é novo
    })
    .then(product => {                        // ← fim igual para os dois
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};
```

- O **`newQuantity`** passa para **fora** (como o `fetchedCart`), para chegar a todos os `.then`.
- O **`return product`** passa o produto ao `.then` seguinte. Um valor devolvido num `.then` é **embrulhado numa promise** sozinho (aula 162).
- Assim, **não há `.then` dentro de `.then`**.

---

## Testar (no vídeo)

- **Add to Cart** duas vezes no mesmo produto → quantidade **2**.
- **Add to Cart** num produto diferente → aparece com quantidade **1**.

---

## ✅ A reter

- Produtos vindos **através do carrinho** trazem a sua linha da tabela do meio: **`product.cartItem`**.
- **`product.cartItem.quantity`** → a coluna extra da tabela do meio.
- **`addProduct`** num par que **já existe** → faz **`UPDATE`** em vez de `INSERT`.
- Quando dois caminhos acabam igual, junta-se o fim num `.then` só, com variáveis **de fora**.