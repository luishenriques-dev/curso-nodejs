# 167. Adding New Products to the Cart

**Secção 11 — Understanding Sequelize**

> ⏭️ **Aula saltada.** É sobre o carrinho. Fica só o README, com as ideias que servem para qualquer relação muitos para muitos.

> **Em resumo:** o `postCart` é reescrito para **adicionar um produto ao carrinho**. Primeiro, vê-se se o produto **já está** no carrinho. Se não estiver, usa-se o método "mágico" **`cart.addProduct(product, { through: { quantity: 1 } })`**, que **escreve uma linha na tabela do meio** (`cartItems`), incluindo a coluna extra `quantity`.

---

## Os passos do `postCart`

```
1. req.user.getCart()                         → o carrinho do utilizador
2. cart.getProducts({ where: { id: prodId } }) → este produto já está no carrinho?
3a. Já está   → aumentar a quantidade         (aula 168)
3b. Não está  → Product.findByPk(prodId) → cart.addProduct(...) com quantity 1
4. res.redirect('/cart')
```

---

## O código (simplificado)

```javascript
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
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
      let newQuantity = 1;
      if (product) {
        // já está no carrinho → aula 168
      }
      return Product.findByPk(prodId)
        .then(product => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity }
          });
        })
        .catch(err => console.log(err));
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};
```

---

## Ideia 1 — Verificar se já existe

```javascript
cart.getProducts({ where: { id: prodId } })
```

Devolve um **array** (como na aula 164): **vazio** se o produto ainda não está no carrinho, ou com **um** produto se já está. Por isso: `if (products.length > 0) product = products[0];`.

> 🏢 **No meu exemplo de empresa:** antes de pôr um colaborador num projeto, ver se **já lá está**, para não o pôr duas vezes.

---

## Ideia 2 — `addProduct` escreve na tabela do meio

```javascript
fetchedCart.addProduct(product, {
  through: { quantity: newQuantity }
});
```

- **`addProduct`** é outro método "mágico", criado pelo **`belongsToMany`** (aula 165).
- Junta uma linha à **`cartItems`**, com o `cartId` e o `productId` **preenchidos sozinhos**.
- A tabela do meio tem uma coluna **extra** (`quantity`), que o Sequelize não consegue adivinhar. Passa-se no **`through`**.

| No `app.js` (aula 165) | Aqui |
|---|---|
| `through: CartItem` → **qual** é a tabela do meio | `through: { quantity: 1 }` → **que valores extra** pôr nessa tabela |

```sql
-- o que o Sequelize corre:
INSERT INTO cartItems (cartId, productId, quantity) VALUES (1, 1, 1);
```

> 🏢 **No meu exemplo:** `colaborador.addProjeto(projeto, { through: { funcao: 'Técnico' } })`.

---

## Ideia 3 — Guardar o carrinho numa variável "de fora" (`fetchedCart`)

O `cart` só existe **dentro** do primeiro `.then`. Mas é preciso lá mais abaixo, noutro `.then`. Solução: uma variável **antes** da fila, que se preenche no primeiro `.then`:

```javascript
let fetchedCart;              // ← fora
req.user.getCart()
  .then(cart => {
    fetchedCart = cart;       // ← guarda-se
    // ...
  })
  .then(() => {
    fetchedCart.addProduct(...);   // ← usa-se mais abaixo
  });
```

> 🎒 **Analogia:** em vez de deixares o carrinho na primeira sala, **levas-o na mochila** para as salas seguintes.

---

## Ideia 4 — O `redirect` no fim

Sem o **`res.redirect('/cart')`**, o browser fica **preso** a carregar (como na aula 158). Com ele, vai para a página do carrinho. Essa página **ainda dá erro**, e é corrigida na aula seguinte.

---

## ✅ A reter

- Antes de juntar, **ver se já existe**: `getProducts({ where })` → array.
- **`addProduct(produto, { through: { campoExtra } })`** → escreve uma linha na **tabela do meio**.
- O **`through`** serve para os **campos extra** da tabela do meio (aqui, a `quantity`).
- Uma variável **de fora** (`let fetchedCart`) leva um valor de um `.then` para outro.