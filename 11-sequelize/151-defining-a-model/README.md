# 151. Defining a Model

**Secção 11 — Understanding Sequelize**

> **Em resumo:** o model dos produtos é **reescrito do zero** com o Sequelize. Já não é uma `class`: é um **`sequelize.define('product', {...})`**, onde se diz **que campos** tem um produto e **de que tipo** é cada um. É o **`CREATE TABLE`** da aula 140, mas em JavaScript.

---

## O código desta aula

### `models/productModel.js` (tudo novo)

```javascript
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
```

---

## Os dois `require`: com e sem maiúscula

| Variável | Vem de | O que é | Para quê |
|---|---|---|---|
| **`Sequelize`** (maiúscula) | `require('sequelize')` | A **biblioteca** | Para os **tipos**: `Sequelize.INTEGER`, `Sequelize.STRING`… |
| **`sequelize`** (minúscula) | `require('../util/database')` | A **ligação** à base de dados (aula 150) | Para **definir** o model: `sequelize.define(...)` |

---

## `sequelize.define(nome, campos)`

| Argumento | O que é |
|---|---|
| `'product'` | O **nome do model**, em minúsculas. O Sequelize usa-o para dar nome à tabela: **`products`**, no plural |
| `{ ... }` | Os **campos**: cada um é uma **coluna** da tabela |

Cada campo pode ser definido de **duas formas**:

```javascript
title: Sequelize.STRING,          // curta: só o tipo

price: {                          // completa: tipo + opções
  type: Sequelize.DOUBLE,
  allowNull: false
}
```

---

## Do SQL (aula 140) para o Sequelize

| SQL (aula 140) | Sequelize |
|---|---|
| `INT` | `Sequelize.INTEGER` |
| `VARCHAR(255)` | `Sequelize.STRING` |
| `DOUBLE` | `Sequelize.DOUBLE` |
| `TEXT` | `Sequelize.TEXT` |
| `NOT NULL` (NN) | `allowNull: false` |
| `AUTO_INCREMENT` (AI) | `autoIncrement: true` |
| `PRIMARY KEY` (PK) | `primaryKey: true` |

```sql
-- é isto que o model descreve (aula 140):
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
```

```javascript
// em Sequelize:
id: {
  type: Sequelize.INTEGER,
  autoIncrement: true,
  allowNull: false,
  primaryKey: true
}
```

> 💡 O professor usa `STRING` na `description`. Na aula 140 tinha-se usado `TEXT`, que é melhor para textos compridos. Para uma app a sério, seria **`Sequelize.TEXT`**.

> 💡 O `title` ficou só com o tipo, **sem `allowNull: false`**, para mostrar a forma curta. Por isso, pode ficar **vazio**.

---

## Onde saber mais

Todos os tipos e opções estão na **documentação oficial do Sequelize**: **sequelize.org** → *Model Basics* e *Data Types*.

---

## ✅ A reter

- **`Sequelize`** (biblioteca, tipos) vs **`sequelize`** (ligação, `define`).
- **`sequelize.define('product', { campos })`** → model = tabela `products`.
- Cada campo = **tipo** + opções (`allowNull`, `autoIncrement`, `primaryKey`).
- É o **`CREATE TABLE`** escrito em JavaScript.