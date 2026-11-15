# 139. Connecting our App to the SQL Database

**Secção 10 — SQL Introduction**

> **Em resumo:** instala-se o pacote **`mysql2`**, que deixa o Node falar com o MySQL. Cria-se um ficheiro **`util/database.js`** com uma **pool de ligações** à base de dados `node-complete`, e exporta-se com **`.promise()`**, para usar *promises* em vez de callbacks.

---

## Passo 1 — Instalar o `mysql2`

```bash
npm install --save mysql2
```

`--save` porque faz parte da app a correr (aula 43). O **`mysql2`** deixa o Node **enviar comandos SQL** ao MySQL.

---

## Passo 2 — A ligação: `util/database.js`

```javascript
process.loadEnvFile();

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: process.env.DB_PASSWORD
});

module.exports = pool.promise();
```

| Parte | O que é |
|---|---|
| `host: 'localhost'` | **Onde** está o MySQL: neste computador |
| `user: 'root'` | O utilizador |
| `database: 'node-complete'` | **Qual** base de dados (o servidor pode ter várias) |
| `password` | A password do `root`, que vem do ficheiro `.env` (ver em baixo) |
| `pool.promise()` | Exporta a pool pronta a usar ***promises*** |

### Ligação simples vs. pool

| | `createConnection` | **`createPool`** ✅ |
|---|---|---|
| Como funciona | **Uma** ligação | Um **conjunto** de ligações prontas a usar |
| Problema | Seria preciso criar uma ligação **nova** para cada query: **lento** | Cada query **pega numa** ligação livre e **devolve-a** quando acaba |
| Várias queries ao mesmo tempo | ❌ | ✅ |

> 🚕 **Analogia:** em vez de comprares um carro **cada vez** que precisas de ir a algum lado, tens uma **praça de táxis**. Pegas num, fazes a viagem e ele volta à praça para o próximo.

### Porquê `.promise()`?

As queries **demoram**, como ler um ficheiro (aula 101). Em vez de **callbacks dentro de callbacks** (aula 129), as ***promises*** deixam escrever o código **em sequência**, mais arrumado. Isto aparece nas próximas aulas.

---

## 🔐 A password fora do código (a minha adaptação)

No vídeo, o professor escreve a password **diretamente** no `database.js`. O meu repositório é **público**, por isso a password fica num ficheiro **`.env`**, que **não vai para o GitHub**.

### 1. O ficheiro `.env`, na pasta da aula (ao lado do `app.js`)

```
DB_PASSWORD=a_minha_password
```

Sem aspas e sem espaços à volta do `=`.

### 2. O `.gitignore`, na raiz do repositório

Junta uma linha:

```
.env
```

Assim, **nenhum** `.env`, em nenhuma pasta, vai para o GitHub.

### 3. No código

| Linha | O que faz |
|---|---|
| `process.loadEnvFile();` | Lê o ficheiro `.env`. Já vem com o Node (versão 20.12 ou mais recente), **sem instalar nada** |
| `process.env.DB_PASSWORD` | O valor de `DB_PASSWORD` que estava no `.env` |

> ⚠️ Ao copiar a pasta para a aula seguinte (`cp -R pasta/. nova/`), o `.env` **vai junto**. Se o `npm start` der erro a dizer que **não encontra o `.env`**, confirma que o ficheiro está na pasta.

> 💡 Guardar segredos em **variáveis de ambiente** (`.env`) é como se faz nas apps a sério. O curso volta a isto na parte de *deployment*.

---

## Passo 3 — Usar no `app.js`

```javascript
const db = require('./util/database');

db.execute('SELECT * FROM products')
  .then(result => console.log(result))
  .catch(err => console.log(err));
```

| Método | Para quê |
|---|---|
| **`execute`** | Corre uma query SQL. É **mais seguro** que o `query` |
| `query` | Também corre queries |
| `end` | Fecha a pool, quando a app desliga. Aqui não é preciso |

> ⚠️ A tabela **`products` ainda não existe**: cria-se na próxima aula. Por isso, este código **vai mostrar um erro** no terminal (*"Table ... doesn't exist"*). É normal.
> ⚠️ No vídeo, o professor escreve só `db.execute(...)`, sem o `.catch`. Nas versões atuais do Node, um erro numa *promise* **sem `.catch` desliga o servidor**. Por isso, junta sempre o **`.catch(...)`**.

---

## A seguir

Criar a tabela **`products`** no Workbench (Schemas → `node-complete` → Tables → Create Table), com as suas colunas: é o **esquema** da aula 135.

---

## ✅ A reter

- **`npm install --save mysql2`**.
- **`util/database.js`** → **`createPool`** com host, user, database e password → **`module.exports = pool.promise()`**.
- **Pool** = várias ligações reutilizáveis (a praça de táxis).
- **`db.execute('SQL')`** → corre uma query. Junta sempre o **`.catch`**.
- **Password no `.env`** + `.env` no `.gitignore` → fora do GitHub.