# 33. Redirecting Requests

**Secção 3 — Understanding the Basics**

> **Em resumo:** quando chega o `POST` para `/message`, o servidor **cria um ficheiro** e **redireciona** o utilizador de volta para `/`.

---

## O código desta aula

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
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
    fs.writeFileSync('message.txt', 'DUMMY');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
```

---

## A analogia: entregar um formulário na secretaria 🗂️

1. Preenches o formulário no balcão (`/`) e entregas-o (`POST /message`).
2. A funcionária **arquiva-o numa pasta** → `fs.writeFileSync(...)`.
3. Diz-te: *"Pronto, pode voltar ao balcão"* → **redirecionamento** para `/`.

Não ficas parado na sala do arquivo: és mandado de volta para onde estavas.

---

## Passo a passo

### 1. Importar o `fs`

```javascript
const fs = require('fs');
```

O **`fs`** (*file system*) é o core module para trabalhar com ficheiros: criar, ler, escrever e apagar. Fica no topo do ficheiro, junto ao `http`.

---

### 2. Apanhar só o `POST` para `/message`

```javascript
if (url === '/message' && method === 'POST') { ... }
```

O `&&` quer dizer **"e"**: só entra no `if` se as **duas** condições forem verdadeiras.

| Pedido | Entra no `if`? |
|---|---|
| `POST /message` (submeter o formulário) | ✅ Sim |
| `GET /message` (escrever o endereço no browser) | ❌ Não |
| `POST /outra-coisa` | ❌ Não |

> 💡 É a primeira vez que o **`method`** decide o que acontece. O mesmo `url` pode ter respostas diferentes consoante o método.

---

### 3. Criar o ficheiro

```javascript
fs.writeFileSync('message.txt', 'DUMMY');
```

- O primeiro valor é o **nome do ficheiro**. Sem pasta indicada, é criado **na pasta de onde correste o `node`**.
- O segundo é o **conteúdo**. Por agora é um texto fictício, `'DUMMY'`; na próxima aula passa a ser a mensagem escrita pelo utilizador.
- Se o ficheiro já existir, é **substituído**.

> 💡 **Porquê `writeFileSync` e não `writeFile`?** O `Sync` quer dizer que o Node **espera** até o ficheiro estar escrito antes de continuar. O professor explica a diferença daqui a umas aulas e porque é que, num servidor, normalmente se evita.

---

### 4. Redirecionar

```javascript
res.statusCode = 302;
res.setHeader('Location', '/');
return res.end();
```

Um redirecionamento são **duas informações** na resposta:

| | O que é | Valor |
|---|---|---|
| `statusCode` | O **código de estado** da resposta | `302` → *"redirecionamento"* |
| Header `Location` | **Para onde** o browser deve ir | `/` |

Quando recebe isto, o browser faz sozinho um novo `GET` para `/` e mostra outra vez o formulário.

> 💡 **Forma alternativa:** o professor mostra também o `res.writeHead`, que define o código de estado e os headers de uma vez:
> ```javascript
> res.writeHead(302, { Location: '/' });
> ```
> Faz exatamente o mesmo que as duas linhas acima.

E, como na aula anterior, **`return res.end()`** para o código abaixo não correr.

---

## Códigos de estado que vais encontrar

O código de estado é um número que resume **como correu o pedido**:

| Código | Significado |
|---|---|
| `200` | OK, correu bem (é o valor por defeito) |
| `302` | Redirecionamento: vai para outro sítio |
| `404` | Não encontrado |
| `500` | Erro no servidor |

---

## Como confirmar que funciona

1. Reinicia o servidor e abre `localhost:3000`.
2. Escreve algo e clica em *Send*. A página parece só recarregar, porque foste redirecionado para `/`.
3. Nas ferramentas de programador, no separador **Network**, vês um pedido para `message` com o código **302**, seguido do pedido para `localhost`.
4. Na pasta da aula aparece o ficheiro **`message.txt`** com `DUMMY` lá dentro.

> ⚠️ **No repositório:** o `message.txt` é criado pelo código, não faz parte dele. Podes apagá-lo antes do commit ou acrescentá-lo ao `.gitignore`.

---

## ✅ A reter

- O **`fs`** é o core module para trabalhar com ficheiros.
- Com `url` **e** `method` (`&&`) apanhas só o pedido que queres.
- `fs.writeFileSync(nome, conteúdo)` cria ou substitui um ficheiro.
- **Redirecionar** = `statusCode` **302** + header **`Location`**.
- Próxima aula: ler a mensagem que o utilizador escreveu e guardá-la no ficheiro, em vez do `'DUMMY'`.

---

## 🔗 Ligação ao Nexus

No Express, o redirecionamento cabe numa linha:

```javascript
app.post('/message', (req, res) => {
  res.redirect('/');   // define o 302 e o Location por ti
});
```

No Nexus, como o backend devolve JSON a um frontend, o redirecionamento costuma ser feito do lado do frontend. Os **códigos de estado**, esses, vais usá-los a toda a hora: `200`, `201`, `400`, `401`, `404` e `500` são o que o frontend lê para saber se o pedido correu bem.
