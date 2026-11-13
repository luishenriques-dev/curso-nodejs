# 61. How Middleware Works

**Secção 5 — Working with Express.js**

> **Em resumo:** o último middleware tem de **enviar uma resposta**, porque o Express **não envia nenhuma por defeito**. Com o Express, isso faz-se numa linha: **`res.send()`**, que até define o `Content-Type` por ti.

---

## O código desta aula

```javascript
app.use((req, res, next) => {
  console.log('In the middleware!');
  next(); // passa ao middleware seguinte
});

app.use((req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hello from Express!</h1>'); // responde, e o pedido termina aqui
});
```

Ao abrires `localhost:3000`, o browser já mostra **Hello from Express!**, e deixa de ficar à espera.

---

## `res.send()`: responder numa linha

**Na secção 3 (Node puro):**

```javascript
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<body><h1>Hello!</h1></body>');
res.write('</html>');
res.end();
```

**Com o Express:**

```javascript
res.send('<h1>Hello from Express!</h1>');
```

O `res.send()`:

- **envia o conteúdo** que lhe passares (texto, HTML e, mais à frente, outros tipos de dados);
- **define o `Content-Type` sozinho**: para texto, fica `text/html`;
- **termina a resposta**, por isso não precisas do `res.end()`.

> 💡 O `setHeader`, o `write` e o `end` **continuam a funcionar** no Express. Se quiseres um `Content-Type` diferente, ainda podes usar o `res.setHeader(...)`, e esse valor prevalece sobre o que o `send` definiria.

Para confirmar: no browser, abre as ferramentas de programador → **Network** → clica no pedido `localhost`. Em **Response Headers** vês `Content-Type: text/html`, que foi o Express a definir.

---

## Recapitulando: como o pedido viaja

```
pedido
  │
  ▼
middleware 1  ── console.log ── next() ──┐
                                         ▼
middleware 2  ── console.log ── res.send()  ──▶ resposta ao browser
```

- O pedido percorre os middlewares **de cima para baixo**, saltando de um para o outro com o **`next()`**.
- Quando um middleware **responde**, a viagem **acaba ali**. Os de baixo nunca correm.
- Se o **primeiro** respondesse em vez de chamar `next()`, o segundo **nunca seria alcançado**.

---

## ✅ A reter

- O Express **não responde sozinho**: algum middleware tem de enviar a resposta.
- **`res.send(conteúdo)`** → envia, define o `Content-Type` e termina a resposta.
- Em cada middleware: **`next()` ou `res.send()`**, nunca os dois.
- O pedido viaja **de cima para baixo**, e só continua com `next()`.