# 30. Sending Responses

**Secção 3 — Understanding the Basics**

> **Em resumo:** o servidor finalmente responde. Com o `res` defines os **headers**, escreves o **body** e terminas com `res.end()`.

---

## O código desta aula

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
```

Para o servidor com **Ctrl + C**, volta a correr `node app.js` e abre `localhost:3000`. Desta vez a página mostra **"Hello from my Node.js Server!"**.

> ⚠️ **Sempre que alteras o código, tens de reiniciar o servidor.** O processo que está a correr continua com a versão antiga até o parares (aula 28).

---

## A analogia: preparar uma encomenda para enviar 📦

O `res` é a **caixa** que vais enviar ao cliente:

| Passo | Código | Na encomenda |
|---|---|---|
| 1 | `res.setHeader(...)` | Colar a **etiqueta** por fora: *"Conteúdo: página HTML"* |
| 2 | `res.write(...)` | **Pôr o conteúdo** na caixa, peça a peça |
| 3 | `res.end()` | **Fechar a caixa** e enviá-la |

Depois de fechada, a caixa já foi enviada: não dá para meter mais nada lá dentro.

---

## Passo a passo

### 1. `res.setHeader('Content-Type', 'text/html')`

Acrescenta um **header** à resposta. Recebe dois valores:

- o **nome** do header: `'Content-Type'`;
- o **valor**: `'text/html'`.

O `Content-Type` diz ao browser **que tipo de conteúdo vai na resposta**. Sem ele, o browser não saberia que aquilo é HTML para mostrar como página.

> 💡 Os headers não são inventados: há uma lista de headers que os browsers conhecem. A aula seguinte do curso tem um link com essa lista. Não precisas de a decorar.

---

### 2. `res.write(...)`

Escreve dados no **body** da resposta. Podes chamá-lo várias vezes: cada `write` acrescenta um pedaço, como se escrevesses a resposta linha a linha.

Aqui escreve-se um documento HTML inteiro, aos bocados:

```javascript
res.write('<html>');
res.write('<head><title>My First Page</title></head>');
res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
res.write('</html>');
```

> 💡 **Parece estranho escrever HTML assim?** É mesmo, e o professor admite-o. Serve para perceberes o que acontece por baixo. Mais à frente, o Express faz isto por ti de forma muito mais simples.

---

### 3. `res.end()`

Diz ao Node: *"a resposta está pronta, podes enviá-la"*.

> ⚠️ **Depois do `res.end()`, não escrevas mais nada.** Um `res.write()` a seguir dá erro, porque a resposta já foi enviada ao browser.

---

## Ver a resposta no browser 🔍

Abre as **ferramentas de programador** do browser:

- **Chrome:** `Cmd + Option + I` (Mac) ou `F12` (Windows);
- **Safari:** primeiro ativa o menu **Programador** em *Definições → Avançadas*; depois `Cmd + Option + I`.

No separador **Network** (Rede), recarrega a página e clica no primeiro pedido (`localhost`):

- em **Headers → Response Headers**, vês o `Content-Type: text/html` que definiste;
- em **Response**, vês o HTML que escreveste com os `res.write`.

---

## ✅ A reter

- O `res` serve para **montar a resposta**: headers, depois body, depois `end`.
- `res.setHeader(nome, valor)` → acrescenta um header. O `Content-Type` diz ao browser o que vem no body.
- `res.write(...)` → escreve no body, aos pedaços.
- `res.end()` → envia a resposta. **Depois disto, mais nada.**
- O método **`GET`** é o que o browser usa quando escreves um endereço e carregas Enter.
- Próxima aula: ligar o `req` e o `res`, ou seja, **responder de forma diferente consoante o pedido**.

---

## 🔗 Ligação ao Nexus

No Express, tudo isto cabe numa linha:

```javascript
res.send('<h1>Hello from my Node.js Server!</h1>');
```

O `res.send()` define o `Content-Type` sozinho, escreve o body e faz o `end`. No Nexus, como o backend devolve dados, usas mais o `res.json({ ... })`, que faz o mesmo mas com `Content-Type: application/json`.
