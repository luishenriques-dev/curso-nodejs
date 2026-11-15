# 149. What is Sequelize?

**Secção 11 — Understanding Sequelize**

> **Em resumo:** o **Sequelize** é um **ORM** (*Object-Relational Mapping*): **liga objetos JavaScript a tabelas SQL**. Escreves JavaScript, e ele escreve e corre o SQL por ti. Também **cria as tabelas** e as **relações** sozinho.

---

## O que é um ORM

**O**bject-**R**elational **M**apping = **ligar** (*mapping*) **objetos** (do JavaScript) a uma base de dados **relacional** (SQL).

```
Objeto JS                       Tabela SQL "users"
{                               ┌────┬──────┬─────┬───────────────┐
  name: 'Max',         ⟷        │ id │ name │ age │ email         │
  age: 28,                      ├────┼──────┼─────┼───────────────┤
  email: 'max@test.com'         │ 1  │ Max  │ 28  │ max@test.com  │
}                               └────┴──────┴─────┴───────────────┘
```

> 🗣️ **Analogia:** o Sequelize é um **tradutor**. Tu falas **JavaScript**, ele fala **SQL** com o MySQL, e traz-te a resposta já em **objetos JS**.

---

## SQL à mão vs Sequelize

| O que queres | SQL à mão (secção 10) | Sequelize |
|---|---|---|
| Criar um utilizador | `db.execute('INSERT INTO users (name, age) VALUES (?, ?)', ['Max', 28])` | `User.create({ name: 'Max', age: 28 })` |
| Ir buscar todos | `db.execute('SELECT * FROM users')` | `User.findAll()` |

Por trás, o Sequelize corre **o mesmo SQL**. Só que **não tens de o escrever**.

---

## As 4 coisas que o Sequelize dá

| Conceito | O que é |
|---|---|
| **Models** | Definir **como são os dados**: por exemplo, um `User` tem `name`, `age` e `email`. É o equivalente à **tabela** |
| **Instâncias** | Criar **um** registo a partir do model: um utilizador concreto (como o `new Product(...)` da secção 7) |
| **Queries** | **Métodos** para guardar, encontrar, editar e apagar: `create`, `findAll`, `findByPk`… |
| **Associações** | **Ligar models** entre si: um `User` tem vários `Product`. São as **relações** da aula 135 |

> 💡 O Sequelize também **cria as tabelas** a partir dos models. Acabou-se o `CREATE TABLE` à mão.

---

## ✅ A reter

- **Sequelize** = **ORM** = objetos JS ⟷ tabelas SQL.
- Escreves **métodos JS**, e o Sequelize corre o **SQL**.
- **Models** (como são os dados), **instâncias** (um registo), **queries** (métodos) e **associações** (relações).
- Funciona com **MySQL** e **SQL Server**.