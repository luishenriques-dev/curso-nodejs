# 38. Using the Node Modules System

**Secção 3 — Understanding the Basics**

> **Em resumo:** o código passa a estar dividido em **dois ficheiros**. O `app.js` só arranca o servidor, e o `routes.js` tem a lógica das rotas. Ligam-se com **`module.exports`** (exportar) e **`require`** (importar).

---

## O código desta aula

### `app.js`: só arranca o servidor

```javascript
const http = require('http');

const routes = require('./routes'); // our own file (note the ./)

const server = http.createServer(routes); // no () : we pass the function, not run it

server.listen(3000);
```

### `routes.js`: a lógica das rotas

```javascript
const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = requestHandler;
```

O código das rotas é **o mesmo da aula 36**. Só mudou de sítio.

---

## Porquê dividir em ficheiros?

Até agora estava tudo no `app.js`. Num projeto a sério isso fica ilegível depressa. Dividir permite que **cada ficheiro tenha uma só função**:

| Ficheiro | Responsabilidade |
|---|---|
| `app.js` | **Arrancar** o servidor |
| `routes.js` | **Decidir** o que responder a cada pedido |

---

## A analogia: as divisões de uma casa 🏠

Pensa no `app.js` como a **entrada da casa**: só serve para abrir a porta. O `routes.js` é a **cozinha**, onde se faz o trabalho a sério.

Para a cozinha poder ser usada a partir da entrada, tem de haver uma **porta entre as duas**:

- **`module.exports`** é a cozinha a dizer *"isto pode ser usado lá fora"*;
- **`require('./routes')`** é a entrada a ir **buscar** o que a cozinha disponibilizou.

O que não está no `module.exports` **fica fechado** dentro do ficheiro. Lá fora ninguém lhe consegue aceder.

---

## Passo a passo

### 1. Pôr a lógica numa função

```javascript
const requestHandler = (req, res) => {
  ...
};
```

É uma **arrow function guardada numa constante**. O nome da constante (`requestHandler`) passa a ser o nome da função. Recebe o `req` e o `res`, tal como a função que antes estava dentro do `createServer`.

Tudo o que usa o `req` e o `res` vai **para dentro** desta função, incluindo o `const url` e o `const method`.

### 2. Exportar

```javascript
module.exports = requestHandler;
```

O **`module.exports`** é um objeto que o Node disponibiliza em todos os ficheiros. O que lá pões é o que outros ficheiros recebem quando fazem `require` deste.

### 3. Importar no `app.js`

```javascript
const routes = require('./routes');
```

- O **`./`** diz ao Node que é um **ficheiro teu**, na mesma pasta. Sem ele, ia procurar um módulo do Node chamado `routes` (aula 26).
- O `.js` no fim é **opcional**: o Node acrescenta-o sozinho.
- A constante `routes` fica com **o que foi exportado**, ou seja, a função `requestHandler`.

### 4. Usar

```javascript
const server = http.createServer(routes);
```

**Sem parênteses**: não executamos a função, só a **entregamos** ao Node, para ele a correr a cada pedido. É a "forma 1" da aula 26.

### 5. Arrumar os `require`

Cada ficheiro importa **só o que usa**:

- o `app.js` já não precisa do `fs`, porque deixou de gravar ficheiros;
- o `routes.js` precisa do `fs`, por isso o `require('fs')` passa para lá.

---

## Exportar várias coisas

O professor mostra quatro formas de escrever o export. As três últimas fazem **exatamente o mesmo**:

```javascript
// 1. Uma só coisa
module.exports = requestHandler;

// 2. Várias coisas, num objeto
module.exports = {
  handler: requestHandler,
  someText: 'Some hard coded text'
};

// 3. Várias coisas, uma a uma
module.exports.handler = requestHandler;
module.exports.someText = 'Some hard coded text';

// 4. Atalho do Node para a forma 3
exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
```

Com as formas 2, 3 ou 4, o `routes` no `app.js` passa a ser um **objeto**, e vais buscar cada coisa pelo nome:

```javascript
const routes = require('./routes');

console.log(routes.someText);
const server = http.createServer(routes.handler);
```

> 💡 O atalho `exports.` **só existe no Node**, não é JavaScript em geral.

> 💡 **O Node guarda o ficheiro importado em cache.** Não consegues alterar o `routes.js` a partir de fora, por exemplo acrescentando-lhe propriedades a partir do `app.js`. Só podes **ler** o que foi exportado.

---

## ✅ A reter

- **`module.exports = ...`** → o que um ficheiro **disponibiliza** para fora.
- **`require('./ficheiro')`** → **importa** o que outro ficheiro exportou. Com **`./`** para ficheiros teus.
- O que não é exportado fica **privado** ao ficheiro.
- Para exportar várias coisas, usa um **objeto** e acede pelo nome: `routes.handler`.
- **Cada ficheiro importa só o que usa.**
- Fim da secção 3. Na próxima secção começa o **npm** e as ferramentas que facilitam o trabalho.

---

## 🔗 Ligação ao Nexus

No Nexus, o backend está dividido da mesma forma, mas em mais ficheiros: `routes/`, `controllers/`, `models/`… Cada um exporta o que os outros precisam.

Uma diferença: como o Nexus usa **TypeScript**, a sintaxe é a dos **ES Modules**, mais moderna:

| Node (CommonJS), como no curso | ES Modules, como no Nexus |
|---|---|
| `const routes = require('./routes');` | `import routes from './routes';` |
| `module.exports = requestHandler;` | `export default requestHandler;` |
| `exports.handler = requestHandler;` | `export const handler = requestHandler;` |

A ideia é exatamente a mesma: um ficheiro **exporta**, o outro **importa**. Só muda a forma de escrever.
