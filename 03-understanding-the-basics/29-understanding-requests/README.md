# 29. Understanding Requests

**Secção 3 — Understanding the Basics**

> **Em resumo:** o objeto `req` tem muita informação, mas no dia a dia só precisas de três campos: `req.url`, `req.method` e `req.headers`.

---

## O código desta aula

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
});

server.listen(3000);
```

> 💡 O `console.log` aceita **vários valores separados por vírgulas** e mostra-os todos na mesma linha.

Corre `node app.js`, abre `localhost:3000` e olha para o terminal. Depois experimenta `localhost:3000/test`.

---

## O objeto `req`: grande demais para ler todo

Na aula 26, o `console.log(req)` despejou um monte de texto no terminal. Isso acontece porque o `req` é um **objeto complexo**, que o Node cria sozinho para cada request que chega. Lá dentro há:

- **dados** sobre o pedido;
- **funções** (métodos) que podes chamar.

É informação a mais. Na prática, só precisas de três campos.

---

## A analogia: uma carta que chega ao correio ✉️

| Campo | O que é | Na carta |
|---|---|---|
| `req.url` | **Para onde** vai o pedido, dentro do site | A morada no envelope |
| `req.method` | **O que** o browser quer fazer | O tipo de envio: "só quero informação" ou "venho entregar algo" |
| `req.headers` | **Informação extra** sobre o pedido | Os carimbos e as notas escritas por fora do envelope |

---

## Os três campos, um a um

### 1. `req.url`

É **tudo o que vem depois do host** (`localhost:3000`).

| Escreves no browser | `req.url` |
|---|---|
| `localhost:3000` | `/` |
| `localhost:3000/test` | `/test` |
| `localhost:3000/produtos/12` | `/produtos/12` |

Mesmo sem escreveres nada depois do host, o `req.url` é `/`, ou seja, a página inicial.

> 💡 É com o `req.url` que o servidor decide **que página mostrar**. Vais usá-lo já nas próximas aulas.

---

### 2. `req.method`

É o **método HTTP** do pedido, ou seja, o tipo de ação.

- Quando escreves um endereço no browser e carregas Enter, o método é **`GET`**: *"dá-me esta página"*.
- Mais à frente vais ver o **`POST`**, usado por exemplo quando submetes um formulário: *"toma estes dados"*.

---

### 3. `req.headers`

São os **headers** (cabeçalhos): a meta-informação que o browser junta ao pedido. Alguns dos que aparecem no terminal:

| Header | O que diz |
|---|---|
| `host` | O endereço para onde foi o pedido (`localhost:3000`) |
| `user-agent` | Que browser fez o pedido |
| `accept` | Que tipos de resposta o browser aceita (HTML, XML…) |
| `accept-encoding` | Que respostas comprimidas aceita, para poupar largura de banda |
| `cache-control` | Como guardar a resposta em cache |
| `cookie` | Os cookies associados ao site (ficam para mais tarde) |

> 💡 Não precisas de decorar os headers. Basta saber que existem e onde os encontrar: em `req.headers`.

---

## ✅ A reter

- O `req` é criado pelo Node para **cada request** e tem tudo sobre o pedido.
- Os três campos mais úteis:
  - `req.url` → o caminho depois do host (`/`, `/test`…);
  - `req.method` → o tipo de ação (`GET`, `POST`…);
  - `req.headers` → a meta-informação enviada pelo browser.
- Ainda **não enviamos resposta**, por isso o browser continua à espera.
- Próxima aula: enviar uma `response` com o `res`.

---

## 🔗 Ligação ao Nexus

No Express usas os mesmos campos: `req.url`, `req.method` e `req.headers`. A diferença é que o Express usa o `url` e o `method` por ti para escolher a rota certa. Quando escreves `app.get('/tarefas', ...)`, estás a dizer *"quando o `method` for `GET` e o `url` for `/tarefas`, executa isto"*.
