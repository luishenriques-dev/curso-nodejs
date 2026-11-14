# 65. Limiting Middleware Execution to POST Requests

**Secção 5 — Working with Express.js**

> **Em resumo:** o `app.use()` corre para **todos** os métodos HTTP. Para filtrar **também pelo método**, usa-se **`app.get()`** (só GET) ou **`app.post()`** (só POST).

---

## O código desta aula

Só muda uma palavra no middleware do `/product`:

```javascript
app.post('/product', (req, res, next) => {   // era app.use
  console.log(req.body);
  res.redirect('/');
});
```

---

## O problema

Com o `app.use('/product', ...)`, o middleware corria **também** se escrevesses `localhost:3000/product` no browser, que é um pedido **GET**. Mas só queremos tratar o **POST** do formulário: num GET não há dados nenhuns, e o `req.body` vem vazio.

---

## A solução: `app.get()` e `app.post()`

Funcionam **como o `app.use()`**: recebem um caminho e uma função com `(req, res, next)`. A diferença é que **também filtram pelo método**:

| Escreves | Corre para… | Exemplo |
|---|---|---|
| `app.use('/product', ...)` | **Todos** os métodos | GET e POST |
| `app.get('/product', ...)` | **Só GET** | Escrever o endereço no browser, clicar num link |
| `app.post('/product', ...)` | **Só POST** | Submeter um formulário |

### O que o professor mostra

| Fazes | Resultado com `app.post('/product')` |
|---|---|
| Escreves `localhost:3000/product` (GET) | O middleware do `/product` é **ignorado**. O pedido segue para o `/` e aparece **"Hello from Express!"** |
| Submetes o formulário em `/add-product` (POST) | O middleware do `/product` **corre**: mostra `{ title: 'Livro' }` e redireciona |

---

## A ligação à secção 3

É exatamente o que fazias na aula 33:

```javascript
// Secção 3 (Node puro)
if (url === '/message' && method === 'POST') { ... }

// Express
app.post('/message', (req, res, next) => { ... });
```

O `app.post()` verifica o **caminho e o método** de uma vez.

---

## Outros métodos

Também existem **`app.delete()`**, **`app.patch()`** e **`app.put()`**, para outros métodos HTTP. Não se podem usar a partir de um formulário HTML normal, que só envia GET e POST. Vêm mais à frente no curso, nas REST APIs.

---

## A analogia: o porteiro com duas regras 🚪

O `app.use('/product')` é um porteiro que só verifica **para onde** vais. O `app.post('/product')` verifica **para onde** vais **e como entras**: *"só deixo passar quem vem entregar algo (POST), não quem vem só espreitar (GET)"*.

---

## ✅ A reter

- **`app.use()`** → filtra só pelo **caminho**. Corre para **todos** os métodos.
- **`app.get()`** → caminho **e** método **GET**.
- **`app.post()`** → caminho **e** método **POST**.
- `app.post('/x', ...)` = o `if (url === '/x' && method === 'POST')` da secção 3.

---

## 🔗 Ligação ao Nexus

No Nexus, as rotas usam quase sempre **`get`**, **`post`**, **`put`** e **`delete`**, raramente o `use`:

```javascript
router.get('/tarefas', listarTarefas);          // ver tarefas
router.post('/tarefas', criarTarefa);           // criar uma tarefa
router.put('/tarefas/:id', atualizarTarefa);    // alterar uma tarefa
router.delete('/tarefas/:id', apagarTarefa);    // apagar uma tarefa
```

O **mesmo caminho** faz coisas diferentes consoante o método. É a base das REST APIs.