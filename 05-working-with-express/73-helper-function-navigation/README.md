# 73. Using a Helper Function for Navigation

**Secção 5 — Working with Express.js**

> **Em resumo:** em vez de `path.join(__dirname, '../', ...)`, cria-se um ficheiro **`util/path.js`** que exporta **o caminho da raiz do projeto** (`rootDir`). Nas rotas passa a ser `path.join(rootDir, 'views', ...)`, sem `__dirname` nem `'../'`.

---

## A nova estrutura

```
73-helper-function-navigation/
├── app.js
├── routes/
│   ├── admin.js
│   └── shop.js
├── util/              ← nova
│   └── path.js        ← dá o caminho da raiz do projeto
├── views/
│   ├── 404.html
│   ├── add-product.html
│   └── shop.html
├── package.json
└── README.md
```

---

## O código desta aula

### `util/path.js`

```javascript
const path = require('path');

module.exports = path.dirname(require.main.filename);
```

> ⚠️ O professor escreve `process.mainModule.filename`, que está **desatualizado** (aula 72). Usa **`require.main.filename`**.

### `routes/admin.js` (só o que muda)

```javascript
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});
```

### `routes/shop.js` (só o que muda)

```javascript
const rootDir = require('../util/path');

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});
```

---

## Primeiro: `'..'` em vez de `'../'`

Antes de criar o ficheiro, o professor mostra uma pequena melhoria:

```javascript
path.join(__dirname, '../', 'views', 'shop.html')   // funciona
path.join(__dirname, '..', 'views', 'shop.html')    // preferível
```

Com `'..'` não escreves **nenhuma barra**, e o `path.join` põe o separador certo para cada sistema. Funcionam os dois, mas o segundo é mais limpo.

---

## A solução melhor: `util/path.js`

### O que faz cada parte

```javascript
path.dirname(require.main.filename)
```

| Parte | O que dá | No teu projeto |
|---|---|---|
| `require.main` | O **ficheiro principal**, o que arrancou a aplicação | O `app.js` |
| `.filename` | O **caminho completo** desse ficheiro | `.../73-helper-function-navigation/app.js` |
| `path.dirname(...)` | A **pasta** onde esse ficheiro está | `.../73-helper-function-navigation` |

O resultado é **o caminho da raiz do projeto**, porque o `app.js` está na raiz.

### Porque é que é melhor que o `__dirname`

| | `__dirname` | `rootDir` |
|---|---|---|
| Vale… | A pasta **do ficheiro onde o escreves** | **Sempre a raiz** do projeto |
| No `routes/shop.js` | `.../routes`, por isso precisas do `'..'` | `.../73-helper-function-navigation` |
| Se moveres um ficheiro de pasta | Tens de mudar os `'..'` | Continua igual |

Com o `rootDir`, **qualquer ficheiro**, em qualquer pasta, chega à `views` da mesma forma: `path.join(rootDir, 'views', ...)`.

---

## A analogia: a morada da sede 🏢

O `__dirname` é dizer **"a partir de onde estou"**: *"sobe um andar, vira à esquerda…"*. Depende de onde estás, e as indicações mudam de sala para sala.

O `rootDir` é ter **a morada da sede escrita num cartão**. Estejas onde estiveres, partes sempre da entrada principal: *"sede → views → shop.html"*.

---

## E o nome `path.js`? Não choca com o `path` do Node?

Não, por causa do **`./`** (aula 26):

| `require` | Vai buscar |
|---|---|
| `require('path')` | O **core module** do Node |
| `require('../util/path')` | O **teu ficheiro** `util/path.js` |

Com `./` ou `../` no início, o Node sabe que é um ficheiro teu.

> 💡 **A pasta `util`** (ou `helpers`) é uma convenção para **pequenas funções de ajuda** que vários ficheiros usam.

---

## ✅ A reter

- **`'..'`** é preferível a **`'../'`** no `path.join`, porque fica sem barras.
- **`util/path.js`** → `module.exports = path.dirname(require.main.filename);` → o caminho da **raiz do projeto**.
- Nas rotas: **`path.join(rootDir, 'views', 'ficheiro.html')`**, sem `__dirname` nem `'..'`.
- O `rootDir` é **o mesmo em qualquer ficheiro**, e o `__dirname` muda consoante a pasta.
- Usa **`require.main`** e não `process.mainModule`, que está desatualizado.