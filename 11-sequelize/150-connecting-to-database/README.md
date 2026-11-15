# 150. Connecting to the Database

**Secção 11 — Understanding Sequelize**

> **Em resumo:** instala-se o **Sequelize**, **apaga-se** a tabela `products` antiga (o Sequelize vai criá-la sozinho) e o **`util/database.js`** passa a criar uma ligação com **`new Sequelize(...)`**, em vez da pool do `mysql2`.

---

## Passo 1 — Instalar o Sequelize

```bash
npm install --save sequelize
```

> ⚠️ O **`mysql2`** (aula 139) tem de **continuar instalado**. O Sequelize **usa-o por trás** para falar com o MySQL. Se não o tiveres: `npm install --save mysql2`.

---

## Passo 2 — Apagar a tabela antiga

A tabela `products` da secção 10 foi criada **à mão**. Agora vai ser o **Sequelize** a criá-la, a partir do **model** (aulas seguintes). Por isso, apaga-se a antiga.

No vídeo: Workbench → `node-complete` → `products` → clique direito → **Drop Table** → **Drop Now**.

Com SQL (a minha forma):

```bash
/usr/local/mysql/bin/mysql -u root -p node-complete
```

```sql
DROP TABLE products;
exit
```

> ⚠️ O **`DROP TABLE`** apaga a tabela **e todos os dados** dela. Não há volta atrás.

---

## Passo 3 — A ligação: `util/database.js`

```javascript
process.loadEnvFile();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
```

### O que recebe o `new Sequelize(...)`

| Posição | O que é | Valor |
|---|---|---|
| 1.º | A **base de dados** | `'node-complete'` |
| 2.º | O **utilizador** | `'root'` |
| 3.º | A **password** | `process.env.DB_PASSWORD` (do `.env`, aula 139) |
| 4.º | As **opções** | `{ dialect: 'mysql', host: 'localhost' }` |

| Opção | Quer dizer |
|---|---|
| **`dialect: 'mysql'`** | **Que base de dados** é. Cada uma fala um SQL ligeiramente diferente, e o Sequelize adapta-se. No SQL Server seria **`'mssql'`** |
| `host: 'localhost'` | **Onde** está. Já é o valor por defeito, mas fica explícito |

> 💡 O **`Sequelize`** tem **maiúscula** porque é uma **classe** (uma fôrma, aula 99). O **`sequelize`**, em minúscula, é a **ligação** criada com ela.

> 💡 O Sequelize **cria a pool de ligações sozinho**, como a da aula 139. Por isso, o `mysql.createPool` e o `pool.promise()` **saem**.

---

## Erros que tive ao adaptar

| Erro | Correção |
|---|---|
| `require('sequilize')` | O nome é **`sequelize`**, com "e" |
| `root` sem aspas | É **texto**: `'root'`. Sem aspas, o JS procura uma variável que não existe |
| Faltava a password e as opções | O 3.º e o 4.º argumentos |

---

## ✅ A reter

- **`npm install --save sequelize`**, e o **`mysql2`** continua instalado.
- **`new Sequelize(baseDeDados, utilizador, password, { dialect, host })`**.
- **`module.exports = sequelize`**: a ligação, gerida pelo Sequelize.
- A tabela `products` antiga apaga-se: o Sequelize vai criá-la a partir do model.