# 64. Parsing Incoming Requests

**Secção 5 — Working with Express.js**

> **Em resumo:** com o pacote **`body-parser`**, os dados de um formulário aparecem prontos em **`req.body`**, sem `req.on`, `Buffer` ou `split`. E para redirecionar há o **`res.redirect('/')`**.

---

## O código desta aula

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

app.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
```

**O fluxo:**

1. Abres `/add-product` → aparece o formulário.
2. Escreves `Livro` e clicas em *Add Product* → o browser envia um `POST` para `/product`.
3. O `/product` mostra `{ title: 'Livro' }` no terminal e **redireciona** para `/`.

---

## Instalar o `body-parser`

```bash
npm install --save body-parser
```

`--save` e não `--save-dev`, porque a aplicação precisa dele **a correr**, também no servidor real (aula 59).

> ⚠️ **Depois de instalar um pacote, reinicia o servidor à mão** (Ctrl + C e `npm start`). O nodemon reinicia quando mudas **os teus ficheiros**, não quando instalas pacotes.

---

## O problema: `req.body` é `undefined`

O Express acrescenta ao `req` um campo **`req.body`**, mas **não o preenche sozinho**. Sem mais nada, `console.log(req.body)` mostra `undefined`.

É preciso um **middleware que leia o body** e o ponha lá.

---

## A solução: o `body-parser`

```javascript
app.use(bodyParser.urlencoded({ extended: false }));
```

Faz **exatamente o que fizeste à mão na aula 34**:

| Aula 34 (à mão) | Com o `body-parser` |
|---|---|
| `req.on('data', ...)` para apanhar os bocados | ✅ feito |
| `Buffer.concat(body).toString()` | ✅ feito |
| `split('=')[1]` para tirar o valor | ✅ feito, e com **vários campos** |
| Desfazer o `+` e o `%21` | ✅ feito |
| Resultado | **`req.body = { title: 'Livro' }`** |

### A analogia: o tradutor à porta 🗣️

Os dados chegam "em código" (bytes). O `body-parser` é um **tradutor à porta**: traduz para algo que se lê (um objeto) e deixa o pedido entrar com o **`req.body`** já preenchido.

### Porque é que fica no topo

Tem de ler o body **antes** de o pedido chegar às rotas:

```
pedido ──▶ body-parser (preenche req.body) ──next()──▶ a tua rota (usa req.body)
```

Por isso vai **antes** dos middlewares de rotas. Ele próprio chama o `next()` no fim, por isso não tens de te preocupar com isso.

---

## O que quer dizer `urlencoded`

É **o formato** em que os formulários HTML enviam os dados (aula 34):

```
title=Livro&price=10
```

O `body-parser` tem **um leitor para cada formato**:

| Leitor | Para dados que vêm… |
|---|---|
| **`bodyParser.urlencoded()`** | de um **formulário HTML** |
| `bodyParser.json()` | em **JSON**, normalmente enviados por JavaScript ou por uma app |

O **`{ extended: false }`** escolhe a versão **simples** do leitor, que chega para formulários normais. Sem esta opção, aparece um aviso no terminal.

> 💡 **Ficheiros** (uploads) precisam de **outro** leitor. Vem mais à frente no curso. É esta a força do Express: precisas de algo, ligas o pacote certo com uma linha.

---

## Duas coisas novas do Express

### `res.redirect('/')`

```javascript
res.redirect('/');
```

Substitui as três linhas da aula 33:

```javascript
res.statusCode = 302;
res.setHeader('Location', '/');
res.end();
```

### Pode-se omitir o `next`

Se um middleware **não usa** o `next`, podes deixar de o escrever: `(req, res) => { ... }`. Só os **últimos** argumentos se podem omitir, porque a ordem conta: não podes tirar o `req` e ficar só com o `res`. O professor escreve sempre os três, para ficar claro que o `next` existe.

---

## O problema que fica por resolver

O middleware do `/product` corre para **qualquer** pedido para `/product`, **também `GET`**, por exemplo se escreveres `localhost:3000/product` no browser. Só queremos que trate o `POST` do formulário. Isso resolve-se na próxima aula.

---

## ✅ A reter

- O Express **não lê o body por defeito**: `req.body` fica `undefined`.
- **`app.use(bodyParser.urlencoded({ extended: false }))`**, **antes** das rotas → `req.body` passa a ter os dados do formulário.
- **`req.body.title`** → o valor do campo com `name="title"`.
- **`res.redirect('/')`** → redireciona numa linha.
- **Depois de instalar um pacote, reinicia o servidor** à mão.

---

## 🔗 Ligação ao Nexus

No Nexus, o frontend envia os dados em **JSON**, por isso usa-se o leitor de JSON. As versões recentes do Express já o trazem incluído, sem precisar do pacote `body-parser`:

```javascript
app.use(express.json());                          // para JSON
app.use(express.urlencoded({ extended: false })); // para formulários
```

Fazem o mesmo que o `body-parser`. O professor usa o pacote à parte porque, no passado, o Express já incluiu, removeu e voltou a incluir esta funcionalidade, e assim o código do curso funciona em qualquer versão.
