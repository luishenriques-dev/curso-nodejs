# 66. Using Express Router

**Secção 5 — Working with Express.js**

> **Em resumo:** as rotas saem do `app.js` e vão para ficheiros próprios, numa pasta **`routes/`**. Em cada ficheiro cria-se um **`express.Router()`**, que funciona como uma **mini-aplicação**. Exporta-se, e no `app.js` liga-se com `app.use()`.

---

## A nova estrutura

```
66-express-router/
├── app.js          ← arranca o servidor e liga as rotas
├── routes/
│   ├── admin.js    ← rotas do administrador da loja (adicionar produtos)
│   └── shop.js     ← rotas que os clientes veem (a página inicial)
├── package.json
└── README.md
```

O professor começa aqui a construir, aos poucos, uma **loja online**. O `admin.js` tem o que o **dono da loja** faz, e o `shop.js` o que os **clientes** veem.

---

## O código desta aula

### `routes/admin.js`

```javascript
const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
```

### `routes/shop.js`

```javascript
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

module.exports = router;
```

### `app.js`

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);
```

---

## A analogia: os departamentos de uma loja 🏬

Até agora, o `app.js` era uma loja com **um só funcionário** a fazer tudo. Com o Router:

- o **`app.js`** é a **receção**: recebe o pedido e encaminha-o para o departamento certo;
- o **`admin.js`** é o **escritório**, onde se registam produtos novos;
- o **`shop.js`** é a **montra**, o que os clientes veem.

Cada departamento trata das suas coisas, e a receção só tem de saber **que departamentos existem**.

---

## Passo a passo

### 1. Criar o router (em cada ficheiro de rotas)

```javascript
const express = require('express');
const router = express.Router();
```

- Importa-se o `express` **outra vez**. É normal importar o mesmo pacote em vários ficheiros (aula 44).
- O **`express.Router()`** cria uma **mini-aplicação**, com os mesmos métodos da `app`: `use`, `get` e `post`.

> ⚠️ **`Router` com R maiúsculo.** O nome da constante (`router`) podes escolher, mas o `express.Router` tem de ser escrito assim.

### 2. Registar as rotas no router

Em vez de `app.get(...)`, escreves **`router.get(...)`**. O resto do código **é igual**.

### 3. Exportar

```javascript
module.exports = router;
```

Igual à aula 38.

### 4. Importar e ligar no `app.js`

```javascript
const adminRoutes = require('./routes/admin');   // ./ porque é um ficheiro teu

app.use(adminRoutes);   // sem parênteses: passas o router, não o executas
```

O router **é um middleware válido**, por isso entra no `app.use()` como qualquer outro.

> 💡 **Arrumação dos `require`:** primeiro os pacotes (`express`, `body-parser`), depois, separados por uma linha em branco, **os teus ficheiros** (`./routes/...`).

---

## `get` e `post` comparam o caminho **exato**

Esta é a parte mais importante da aula.

| | Compara o caminho… |
|---|---|
| `app.use('/', ...)` / `router.use('/', ...)` | **"Começa por"**: o `/` apanha tudo (aula 63) |
| `app.get('/', ...)` / `router.get('/', ...)` | **Exatamente igual**: o `/` só apanha `/` |

Por isso, no `shop.js`, o `router.get('/')` **só** responde à página inicial. Já não apanha o `/add-product` nem o resto.

**Consequências:**

- Mesmo que trocasses a ordem (`shopRoutes` antes do `adminRoutes`), **continuava a funcionar**, porque o `get('/')` não apanha o `/add-product`.
- Se mudasses o `get` por `use` no `shop.js`, a ordem **voltava a importar**.
- O professor recomenda **manter a ordem certa na mesma** (os específicos primeiro), para não teres surpresas se um dia mudares algo.

> 💡 A diferença vem de usar **`get`**, não de usar o **Router**. Com o `app.get('/')` no `app.js` era igual.

---

## E se escreveres um caminho que não existe?

`localhost:3000/abc` → aparece **`Cannot GET /abc`**.

Como nenhum middleware trata desse caminho, é o Express que responde com esta mensagem por defeito. Na próxima aula crias uma **página 404** a sério.

---

## ✅ A reter

- **`express.Router()`** = mini-aplicação com `get`, `post` e `use`, num ficheiro à parte.
- Ficheiros de rotas numa pasta **`routes/`**, por convenção.
- Em cada ficheiro: criar o router → registar rotas → **`module.exports = router`**.
- No `app.js`: **`require('./routes/...')`** e **`app.use(router)`**, sem parênteses.
- **`get` e `post` comparam o caminho exato.** O **`use`** compara o início.
- Mantém a **ordem** certa: os específicos primeiro.

---

## 🔗 Ligação ao Nexus

O backend do Nexus está organizado assim: uma pasta de rotas com um ficheiro por área (tarefas, utilizadores, finanças…), cada um com o seu `Router`, todos ligados no ficheiro principal com `app.use()`. Muitas vezes com um caminho à frente, para agrupar:

```javascript
app.use('/api/tarefas', tarefasRouter);
```

Isso vem na aula 68 (Filtering Paths).