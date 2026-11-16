# 170. Adding an Order Model

**Secção 11 — Understanding Sequelize**

> ⏭️ **Aula saltada.** É sobre as encomendas. Fica só o README, com as ideias das relações.

> **Em resumo:** criam-se os models **`Order`** (encomenda) e **`OrderItem`** (linha da encomenda), com a mesma estrutura do `Cart` e do `CartItem`. A diferença está numa relação: um utilizador tem **um** carrinho, mas **várias** encomendas → **`User.hasMany(Order)`**. Entre encomendas e produtos é outra vez **muitos para muitos**, com a tabela do meio `orderItems`.

---

## Os models

### `models/orderModel.js`

```javascript
const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});
```

Só o `id`, como o carrinho. Numa loja a sério, podia ter mais coisas, como a **morada** de entrega.

### `models/orderItemModel.js`

```javascript
const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});
```

Igual ao `CartItem`: o `id` + a `quantity`.

---

## As relações (`app.js`)

```javascript
const Order = require('./models/orderModel');
const OrderItem = require('./models/orderItemModel');

// ...

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
```

### Carrinho vs encomenda

| | Carrinho | Encomenda |
|---|---|---|
| Utilizador ↔ ... | **Um para um**: `User.hasOne(Cart)` | **Um para muitos**: `User.hasMany(Order)` |
| ... ↔ Produtos | Muitos para muitos, através de `CartItem` | Muitos para muitos, através de `OrderItem` |

Um utilizador tem **um** carrinho de cada vez, mas faz **várias** encomendas ao longo do tempo.

> 💡 O inverso, `Product.belongsToMany(Order, ...)`, é **opcional**. O professor deixa-o de fora.

---

## As tabelas criadas

Com o **`force: true`** uma vez (e tirado logo a seguir):

| Tabela | Colunas importantes |
|---|---|
| `orders` | id, **userId** |
| `orderItems` | id, quantity, **orderId**, **productId** |

---

## 🏢 No meu exemplo de empresa

É o mesmo padrão de uma **requisição de material**:
- **`requisicoes`** → `colaboradorId` (um colaborador faz **várias** requisições).
- **`requisicaoItens`** → `requisicaoId` + `equipamentoId` + `quantidade` (a tabela do meio).

---

## ✅ A reter

- **Encomenda** = um "cabeçalho" (`orders`) + **linhas** (`orderItems`). É o padrão de qualquer documento com linhas: faturas, requisições, talões.
- **`hasOne`** (um carrinho) vs **`hasMany`** (várias encomendas): escolhe-se pela **regra do negócio**.
- A tabela de linhas é sempre uma **tabela do meio**, com dados extra (a `quantity`).