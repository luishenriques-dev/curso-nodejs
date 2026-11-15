# 141. Retrieving Data

**Secção 10 — SQL Introduction**

> **Em resumo:** o `db.execute(...)` devolve uma ***promise***. Com o **`.then(result => ...)`** recebe-se o resultado, que é um **array com dois arrays lá dentro**: o **primeiro** são as **linhas** (os produtos), e o **segundo** são **metadados** sobre a tabela.

---

## O código

### `app.js`

```javascript
const db = require('./util/database');

db.execute('SELECT * FROM products')
  .then(result => {
    console.log(result[0]);   // as linhas: os produtos
    console.log(result[1]);   // os metadados: informação sobre as colunas
  })
  .catch(err => {
    console.log(err);
  });
```

---

## `.then` e `.catch`

| Parte | Corre quando… | Recebe |
|---|---|---|
| **`.then(result => ...)`** | A query **correu bem** | O **resultado** |
| **`.catch(err => ...)`** | Houve um **erro**: falhou a ligação, a tabela não existe… | O **erro** |

> 🎫 A senha do take-away: o **`.then`** é "a comida está pronta", e o **`.catch`** é "houve um problema com o pedido".

As *promises* existem no **JavaScript em geral**, e não só no Node: o browser também as usa.

### Porque é que se escreve em várias linhas?

```javascript
db.execute('...').then(result => {...}).catch(err => {...});

// é o mesmo que:
db.execute('...')
  .then(result => {...})
  .catch(err => {...});
```

Assim lê-se **como uma lista de passos**, e não fica tudo **aninhado**, como acontecia com os callbacks.

---

## O que vem no `result`

```javascript
[
  [ { id: 1, title: 'A Book', price: 12.99, description: '...', imageUrl: '...' } ],  // result[0]
  [ /* informação sobre as colunas: nomes, tipos... */ ]                                // result[1]
]
```

| | O que é | Para quê |
|---|---|---|
| **`result[0]`** | As **linhas**: cada produto é um **objeto JS** | **É isto que interessa** |
| `result[1]` | Os **metadados**: nomes e tipos das colunas | Quase nunca se usa |

Cada linha é um objeto normal, igual às "fichas" do `products.json`. É fácil de usar no EJS: `product.title`, `product.price`…

---

## A seguir

Até aqui foi um **teste** no `app.js`. Nas próximas aulas, o **model** (`productModel.js`) passa a usar a base de dados **em vez do ficheiro** `products.json`.

---

## ✅ A reter

- **`db.execute(...)`** devolve uma *promise* → **`.then`** (correu bem) e **`.catch`** (erro).
- **`result[0]`** = as **linhas** (os dados). **`result[1]`** = metadados.
- Cada linha = um **objeto JS** com as colunas como propriedades.