# 148. Module Introduction

**Secção 11 — Understanding Sequelize**

> **Em resumo:** nesta secção continua-se a usar o **MySQL**, mas o código muda: em vez de escrever **SQL à mão**, usa-se o **Sequelize**, um pacote que deixa trabalhar com **objetos e métodos JavaScript** para criar, editar, apagar, encontrar e **relacionar** dados.

---

## O que muda e o que fica

| | Secção 10 | Secção 11 |
|---|---|---|
| Base de dados | MySQL | **MySQL** (a mesma) |
| Como se fala com ela | **SQL à mão**: `db.execute('SELECT ...')` | **Sequelize**: `Product.findAll()` |
| Relações entre tabelas | Não chegaram a usar-se | **Sim**: produtos, utilizadores, carrinho, encomendas |

> 🗣️ O Sequelize é um **tradutor**: tu escreves JavaScript, ele escreve o SQL e fala com o MySQL.

---

## O que vem nesta secção

- O que é o **Sequelize** e como ligá-lo à base de dados.
- **Models** do Sequelize: as tabelas definidas em JavaScript.
- **Criar, ler, editar e apagar** produtos, ou seja, tudo o que ficou avariado na secção 10.
- **Utilizadores**, o **carrinho** e as **encomendas**.
- **Relações**: um para muitos, muitos para muitos (aula 135).

> 💡 O Sequelize funciona também com o **SQL Server**: o que se aprende aqui serve para os dois.

---

## ✅ A reter

- Mesma base de dados (**MySQL**), código diferente (**Sequelize**).
- Objetos e métodos JS **em vez de SQL à mão**.
- No fim da secção, a loja fica **completa**, com **relações** entre tabelas.