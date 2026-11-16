# 166. Creating & Fetching a Cart

**Secção 11 — Understanding Sequelize**

> ⏭️ **Aula saltada.** É sobre o carrinho, que não me interessa para o estágio. Fica só o README, com as ideias que servem para qualquer relação.

> **Em resumo:** o `getCart` do `shopController` passa a usar a base de dados. O carrinho **não é uma propriedade** do utilizador (`req.user.cart` dá `undefined`): vai-se buscar com o método "mágico" **`req.user.getCart()`**. Ao arrancar, cria-se um carrinho para o utilizador com **`user.createCart()`**. Depois, **`cart.getProducts()`** vai buscar os produtos **através da tabela do meio**.

---

## Ideia 1 — `req.user.cart` não existe; usa-se `getCart()`

```javascript
console.log(req.user.cart);   // undefined ❌
req.user.getCart()            // ✅ vai à base de dados buscar o carrinho
  .then(cart => console.log(cart));
```

O Sequelize **não carrega** as coisas associadas sozinho. Para as ter, chama-se o **método "mágico"**.

| Relação (aula 165) | Métodos "mágicos" criados |
|---|---|
| `User.hasOne(Cart)` → **um** carrinho | `getCart()`, `createCart()` (no **singular**) |
| `User.hasMany(Product)` → **vários** produtos | `getProducts()`, `createProduct()` (aulas 163–164) |
| `Cart.belongsToMany(Product)` | `cart.getProducts()`, `cart.addProduct()` |

> 💡 Repara: com **`hasOne`**, o nome fica no **singular** (`getCart`). Com **`hasMany`** / **`belongsToMany`**, no **plural** (`getProducts`).

---

## Ideia 2 — Criar o carrinho ao arrancar (`app.js`)

Ao início, o `getCart()` devolve **`null`**: a tabela `carts` está vazia. Tal como se cria o utilizador de teste (aula 162), cria-se também o carrinho dele:

```javascript
sequelize
  .sync()
  .then(result => User.findByPk(1))
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    return user.createCart();     // ← novo
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
```

- **`user.createCart()`** cria um carrinho **já ligado** ao utilizador (preenche o `userId`). Não precisa de dados: o carrinho começa vazio.
- O **`force: true`** sai outra vez, para não se perderem os dados.

> ⚠️ Como está no curso, cria **um carrinho novo a cada arranque**. Num projeto a sério, verificava-se primeiro se já existe (como se faz com o utilizador).

---

## Ideia 3 — Os produtos do carrinho, através da tabela do meio

```javascript
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};
```

O **`cart.getProducts()`** existe por causa do **`belongsToMany(..., { through: CartItem })`**. O Sequelize vai **sozinho** à tabela do meio (`cartItems`) e junta tudo num só `SELECT`:

```sql
-- mais ou menos o que o Sequelize corre:
SELECT products.*, cartItems.quantity
FROM products
INNER JOIN cartItems ON products.id = cartItems.productId
WHERE cartItems.cartId = 1;
```

> 💡 É aqui que se vê a vantagem do Sequelize: este **`JOIN`** escrevia-se à mão em SQL.

> 🏢 **No meu exemplo de empresa:** *"os projetos deste colaborador"* → `colaborador.getProjetos()` → um `JOIN` com a tabela `colaboradorProjetos`.

---

## ✅ A reter

- As coisas associadas **não vêm como propriedade** (`req.user.cart` → `undefined`). Usa-se o **método "mágico"**: `getCart()`.
- **`hasOne`** → métodos no **singular** (`getCart`, `createCart`).
- **`createCart()`** cria o carrinho **já ligado** ao utilizador.
- **`cart.getProducts()`** passa pela **tabela do meio** sozinho → é um **`JOIN`** em SQL.