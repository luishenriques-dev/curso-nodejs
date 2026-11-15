# 152. Syncing JS Definitions to the Database

**Secção 11 — Understanding Sequelize**

> **Em resumo:** com **`sequelize.sync()`** no `app.js`, o Sequelize olha para **todos os models** e **cria as tabelas** que ainda não existem. O servidor só arranca **depois** disso, dentro do `.then`. O Sequelize junta sozinho duas colunas: **`createdAt`** e **`updatedAt`**.

---

## O código desta aula

### `app.js` (no fim do ficheiro)

```javascript
const sequelize = require('./util/database');

// ... (o resto do app.js igual)

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000, () => {
      console.log('Pode abrir a app em http://localhost:3000');
    });
  })
  .catch(err => console.log(err));
```

> ⚠️ O **`app.listen`** passa para **dentro do `.then`**. Se ficar **também** o antigo, no fim do ficheiro, o servidor tenta arrancar **duas vezes**, e dá o erro **`EADDRINUSE`** ("a porta já está a ser usada"). Tem de haver **um só** `app.listen`.

---

## O que faz o `sync()`

```
sequelize.sync()
   ↓
"Que models existem?" → product
   ↓
CREATE TABLE IF NOT EXISTS products (...)
   ↓
.then → arranca o servidor
```

| Pormenor | Explicação |
|---|---|
| Como sabe que models existem? | Todos usam o **mesmo** `sequelize.define(...)` (aula 151), por isso o `sequelize` conhece-os todos |
| Nome da tabela | **`products`**: o nome do model (`product`) **no plural**, automaticamente |
| `IF NOT EXISTS` | Se a tabela **já existir**, **não** a apaga nem a substitui. Pode correr-se sempre que a app arranca |
| Porquê o `app.listen` no `.then`? | Para o servidor só aceitar pedidos **depois** de as tabelas estarem prontas |

> 💡 No terminal aparece o **SQL** que o Sequelize correu: `CREATE TABLE IF NOT EXISTS products (...)`. **Escreveu-o por ti.**

---

## As colunas extra: `createdAt` e `updatedAt`

Na base de dados, a tabela `products` tem **mais duas colunas** do que as definidas no model:

| Coluna | Guarda |
|---|---|
| **`createdAt`** | **Quando** o registo foi **criado** |
| **`updatedAt`** | **Quando** foi **alterado** pela última vez |

O Sequelize **preenche-as sozinho**. Dá para as desligar, mas o professor prefere mantê-las, e são úteis (por exemplo, *"ticket aberto há 3 dias"*).

> 💡 Para confirmar: `DESCRIBE products;` no MySQL, ou abrir a tabela no Workbench.

---

## ✅ A reter

- **`sequelize.sync()`** → cria as tabelas dos models que **ainda não existem**.
- O **`app.listen`** vai **dentro do `.then`**, e só **um**.
- Nome da tabela = nome do model **no plural** (`product` → `products`).
- **`createdAt`** e **`updatedAt`** → datas automáticas.