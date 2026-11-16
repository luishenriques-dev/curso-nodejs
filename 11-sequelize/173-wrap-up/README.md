# 173. Wrap Up

**Secção 11 — Understanding Sequelize**

> **Em resumo:** fim da parte de **SQL** do curso. Com o pacote `mysql2` (secção 10), escreve-se o SQL à mão. Com o **Sequelize** (secção 11), trabalha-se com **models** e **associações**, e o SQL é escrito pelo Sequelize nos bastidores. Seguem-se as secções de **MongoDB** (NoSQL).

---

## `mysql2` vs Sequelize

| | `mysql2` (secção 10) | **Sequelize** (secção 11) |
|---|---|---|
| Consultas | SQL **à mão** (`SELECT`, `INSERT`…) | **Métodos** (`findAll`, `create`…) |
| Tabelas | Criadas **à mão** (Workbench) | Criadas pelo **`sync()`**, a partir dos models |
| Relações | `FOREIGN KEY` **à mão** | **Associações** (`belongsTo`, `hasMany`…) |
| Métodos "mágicos" | ❌ | ✅ (`createProduct`, `getCart`, `addProduct`…) |
| Bases de dados | Só MySQL | MySQL, **SQL Server** (`dialect: 'mssql'`), PostgreSQL… |

> 💡 O professor avisa que **SQL é quase uma linguagem à parte** do Node. Mesmo com o Sequelize, convém saber SQL, para perceber o que ele está a fazer e para quando é preciso escrever uma consulta à mão.

---

## Resumo da secção 11

### Ligação e model

```javascript
const sequelize = new Sequelize('node-complete', 'root', process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: 'localhost'
});

const Product = sequelize.define('product', { id: {...}, title: Sequelize.STRING, ... });
```

### CRUD

| | Sequelize | SQL |
|---|---|---|
| **C** | `Product.create({...})` | `INSERT INTO` |
| **R** | `Product.findAll()` / `findAll({ where })` | `SELECT * [WHERE]` |
| **R** | `Product.findByPk(id)` | `SELECT ... WHERE id = ?` |
| **U** | `findByPk` → mudar → `product.save()` | `UPDATE` |
| **D** | `findByPk` → `product.destroy()` | `DELETE` |

### Associações

| Relação | Sequelize | Em SQL |
|---|---|---|
| **Um para um** (utilizador ↔ carrinho) | `User.hasOne(Cart)` + `Cart.belongsTo(User)` | `userId` em `carts` |
| **Um para muitos** (utilizador ↔ produtos, encomendas) | `User.hasMany(Product)` + `Product.belongsTo(User)` | `userId` em `products` |
| **Muitos para muitos** (carrinho ↔ produtos) | `belongsToMany(..., { through: CartItem })` | **Tabela do meio** `cartItems` |

### Métodos "mágicos"

| Vindos de… | Métodos |
|---|---|
| `hasOne` | `getCart()`, `createCart()` |
| `hasMany` | `getProducts()`, `createProduct()`, `getOrders()`, `createOrder()` |
| `belongsToMany` | `getProducts()`, `addProduct()`, `addProducts()`, `setProducts()` |

### Outras coisas importantes

- **`sync()`** cria as tabelas. **`sync({ force: true })`** apaga-as e recria-as: **só em desenvolvimento**, e tira-se logo.
- O **`req.user`** (um objeto Sequelize) fica disponível em toda a app graças a um **middleware**.
- **`include: [...]`** (eager loading) traz as coisas associadas **na mesma consulta** (= `JOIN`).
- **`findAll`** / **`getProducts`** devolvem **sempre um array** → `[0]` para ter um só.
- O **`redirect`** vai **sempre dentro do `.then`**.

---

## E agora?

- **Secções 12–13 (MongoDB / Mongoose):** ⏭️ saltadas, porque o meu foco é SQL (MySQL / SQL Server).
- **Secção 14 (Sessions & Cookies):** importante. Começa a partir do código do professor, com MongoDB.

> 🏢 **Para depois do curso** (ver `IDEIAS.md`): o projeto de gestão de equipamentos (departamento → colaborador → equipamento) com **SQL Server** e Sequelize, usando estas relações todas.