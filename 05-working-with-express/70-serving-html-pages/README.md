# 70. Serving HTML Pages

**Secção 5 — Working with Express.js**

> **Em resumo:** para enviar um ficheiro HTML usa-se **`res.sendFile(caminho)`**. O caminho tem de ser **absoluto**, e constrói-se com o core module **`path`**: `path.join(__dirname, '../', 'views', 'shop.html')`.

---

## O código desta aula

### `routes/shop.js`

```javascript
const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;
```

### `routes/admin.js` (só a rota GET)

```javascript
const path = require('path');

const express = require('express');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

// /admin/add-product => POST (igual à aula 68)
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
```

---

## `res.sendFile()`

Em vez de `res.send('<html>...')`, o **`res.sendFile(caminho)`** envia **um ficheiro**. Tal como o `send`, define o `Content-Type` sozinho: para um `.html`, fica `text/html`.

O difícil é **o caminho**.

---

## Porque é que os caminhos simples não funcionam

| Tentativa | Resultado | Porquê |
|---|---|---|
| `'/views/shop.html'` | ❌ Não encontra | O `/` no início é a **raiz do computador**, e não a pasta do projeto |
| `'./views/shop.html'` | ❌ Erro: *"path must be absolute"* | O `sendFile` exige um caminho **absoluto**, ou seja, completo desde a raiz do computador |

Precisamos de um caminho completo, como `/Users/luis/Desktop/curso-nodejs/.../views/shop.html`. Mas não queremos escrevê-lo à mão, porque muda de computador para computador.

---

## A solução: `path.join(__dirname, ...)`

```javascript
path.join(__dirname, '../', 'views', 'shop.html')
```

### `__dirname`

Uma variável **global** do Node (com **dois** underscores no início) que guarda o **caminho completo da pasta onde está o ficheiro atual**.

> ⚠️ No `shop.js`, o `__dirname` aponta para a pasta **`routes/`**, e não para a raiz do projeto, porque é aí que o `shop.js` está.

### `'../'`

Quer dizer **"sobe uma pasta"**. De `routes/` sobes para a raiz do projeto, onde está a pasta `views/`.

```
__dirname      → .../70-serving-html-pages/routes
'../'          → .../70-serving-html-pages
'views'        → .../70-serving-html-pages/views
'shop.html'    → .../70-serving-html-pages/views/shop.html ✅
```

### `path.join(...)`

**Junta os bocados** num caminho. É do core module **`path`**, que só precisa de ser importado, sem instalar (aula 44).

**Porquê usar o `path.join` e não juntar as partes à mão?** Porque cada sistema operativo escreve os caminhos de forma diferente:

| Sistema | Separador |
|---|---|
| Mac e Linux | `/` → `routes/shop.js` |
| Windows | `\` → `routes\shop.js` |

O `path.join` usa o separador certo para o computador onde o código corre. **Não ponhas barras** dentro dos bocados (`'views'`, e não `'/views'`): ele trata disso.

> 💡 Atenção: isto são caminhos de **ficheiros no computador**, e não os caminhos do **endereço** (URL) no browser. Esses usam sempre `/`.

---

## A analogia: dar indicações 🗺️

O `sendFile` é um estafeta que precisa da **morada completa**, porque não aceita "ao lado" nem "ali em cima".

- `__dirname` = **"estou aqui"** (na pasta `routes`)
- `'../'` = **"sobe um andar"**
- `'views'`, `'shop.html'` = **"entra nesta porta, depois nesta"**

O `path.join` transforma estas indicações numa **morada completa**, no formato certo para o país (o sistema operativo) onde estás.

---

## Tarefa bónus do professor

Cria um ficheiro **`404.html`** na pasta `views/` e faz com que o middleware "apanha-tudo" da aula 67 o envie, em vez do `<h1>Page not found</h1>` escrito no código. A solução vem na próxima aula.

---

## ✅ A reter

- **`res.sendFile(caminho)`** → envia um ficheiro e define o `Content-Type`.
- O caminho tem de ser **absoluto**.
- **`path.join(__dirname, '../', 'views', 'ficheiro.html')`**:
  - `__dirname` → a pasta do ficheiro atual;
  - `'../'` → sobe uma pasta;
  - `path.join` → junta tudo, com o separador certo para cada sistema.
- **`require('path')`**: core module, sem instalar.