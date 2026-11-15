# 135. Choosing a Database

**Secção 10 — SQL Introduction**

> **Em resumo:** uma base de dados **SQL** guarda os dados em **tabelas**, como folhas de Excel. Cada tabela tem um **esquema** fixo (que colunas tem e de que tipo), as tabelas **ligam-se entre si** (relações), e fala-se com a base de dados através de **queries** na linguagem **SQL**.

---

## Porquê uma base de dados?

- É **mais rápida** que um ficheiro, sobretudo com muitos dados.
- **Não precisa de ler tudo** para encontrar uma coisa (o ficheiro precisava: aula 119).

| Tipo | Exemplo |
|---|---|
| **SQL** | **MySQL** ← esta secção |
| **NoSQL** | **MongoDB** ← próxima aula |

---

## Como é uma base de dados SQL

Imagina um **livro de Excel**: cada **folha** é uma **tabela**.

**Tabela `products`:**

| id | title | price | description |
|---|---|---|---|
| 1 | Book | 12.99 | A great book |
| 2 | Pen | 1.50 | A blue pen |

| Termo | O que é | No exemplo |
|---|---|---|
| **Tabela** | Uma "folha" com dados do mesmo tipo | `products`, `users`, `orders` |
| **Campo / coluna** | O **nome** de um dado | `id`, `title`, `price`… |
| **Registo / linha** | **Uma** entrada, com os seus dados | O "Book" é uma linha |

---

## As 3 características da SQL

### 1. Esquema forte (*schema*)

Cada tabela define **exatamente** que colunas tem, e **de que tipo** é cada uma:

| Coluna | Tipo |
|---|---|
| `id` | número |
| `title` | texto |
| `price` | número decimal |

**Todos** os registos têm de seguir este esquema. Não podes pôr um texto na coluna `price`, nem juntar uma coluna que não exista.

> 💡 É ao contrário do `products.json`, onde cada produto podia ter os campos que quisesse. Lembra-te dos produtos antigos **sem `id`** (aula 117): numa base SQL, isso não acontecia.

### 2. Relações entre tabelas

As tabelas **ligam-se**. Exemplo: uma **encomenda** liga **um utilizador** a **produtos**.

| Relação | Quer dizer | Exemplo |
|---|---|---|
| **Um para um** (1:1) | Um registo ↔ um registo | Um utilizador ↔ o seu perfil |
| **Um para muitos** (1:N) | Um registo ↔ vários | Um utilizador ↔ várias encomendas |
| **Muitos para muitos** (N:N) | Vários ↔ vários | Encomendas ↔ produtos: uma encomenda tem vários produtos, e um produto está em várias encomendas |

### 3. Queries

**SQL** = *Structured Query Language* (linguagem de consulta estruturada). Uma **query** é um **comando** para a base de dados:

```sql
SELECT * FROM users WHERE age > 28
```

| Parte | Quer dizer |
|---|---|
| `SELECT *` | "Dá-me **todas** as colunas" |
| `FROM users` | "da tabela **users**" |
| `WHERE age > 28` | "**só** os registos com idade maior que 28" |

As palavras em **maiúsculas** são **palavras-chave** do SQL. O resto são os **teus** dados: nomes de tabelas, colunas e valores.

---

## ✅ A reter

- **SQL** → dados em **tabelas** (colunas + linhas), como folhas de Excel.
- **Esquema forte**: cada coluna tem um **tipo**, e todos os registos o seguem.
- **Relações**: 1:1, 1:N, N:N.
- **Queries**: comandos em SQL, como `SELECT * FROM users WHERE age > 28`.