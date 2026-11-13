# 62. Express.js - Looking Behind the Scenes

**Secção 5 — Working with Express.js**

> **Em resumo:** o código do Express é **open source**, e podes ver como funciona por dentro. Duas descobertas: o **`res.send()`** escolhe o `Content-Type` consoante o que lhe passas, e o **`app.listen()`** faz o `createServer` e o `listen` de uma vez, por isso **já não precisas do `http`**.

---

## O código desta aula

```javascript
const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('In the middleware!');
  next();
});

app.use((req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
```

**O que mudou:** desapareceu o `require('http')` e o `http.createServer(app)`. Agora é só **`app.listen(3000)`**.

> 💡 Se tinhas a função que mostra o endereço no terminal (aula 45), continua a funcionar da mesma forma: `app.listen(3000, () => { console.log('http://localhost:3000'); });`

---

## Espreitar o código do Express

O Express está no GitHub: **github.com/expressjs/express**. Na pasta **`lib`** estão os ficheiros principais. Também os tens no teu projeto, em `node_modules/express/lib`.

> 💡 **É uma ótima técnica** para quando quiseres saber o que uma função faz realmente, por exemplo se define algum header por ti. Não precisas de perceber o ficheiro todo: procura só a função que te interessa, com **Cmd + F**.

### O que o `res.send()` faz por dentro (`lib/response.js`)

Olha para **o tipo de dados** que lhe passas e decide o `Content-Type`:

| Passas ao `send()` | `Content-Type` que define |
|---|---|
| **Texto** (como o teu `<h1>`) | `text/html` |
| **Buffer** (dados binários) | `application/octet-stream` |
| **Objeto ou array** | `application/json` |

E um pormenor importante: **só define o `Content-Type` se ainda não estiver definido**. Se fizeres `res.setHeader('Content-Type', ...)` antes, o `send()` respeita o teu valor.

### O que o `app.listen()` faz por dentro (`lib/application.js`)

Exatamente o que fazias à mão:

```javascript
// por dentro do app.listen(), simplificado:
const server = http.createServer(this);  // "this" é a própria app
return server.listen(...);
```

Por isso:

```javascript
// Antes
const http = require('http');
const server = http.createServer(app);
server.listen(3000);

// Depois
app.listen(3000);
```

Fazem **o mesmo**. A segunda forma é mais curta e dispensa o `require('http')`.

---

## ✅ A reter

- O código do Express é **aberto**: quando tiveres dúvidas sobre o que uma função faz, **vai ver**.
- **`res.send()`** escolhe o `Content-Type` pelo tipo de dados, mas **só se ainda não estiver definido**.
- **`app.listen(3000)`** = `http.createServer(app)` + `server.listen(3000)`. Já não precisas do `http`.
- Próximas aulas: **rotas diferentes** (como o `/` e o `/message` da secção 3) e **ler o body** de forma fácil.

---

## 🔗 Ligação ao Nexus

O arranque do backend do Nexus termina com um `app.listen(...)`. E quando o Nexus devolve dados ao frontend com `res.json({...})`, é parecido com o `send()` de um objeto: o `Content-Type` fica `application/json` automaticamente.