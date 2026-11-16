# 229. Module Introduction

**Secção 14 — Sessions & Cookies**

> **Em resumo:** chega de bases de dados por agora. Esta secção é sobre **guardar dados de outra forma**: no **browser** (os **cookies**) e na **memória do servidor** (as **sessões**). São duas peças essenciais do desenvolvimento web, e normalmente usam-se **juntas**. É com elas que uma app **sabe quem está ligado**, ou seja, o **login**.

---

## O que vem nesta secção

1. O que é um **cookie**, e como se usa.
2. O que é uma **sessão**, e como se usa.
3. Como se usam **os dois juntos**.

---

## A ideia, antes de começar

| | Onde fica guardado | Exemplo |
|---|---|---|
| **Cookie** | No **browser** do utilizador | *"Este browser tem o número de sessão 123"* |
| **Sessão** | No **servidor** | *"A sessão 123 é do Luís, e fez login"* |

> 🎟️ **Analogia:** no bengaleiro, ficas com uma **senha** (o cookie) e o casaco fica **lá dentro** (a sessão). Para levantares o casaco, mostras a senha.

---

## Porque é que isto é preciso

Até agora, o utilizador era **sempre o mesmo**: o utilizador de teste, ido buscar com `findByPk(1)` (aula 162). Numa app a sério, cada pessoa faz **login**, e o servidor tem de se **lembrar** de quem é, de pedido em pedido. É isso que os cookies e as sessões resolvem.

> 💡 Na secção 11, a base de dados era **MySQL** (com o Sequelize). A partir daqui, o código do professor usa **MongoDB**. As ideias de cookies e sessões são **iguais**, seja qual for a base de dados.

---

## ✅ A reter

- **Cookie** → guardado no **browser**.
- **Sessão** → guardada no **servidor**.
- Juntos, servem para a app **saber quem está ligado** (o login).