# 161. Adding a One-To-Many Relationship

**Secção 11 — Understanding Sequelize**

> **Em resumo:** a primeira **associação** (relação): **um utilizador criou vários produtos**. No `app.js`, com **`Product.belongsTo(User)`** e **`User.hasMany(Product)`**, o Sequelize junta à tabela `products` uma coluna **`userId`**, a **chave estrangeira**. É o mesmo que um **`FOREIGN KEY`** escrito em SQL.

---

## Ideia 1 — O que é uma associação

**Associação** é o nome que o Sequelize dá às **relações entre tabelas**. O professor começa por desenhar **quem se liga a quem** na loja:

```
User ──── criou vários ────► Products
User ──── tem um ──────────► Cart ──── tem vários ───► Products
User ──── fez várias ──────► Orders
```

Nesta aula faz-se **só a primeira**: *"um utilizador **criou** vários produtos"*. **Criou**, e não **comprou**: é o dono da loja, que pôs o produto à venda.

> 🏢 **No meu exemplo de empresa:** *"um colaborador tem vários equipamentos"*.

---

## Ideia 2 — O código: `belongsTo` e `hasMany`

### `app.js` (antes do `sequelize.sync`)

```javascript
const Product = require('./models/productModel');
const User = require('./models/userModel');

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
```

| Código | Lê-se… | No meu exemplo |
|---|---|---|
| `Product.belongsTo(User)` | *"o produto **pertence** a um utilizador"* | *"o equipamento pertence a um colaborador"* |
| `User.hasMany(Product)` | *"o utilizador **tem vários** produtos"* | *"o colaborador tem vários equipamentos"* |

São **duas frases** a dizer **a mesma relação**, uma de cada lado. O professor diz que uma chega, mas prefere escrever as duas, para ficar claro.

### O que acontece na base de dados

O Sequelize **junta sozinho** uma coluna nova à tabela `products`: a **`userId`**.

| id | title | price | **userId** |
|---|---|---|---|
| 1 | A Book | 12.99 | **1** |
| 2 | A Pen | 1.50 | **1** |

O **`userId`** diz **quem criou** cada produto: aponta para o `id` certo na tabela `users`. Chama-se **chave estrangeira** (*foreign key*).

> 💡 Assim, os dados do utilizador ficam **num só sítio** (a tabela `users`), e os produtos só guardam o **número** dele.

---

## Ideia 3 — E se se apagar um utilizador? (`onDelete`)

```javascript
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
```

Se apagares o utilizador 1, os produtos dele ficavam com um `userId: 1` a apontar para **ninguém**. O `onDelete` diz o que fazer:

| Opção | Se apagares o utilizador… |
|---|---|
| **`CASCADE`** | Os produtos dele **também são apagados** (efeito cascata) |
| `SET NULL` | Os produtos **ficam**, mas com o `userId` **vazio** |

> 🏢 **No meu exemplo, seria diferente:** se um colaborador sair da empresa, os portáteis dele **não devem desaparecer** da base de dados! Aí, o certo seria o **`SET NULL`**: o equipamento fica, sem ninguém atribuído. **A opção depende da regra do negócio.**

> 💡 O professor diz que é opcional, e que para dominar estas opções é preciso estudar um pouco mais de SQL.

---

## Ideia 4 — O `force: true`

```javascript
sequelize
  .sync({ force: true })
  .then(...)
```

**O problema:** a tabela `products` **já existia** (aula 152), e o `sync()` normal **não mexe** em tabelas que já existem. A coluna `userId` **nunca seria criada**.

O **`force: true`** **apaga as tabelas todas e cria-as de novo**, já com a estrutura nova:

```
DROP TABLE products, users    →    CREATE TABLE users    →    CREATE TABLE products (com o userId)
```

> ⚠️ **Apaga os dados.** Os produtos que tinhas **desaparecem**. Por isso:
> - usa-se **só durante o desenvolvimento**, quando muda a estrutura;
> - **nunca** numa app a sério;
> - depois de as tabelas estarem certas, **tira-se o `force: true`**. Senão, **a cada arranque** do servidor, perdes tudo.

---

## 🔍 É o mesmo que fazer em SQL "à mão"?

**Sim.** O Sequelize gera exatamente este SQL (aparece no terminal):

```sql
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  price DOUBLE NOT NULL,
  -- ...
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

| Sequelize | SQL "à mão" |
|---|---|
| `Product.belongsTo(User)` | A coluna **`userId`** + **`FOREIGN KEY (userId) REFERENCES users(id)`** |
| `onDelete: 'CASCADE'` | **`ON DELETE CASCADE`** |
| `sequelize.sync()` | Os **`CREATE TABLE`** |

### Juntar uma coluna sem perder dados: `ALTER TABLE`

Em SQL à mão, para juntar a relação a uma tabela que **já existe**, **não é preciso apagá-la**:

```sql
ALTER TABLE products ADD COLUMN userId INT;
ALTER TABLE products ADD FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE;
```

O **`force: true`** é o **atalho para aprender**. Em projetos a sério com o Sequelize, usam-se as **migrações** (*migrations*): ficheiros que fazem estes `ALTER TABLE` passo a passo, **sem perder dados**. O curso não as ensina, mas é provável encontrá-las num trabalho.

---

## Testar

1. Depois do `npm start` com o `force: true`, no terminal aparecem os **`DROP TABLE`** e os **`CREATE TABLE`**, com o **`FOREIGN KEY`**.
2. Na base de dados há **duas tabelas**: `users` (vazia) e `products` (vazia, mas com a coluna **`userId`**).
3. Os produtos antigos **desapareceram**. É o efeito do `force: true`.

---

## ✅ A reter

- **Associação** = **relação** entre tabelas.
- **`belongsTo`** ("pertence a") + **`hasMany`** ("tem vários") → relação **um para muitos**.
- O Sequelize cria a **chave estrangeira** **`userId`** sozinho.
- **`onDelete: 'CASCADE'`** → apagar o "pai" apaga os "filhos". **`SET NULL`** → os filhos ficam sem dono. **Depende da regra do negócio.**
- **`force: true`** → recria as tabelas, mas **apaga os dados**. Só em desenvolvimento.
- É o mesmo que **`FOREIGN KEY ... REFERENCES ...`** em SQL.