# 140. Basic SQL & Creating a Table

**Secção 10 — SQL Introduction**

> **Em resumo:** cria-se a tabela **`products`** na base de dados `node-complete`, com 5 colunas: `id`, `title`, `price`, `description` e `imageUrl`. Cada coluna tem um **tipo** e **opções**: é o **esquema** da aula 135. No fim, junta-se **um produto de teste**.

---

## As colunas

| Coluna | Tipo | Opções |
|---|---|---|
| `id` | `INT` | **PK**, **NN**, **UQ**, **UN**, **AI** |
| `title` | `VARCHAR(255)` | NN |
| `price` | `DOUBLE` | NN |
| `description` | `TEXT` | NN |
| `imageUrl` | `VARCHAR(255)` | NN |

### Os tipos

| Tipo | Guarda | Exemplo |
|---|---|---|
| **`INT`** | Números **inteiros** | `1`, `42` |
| **`VARCHAR(255)`** | Texto **curto**, até 255 caracteres. O que passar disso é **cortado** | Um título, um link |
| **`DOUBLE`** | Números **com casas decimais** | `12.99` |
| **`TEXT`** | Texto **comprido**, sem o limite do `VARCHAR` | Uma descrição |

### As opções (as siglas do Workbench)

| Sigla | Nome | Quer dizer |
|---|---|---|
| **PK** | Primary Key | É **o identificador** de cada registo, como o "número da ficha" |
| **NN** | Not Null | **Obrigatório**: não pode ficar vazio |
| **UQ** | Unique | Não pode haver **dois iguais** |
| **UN** | Unsigned | **Sem negativos**: começa em 0 |
| **AI** | Auto Increment | O MySQL **dá o número sozinho**: 1, 2, 3… |

> 💡 O **AI** substitui o **`Math.random()`** da aula 117: já não é preciso inventar IDs, e nunca se repetem.

---

## Criar a tabela

### Como no vídeo: com o editor visual do Workbench

Schemas → `node-complete` → **Tables** → clique direito → **Create Table** → nome `products` → juntar as colunas com as opções da tabela de cima → **Apply**.

Antes de aplicar, o Workbench mostra **o SQL que vai correr**. É o mesmo que a forma seguinte.

### Com SQL (a minha versão: o Workbench novo não tem o editor visual)

Entrar no MySQL, já na base de dados:

```bash
/usr/local/mysql/bin/mysql -u root -p node-complete
```

E criar a tabela:

```sql
CREATE TABLE products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price DOUBLE NOT NULL,
  description TEXT NOT NULL,
  imageUrl VARCHAR(255) NOT NULL
);
```

> 💡 A **`PRIMARY KEY`** já é única por natureza, por isso não é preciso escrever o `UNIQUE` à parte.

Para confirmar: **`DESCRIBE products;`** mostra as colunas.

---

## Juntar um produto de teste

No vídeo, o professor escreve os valores diretamente na tabela, no Workbench. Com SQL:

```sql
INSERT INTO products (title, price, description, imageUrl)
VALUES ('A Book', 12.99, 'This is an awesome book!', 'https://link-de-uma-imagem.jpg');
```

| Parte | Quer dizer |
|---|---|
| `INSERT INTO products` | "Junta à tabela `products`…" |
| `(title, price, ...)` | "…nestas colunas…" |
| `VALUES (...)` | "…estes valores", pela **mesma ordem** |

O **`id` não se escreve**: o **Auto Increment** dá-o sozinho (o primeiro é `1`).

> 💡 Os textos vão entre **aspas simples** `'...'`. Os números, **sem aspas**.

Para ver o que está na tabela:

```sql
SELECT * FROM products;
```

---

## E o código?

O `db.execute('SELECT * FROM products')` da aula 139 já não dá erro: agora a tabela existe e tem um produto. Na próxima aula vê-se **como ler** o resultado, com o `.then()` e o `.catch()` das *promises*.

---

## ✅ A reter

- **Tabela = esquema**: cada coluna tem **tipo** e **opções**.
- **`INT`**, **`VARCHAR(255)`**, **`DOUBLE`**, **`TEXT`**.
- **PK** = identificador. **NN** = obrigatório. **AI** = o MySQL numera sozinho.
- **`CREATE TABLE`** cria. **`INSERT INTO ... VALUES`** junta. **`SELECT * FROM`** lê.