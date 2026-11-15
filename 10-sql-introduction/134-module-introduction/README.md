# 134. Module Introduction

**Secção 10 — SQL Introduction**

> **Em resumo:** até agora, os dados ficavam numa **variável** (aula 79) ou num **ficheiro** (aula 100). Nenhuma delas é boa para uma app a sério. Nesta secção entram as **bases de dados**: programas feitos para **guardar e ir buscar dados de forma eficiente**.

---

## Onde guardámos os dados até agora

| Onde | Problema |
|---|---|
| **Variável** (array em memória) | **Perde-se** quando o servidor reinicia, e é **partilhada** por todos os utilizadores |
| **Ficheiro** (`products.json`) | **Lento**, sobretudo quando há muitos dados. Lê-se e reescreve-se o ficheiro **todo** de cada vez |
| **Base de dados** ← agora | Um programa **feito para isto**: guarda e encontra dados **depressa**, mesmo com muitos |

---

## Os dois tipos de bases de dados

| Tipo | Exemplos | No curso |
|---|---|---|
| **SQL** | MySQL, PostgreSQL, SQL Server | **Esta secção** (MySQL) |
| **NoSQL** | MongoDB | Numa secção própria, mais à frente |

Nas próximas aulas, o professor explica **as diferenças** e **quando usar cada uma**.

---

## A analogia: do caderno ao arquivo 🗄️

| | Analogia |
|---|---|
| Variável | Lembrar **de cabeça**: rápido, mas esquece-se |
| Ficheiro | Um **caderno**: fica guardado, mas para encontrar uma coisa folheias **tudo** |
| Base de dados | Um **arquivo organizado**, com gavetas e etiquetas: encontras o que queres **logo** |

---

## ✅ A reter

- Variável e ficheiro **não servem** para uma app real.
- **Base de dados** = programa para guardar e encontrar dados **de forma eficiente**.
- Dois tipos: **SQL** (esta secção) e **NoSQL** (mais à frente).