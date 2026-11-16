# 165. One-To-Many & Many-To-Many Relations

**Secção 11 — Understanding Sequelize**

> **Em resumo:** volta o **carrinho**, agora na base de dados. Um utilizador tem **um** carrinho (**`hasOne`**), e um carrinho tem **vários** produtos, que podem estar em **vários** carrinhos (**`belongsToMany`**). Esta relação **muitos para muitos** precisa de uma **tabela do meio**: a **`cartItems`**, que guarda os pares carrinho + produto e a quantidade.

---

## Os tipos de relação

| Relação | Exemplo na loja | Como se liga | Sequelize |
|---|---|---|---|
| **Um para um** | Um utilizador tem **um** carrinho | Coluna `userId` na tabela `carts` | `hasOne` / `belongsTo` |
| **Um para muitos** (aula 161) | Um utilizador criou **vários** produtos | Coluna `userId` na tabela `products` | `hasMany` / `belongsTo` |
| **Muitos para muitos** | Um carrinho tem **vários** produtos, e um produto está em **vários** carrinhos | Uma **tabela do meio** | `belongsToMany` + `through` |

---

## Porque é que "muitos para muitos" precisa de uma tabela do meio

Numa coluna só cabe **um** valor. Se pusesses `productId` na tabela `carts`, cada carrinho só podia ter **um** produto. Se pusesses `cartId` na tabela `products`, cada produto só podia estar em **um** carrinho.

A solução é uma **terceira tabela**, que guarda **pares**:

### `cartItems`

| id | cartId | productId | quantity |
|---|---|---|---|
| 1 | 1 | 5 | 2 |
| 2 | 1 | 7 | 1 |
| 3 | 2 | 5 | 3 |

- O carrinho **1** tem o produto 5 (×2) e o produto 7 (×1).
- O produto **5** está nos carrinhos 1 **e** 2.

> 🧾 **Analogia:** o **carrinho** é o talão em branco, com o nome do cliente. As **linhas do talão** (os `cartItems`) dizem que produto e quantos. O **produto** é a ficha do artigo na prateleira, que pode aparecer em muitos talões.

> 🏢 **No meu exemplo de empresa:** um colaborador trabalha em **vários projetos**, e um projeto tem **vários colaboradores**. A tabela do meio seria `colaboradorProjetos`, com `colaboradorId` + `projetoId` (e uma coluna extra, como a **função** dele no projeto).

---

## O código

### `models/cartModel.js` (reescrito de raiz)

O carrinho antigo (que usava o ficheiro `cart.json`) **é apagado**, e fica só isto:

```javascript
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;
```

**"Onde estão os produtos?"** Não ficam aqui: ficam na **tabela do meio**. E o **`userId`** é juntado pelo Sequelize, por causa da associação.

### `models/cartItemModel.js` (novo)

```javascript
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
```

O **`cartId`** e o **`productId`** **não se escrevem**: o Sequelize junta-os por causa das associações.

> ⚠️ No vídeo, o professor pôs o `id` como **`Sequelize.STRING`** e deu erro (*Incorrect column specifier for column id*). Um `autoIncrement` tem de ser **`INTEGER`**.

### `app.js` — os imports e as associações

```javascript
const Product = require('./models/productModel');
const User = require('./models/userModel');
const Cart = require('./models/cartModel');
const CartItem = require('./models/cartItemModel');

// ...

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
```

| Linha | Lê-se… | Cria |
|---|---|---|
| `User.hasOne(Cart)` | *"o utilizador tem **um** carrinho"* | A coluna **`userId`** em `carts` |
| `Cart.belongsTo(User)` | *"o carrinho pertence a um utilizador"* | O mesmo, do outro lado (opcional) |
| `Cart.belongsToMany(Product, { through: CartItem })` | *"o carrinho tem **vários** produtos, **através** do CartItem"* | As colunas **`cartId`** e **`productId`** em `cartItems` |
| `Product.belongsToMany(Cart, { through: CartItem })` | *"o produto está em **vários** carrinhos"* | O mesmo, do outro lado |

- **`through`** = "através de": diz **qual é a tabela do meio**.

---

## O `force: true` (outra vez)

As tabelas `carts` e `cartItems` **não existem**, e as relações são novas. Por isso:

1. Pôr o **`{ force: true }`** no `sync`.
2. `npm start` **uma vez**.
3. **Tirar o `force: true`** logo a seguir.

> ⚠️ Os produtos **perdem-se**. O utilizador é **recriado sozinho**, pelo código da aula 162 (`if (!user)` → `create`).

---

## 🔍 Em SQL "à mão"

```sql
CREATE TABLE carts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE cartItems (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quantity INT,
  cartId INT,
  productId INT,
  FOREIGN KEY (cartId) REFERENCES carts(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);
```

Uma tabela do meio é **sempre isto**: duas chaves estrangeiras, uma para cada lado, mais as colunas extra que a ligação precisar (aqui, a `quantity`).

---

## Testar

No Workbench: botão direito → **Refresh All**. Devem aparecer **4 tabelas**:

| Tabela | Colunas importantes |
|---|---|
| `users` | id, name, email |
| `products` | id, title, …, **userId** |
| `carts` | id, **userId** |
| `cartItems` | id, quantity, **cartId**, **productId** |

---

## ✅ A reter

- **Um para um:** `hasOne` / `belongsTo`.
- **Um para muitos:** `hasMany` / `belongsTo`.
- **Muitos para muitos:** `belongsToMany` + **`through`** → precisa de uma **tabela do meio**.
- A tabela do meio guarda **pares de ids** (+ dados extra, como a quantidade).
- Os ids com `autoIncrement` são **`INTEGER`**, nunca `STRING`.
- **`force: true`** só **uma vez**, e depois tira-se.