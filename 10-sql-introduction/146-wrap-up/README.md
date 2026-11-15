# 146. Wrap Up

**Secção 10 — SQL Introduction**

> **Em resumo:** dava para fazer **a app toda** escrevendo SQL à mão, mas as queries ficam **cada vez mais complicadas**, sobretudo quando é preciso **ligar tabelas**. Na próxima secção entra o **Sequelize**, que deixa trabalhar com **objetos JavaScript**, sem escrever SQL.

---

## O que se fez nesta secção

| Aula | O que aprendi |
|---|---|
| 134–137 | O que é uma base de dados, **SQL vs NoSQL**, escalar na vertical e na horizontal |
| 138 | Instalar o **MySQL** e o **Workbench**, e criar a base de dados `node-complete` |
| 139 | Ligar a app ao MySQL: **`mysql2`**, **pool** de ligações, password no **`.env`** |
| 140 | Criar a tabela **`products`**: **tipos** (`INT`, `VARCHAR`, `DOUBLE`, `TEXT`) e **opções** (PK, NN, AI) |
| 141 | Ler o resultado: **`.then` / `.catch`**, e o **`result[0]`** com as linhas |
| 142–143 | **`fetchAll`** com **`SELECT`**, e a desestruturação **`[rows, fieldData]`** |
| 144 | **`save`** com **`INSERT INTO`**, e os **`?`** contra a **injeção de SQL** |
| 145 | **`findById`** com **`WHERE`**, e o **`[0]`** para tirar o produto do array |

---

## O SQL que aprendi

| Comando | Para quê | Exemplo |
|---|---|---|
| `CREATE TABLE` | Criar uma tabela | `CREATE TABLE products (...)` |
| `SELECT` | **Ler** | `SELECT * FROM products` |
| `WHERE` | **Filtrar** as linhas | `... WHERE id = ?` |
| `INSERT INTO` | **Juntar** uma linha | `INSERT INTO products (title, ...) VALUES (?, ...)` |

E ainda dois que não se usaram nesta secção:

| Comando | Para quê |
|---|---|
| `UPDATE ... SET ... WHERE` | **Editar** |
| `DELETE FROM ... WHERE` | **Apagar** |

---

## O que ficou a funcionar

| Funciona | Avariado (até à secção 11) |
|---|---|
| Ver todos os produtos | Editar produto |
| Ver um produto (detalhe) | Apagar produto |
| Adicionar produto | Carrinho |

---

## Porquê o Sequelize a seguir

| SQL à mão | Sequelize |
|---|---|
| Escreve-se o SQL como **texto** | Escrevem-se **métodos JavaScript** |
| Fica difícil com **relações** entre tabelas | Trata das relações por ti |
| Tens de te lembrar dos **`?`** | Protege sozinho contra a injeção de SQL |
| Crias as tabelas à mão | **Cria as tabelas** a partir do código |

> 💡 O professor diz que um **mestre de SQL** pode fazer tudo à mão. O Sequelize é **o caminho mais fácil** para o resto de nós. E funciona também com o **SQL Server**.

---

## 🧠 Testa-te

**1. Porque é que se usa uma pool, e não uma ligação só?**
> Para **reutilizar** ligações e fazer **várias queries ao mesmo tempo**, sem abrir uma ligação nova a cada pedido.

**2. O que tem o `result[0]` de um `db.execute`?**
> As **linhas** devolvidas: os dados.

**3. Porque é que se usam `?` nas queries?**
> Para evitar a **injeção de SQL**: os valores são tratados **só como dados**, e nunca como comandos.

**4. Um `SELECT ... WHERE id = 1` devolve um objeto ou um array?**
> Um **array**, mesmo com uma só linha. O produto é o **`[0]`**.

**5. Porque é que a password está no `.env`?**
> Para **não ir para o GitHub**: o `.env` está no `.gitignore`.

---

## ✅ A reter

- **SQL à mão** funciona, mas complica-se com apps grandes e relações.
- **`SELECT`**, **`WHERE`**, **`INSERT INTO`** (e `UPDATE` e `DELETE`, para mais tarde).
- **Sempre `?`** para os dados do utilizador.
- Próxima secção: **Sequelize**.