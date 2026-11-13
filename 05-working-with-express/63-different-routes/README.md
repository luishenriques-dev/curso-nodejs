# 63. Handling Different Routes

**Secção 5 — Working with Express.js**

> **Em resumo:** o `app.use()` aceita um **caminho** como primeiro valor: `app.use('/add-product', ...)`. Mas o caminho funciona como **"começa por"**, e não como "é igual a". Por isso a **ordem** dos middlewares é decisiva: **os mais específicos vêm primeiro**.

---

## O código desta aula

```javascript
const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('This always runs!');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>The "Add Product" Page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
```

| Abres | O que aparece |
|---|---|
| `localhost:3000/add-product` | **The "Add Product" Page** |
| `localhost:3000` | **Hello from Express!** |
| `localhost:3000/qualquer-coisa` | **Hello from Express!** |

E no terminal aparece sempre **`This always runs!`**, em todos os pedidos.

---

## O caminho no `app.use()`

```javascript
app.use('/add-product', (req, res, next) => { ... });
```

O primeiro valor, opcional, é um **filtro de caminho**. Se não o puseres, é `'/'` por defeito.

> ⚠️ **Atenção:** o filtro quer dizer **"o caminho COMEÇA por isto"**, e não "é exatamente isto". É diferente do `if (url === '/')` da secção 3.

| Filtro | Apanha |
|---|---|
| `'/'` | **Todos os pedidos**, porque todos os caminhos começam por `/` |
| `'/add-product'` | `/add-product`, `/add-product/novo`, `/add-product/123`… |

---

## Porque é que a ordem importa

O pedido percorre os middlewares **de cima para baixo** (aula 61) e **pára no primeiro que responder**.

Pensa no que acontece com `/add-product`:

1. `app.use('/', ...)` → apanha (começa por `/`), mostra *"This always runs!"* e **`next()`**.
2. `app.use('/add-product', ...)` → apanha e **responde**. A viagem acaba aqui.
3. `app.use('/', ...)` → **nunca chega cá**.

E se trocasses a ordem do 2 e do 3?

```javascript
app.use('/', ...)            // apanha /add-product (começa por /) e RESPONDE "Hello"
app.use('/add-product', ...) // ❌ nunca é alcançado
```

O `'/'` apanhava **tudo** antes de o `/add-product` ter oportunidade.

> 💡 **Regra:** os caminhos **mais específicos em cima**, o `'/'` geral **em baixo**, como um "apanha o resto".

---

## A analogia: a triagem das cartas ✉️

Nos correios, as cartas passam por caixas de triagem, **por ordem**:

1. **"Todas as cartas"** → carimbo de data, e seguem (`next()`).
2. **"Cartas para Guimarães"** → ficam aqui (respondem).
3. **"Todas as cartas"** → as que sobraram ficam aqui.

Se a caixa 3 estivesse antes da 2, ficava com **todas**, incluindo as de Guimarães.

---

## Um middleware para todos os pedidos

```javascript
app.use('/', (req, res, next) => {
  console.log('This always runs!');
  next();
});
```

Posto **no topo** e com **`next()`**, corre em **todos os pedidos** e deixa-os seguir. É o padrão para coisas que se aplicam a tudo, como registar no terminal cada pedido que chega.

> 💡 Se a mensagem aparecer duas vezes por cada página, é por causa do pedido do `favicon.ico` (aula 32), que também passa por aqui.

---

## ✅ A reter

- **`app.use('/caminho', função)`** → só corre para pedidos cujo caminho **começa por** `/caminho`.
- `'/'` apanha **tudo**.
- **Ordem:** específicos **em cima**, gerais **em baixo**.
- Middleware que **responde** → **nunca** chama `next()` (uma resposta por pedido).
- Middleware para **todos** os pedidos → no topo, **com `next()`**.

---

## 🔗 Ligação ao Nexus

O `app.use('/caminho', ...)` com "começa por" é muito usado para **agrupar rotas**. No Nexus, por exemplo:

```javascript
app.use('/api/tarefas', tarefasRoutes);   // tudo o que começa por /api/tarefas
app.use('/api/utilizadores', userRoutes); // tudo o que começa por /api/utilizadores
```

Vais ver isto com o **Express Router**, na aula 66.