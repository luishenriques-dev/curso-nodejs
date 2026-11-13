# 36. Blocking and Non-Blocking Code

**Secção 3 — Understanding the Basics**

> **Em resumo:** o `writeFileSync` **bloqueia** o servidor enquanto grava o ficheiro. O `writeFile` (sem `Sync`) **não bloqueia**: pede ao sistema operativo para gravar e só volta quando estiver feito, através de uma função (**callback**).

---

## O código desta aula

Dentro do `'end'`, o `writeFileSync` passa a `writeFile`, e a resposta vai para **dentro** do callback dele:

```javascript
return req.on('end', () => {
  const parsedBody = Buffer.concat(body).toString();
  const message = parsedBody.split('=')[1];
  fs.writeFile('message.txt', message, (err) => {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  });
});
```

---

## O problema do `Sync`

**Sync** vem de *síncrono*: o Node **fica parado** nessa linha até o ficheiro estar gravado. Durante esse tempo, **não faz mais nada**, nem atende outros pedidos.

Com uma palavra como `hello` não se nota, porque demora milésimos de segundo. Mas com um ficheiro de centenas de MB, o servidor ficava **congelado** para todos os utilizadores até acabar.

---

## A analogia: a fotocopiadora 🖨️

Uma repartição com **um só funcionário** (o Node, que é single-threaded) e uma fila de pessoas:

| | `writeFileSync` (bloqueia) | `writeFile` (não bloqueia) |
|---|---|---|
| Alguém pede 500 cópias | O funcionário **fica ao lado da fotocopiadora** até acabar | **Põe a fotocopiadora a trabalhar** e volta ao balcão |
| A fila | **Parada** | Continua a ser atendida |
| Quando as cópias acabam | Já estava lá | A fotocopiadora **apita** e ele vai entregá-las |

O "apito" é o **callback**: a função que o Node corre quando o trabalho termina.

---

## O `writeFile` e o seu callback

```javascript
fs.writeFile('message.txt', message, (err) => {
  // corre QUANDO o ficheiro acabar de ser gravado
});
```

Recebe três valores:

1. o **nome do ficheiro**;
2. o **conteúdo**;
3. uma **função** que o Node corre quando a gravação terminar.

A função recebe um **`err`** (erro):

- se correu bem, o `err` é **`null`**;
- se correu mal (por exemplo, falta de permissões para escrever na pasta), o `err` tem a informação do erro, e podes responder ao utilizador com uma mensagem de erro em vez do redirecionamento.

O professor não trata o erro por agora. O tratamento de erros vem mais à frente no curso.

> 💡 Já viste este padrão: no `createServer` e no `req.on` também passas uma função para o Node correr mais tarde. É o mesmo princípio: *"faz isto e avisa-me quando acabares"*.

---

## Porque é que a resposta vai para dentro do callback

O redirecionamento só deve acontecer **depois** de o ficheiro estar gravado. É a mesma regra da aula 35: **o que depende de uma operação vai dentro do callback dessa operação.**

Ficam assim duas funções, uma dentro da outra:

```
req.on('end', ...)              ← corre quando o pedido acaba de chegar
   └── fs.writeFile(..., ...)   ← corre quando o ficheiro acaba de ser gravado
          └── res.end()         ← só então responde ao browser
```

É normal em Node ter callbacks dentro de callbacks.

---

## Porque é que o Node é rápido

O Node **nunca fica à espera**. Passa as tarefas pesadas (gravar ficheiros, ler da rede) ao **sistema operativo**, que as faz em paralelo, e volta logo ao **event loop** (aula 27) para atender outros pedidos. Quando a tarefa acaba, o sistema operativo avisa e o Node corre o callback.

O que o Node faz diretamente são só coisas rapidíssimas, como definir uns headers e enviar a resposta.

---

## ✅ A reter

- **Sync = bloqueia.** O servidor fica parado até a operação acabar. Evita num servidor.
- **Sem Sync = não bloqueia.** O Node pede a tarefa ao sistema operativo e continua.
- `fs.writeFile(ficheiro, conteúdo, (err) => { ... })`: o callback corre **quando a gravação termina**. O `err` é `null` se correu tudo bem.
- O que depende da operação, como a resposta, vai **dentro do callback**.
- Fim da secção 3: daqui para a frente, o Express vai esconder muito deste código.

---

## 🔗 Ligação ao Nexus

No Nexus vais escrever o mesmo, mas com **`async`/`await`**, que lê-se de cima para baixo como código normal e **não bloqueia**:

```javascript
const fs = require('fs/promises');

app.post('/message', async (req, res) => {
  await fs.writeFile('message.txt', req.body.message);  // espera sem bloquear
  res.redirect('/');
});
```

O `await` "espera" pelo ficheiro **só dentro desta função**. Entretanto, o resto do servidor continua a atender outros pedidos. A regra também se mantém no Nexus: **nada de `...Sync` dentro de rotas.**
