# 160. Creating a User Model

**Secção 11 — Understanding Sequelize**

> **Em resumo:** cria-se um segundo model, o **`User`** (utilizador), com `id`, `name` e `email`. Ainda **não há login**: vai-se usar um utilizador **de teste**. O objetivo é preparar as **relações**: *"este produto foi criado por este utilizador"* e *"este utilizador tem um carrinho"*.

---

## O código desta aula

### `models/userModel.js` (novo)

```javascript
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = User;
```

É **o mesmo molde** do model dos produtos (aula 151):

| Parte | Igual ao `Product`? |
|---|---|
| Os dois `require` (`Sequelize` e `sequelize`) | ✅ |
| O `id` (inteiro, auto increment, obrigatório, chave primária) | ✅ |
| `sequelize.define('nome', { campos })` | ✅ O nome é `'user'`, e a tabela vai chamar-se **`users`** |
| `module.exports` | ✅ |
| Os campos | `name` e `email`, na **forma curta** (só o tipo) |

> 💡 O professor desafia a **fazer sozinho** antes de ver a solução, porque é a mesma estrutura do `Product`.

---

## ⚠️ A tabela `users` ainda não aparece

O **`sequelize.sync()`** (aula 152) só cria tabelas para os models que **foram carregados**, ou seja, cujo ficheiro foi **`require`d** em algum lado. Nesta aula, o `userModel.js` ainda **não é usado** em lado nenhum, por isso o `sync` **não sabe que existe**.

A tabela aparece **na próxima aula**, quando o model é usado no `app.js` para criar as **relações**.

---

## Para que serve: as relações

O plano do professor:

```
User ──(criou)──► vários Products
User ──(tem)────► um Cart ──(com)──► vários Products
```

> 🏢 **No meu exemplo de empresa:** seria como criar o model **`Colaborador`**, para depois dizer *"este equipamento está atribuído a este colaborador"*.

---

## ✅ A reter

- Um model novo = **o mesmo molde**: `sequelize.define('nome', { campos })` + `module.exports`.
- **`User`** com `id`, `name` e `email`.
- O `sync` só cria a tabela de models que foram **`require`d** em algum lado.
- Próxima aula: a primeira **associação** (relação) entre `User` e `Product`.