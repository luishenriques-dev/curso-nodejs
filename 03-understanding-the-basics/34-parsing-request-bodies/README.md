# 34. Parsing Request Bodies

**Secção 3 — Understanding the Basics**

> **Em resumo:** os dados de um request não chegam todos de uma vez. Chegam **aos pedaços** (um **stream**). Juntamos os pedaços num **Buffer**, convertemo-lo em texto e só então lemos a mensagem.

---

## O código desta aula

Só muda o segundo `if`, o do `POST /message`:

```javascript
if (url === '/message' && method === 'POST') {
  const body = [];

  req.on('data', (chunk) => {
    console.log(chunk);
    body.push(chunk);
  });

  req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    console.log(parsedBody);
    const message = parsedBody.split('=')[1];
    fs.writeFileSync('message.txt', message);
  });

  res.statusCode = 302;
  res.setHeader('Location', '/');
  return res.end();
}
```

Escreve algo no formulário, clica em *Send* e abre o `message.txt`: lá está o que escreveste.

---

## O problema: não existe `req.body`

Seria de esperar algo como `req.body` com a mensagem lá dentro, como há `req.url` e `req.method`. **Não existe.** No Node puro, o conteúdo do pedido tem de ser lido à mão.

Porquê? Porque o Node **não sabe de antemão o tamanho de um pedido**. Pode ser uma palavra num formulário ou um vídeo de 2 GB. Por isso recebe sempre tudo da mesma forma: **aos pedaços**.

---

## As duas ideias novas

### Stream: os dados chegam aos pedaços 🚚

Um **stream** é um fluxo de dados que vai chegando aos poucos, em pedaços chamados **chunks**.

Imagina uma mudança de casa: as caixas não chegam todas de uma vez, vêm em várias viagens da carrinha. Podes começar a arrumar as primeiras sem esperar pelas últimas.

Para uma mensagem curta não faz diferença: chega tudo num só pedaço. Mas num **upload de um ficheiro grande** permite ao servidor começar a gravá-lo no disco **enquanto ainda está a chegar**.

### Buffer: o sítio onde se juntam os pedaços 🚏

Com os pedaços soltos não se consegue trabalhar diretamente. O **Buffer** é um espaço de memória onde **se juntam os pedaços** para os podermos usar.

O professor compara-o a uma **paragem de autocarro**: os autocarros (os dados) estão sempre a circular, mas só quando param na paragem é que as pessoas conseguem entrar e sair.

---

## Passo a passo

### 1. Um array para guardar os pedaços

```javascript
const body = [];
```

> 💡 **Um `const` que muda?** O `const` impede que **atribuas um valor novo** à variável (`body = outraCoisa` dá erro). Mas não impede que **mudes o conteúdo** do array com `push`. A "caixa" é sempre a mesma, só lhe vais pondo coisas dentro.

---

### 2. `req.on('data', ...)`: ouvir cada pedaço que chega

```javascript
req.on('data', (chunk) => {
  body.push(chunk);
});
```

O `req.on(evento, função)` regista um **event listener**: *"quando acontecer este evento, corre esta função"*. É o mesmo padrão do `createServer` (aula 27), mas agora és tu a registá-lo.

- O evento **`'data'`** dispara **sempre que chega um pedaço**.
- A função recebe esse pedaço (`chunk`) e guarda-o no array.

Se fizeres `console.log(chunk)`, vês algo assim:

```
<Buffer 6d 65 73 73 61 67 65 3d 68 65 6c 6c 6f>
```

São os dados em bruto, em bytes. Ainda não dá para ler.

---

### 3. `req.on('end', ...)`: quando chegaram todos

```javascript
req.on('end', () => {
  const parsedBody = Buffer.concat(body).toString();
  ...
});
```

O evento **`'end'`** dispara **uma vez**, quando o pedido acabou de chegar. Aí:

- **`Buffer.concat(body)`** junta todos os pedaços num só Buffer. O `Buffer` é um objeto global do Node: não precisas de o importar.
- **`.toString()`** converte esse Buffer em texto.

O `parsedBody` passa a ser algo como:

```
message=hello
```

> 💡 O `.toString()` só funciona aqui porque **sabemos que o conteúdo é texto**. Se fosse um ficheiro (uma imagem, por exemplo), teria de ser tratado de outra forma.

---

### 4. Tirar a mensagem do texto

O formulário envia os campos como pares **`nome=valor`**. O nome é o `name` do input (`message`) e o valor é o que escreveste.

```javascript
const message = parsedBody.split('=')[1];
```

| Passo | Resultado |
|---|---|
| `parsedBody` | `'message=hello'` |
| `.split('=')` | `['message', 'hello']`: corta o texto no `=` e dá um array |
| `[1]` | `'hello'`: o segundo elemento, o que está à direita do `=` |

> 💡 Os arrays começam no **índice 0**. Por isso `[0]` é `'message'` e `[1]` é `'hello'`.

---

### 5. Gravar o ficheiro **dentro** do `'end'`

```javascript
req.on('end', () => {
  ...
  fs.writeFileSync('message.txt', message);
});
```

O `writeFileSync` saiu de fora e foi para **dentro** do listener `'end'`. Isto é importante.

O `req.on(...)` **não fica à espera** que os dados cheguem. Só **regista** a função para ser executada mais tarde e o Node **continua logo** para a linha seguinte. Se o `writeFileSync` ficasse fora, corria **antes** de a mensagem existir.

A ordem em que as coisas acontecem:

```
1. regista o listener 'data'   ← não corre ainda
2. regista o listener 'end'    ← não corre ainda
3. define o 302 e o Location
4. res.end()                   ← a resposta é enviada
   ... mais tarde ...
5. chegam os pedaços → corre o 'data'
6. acabou de chegar  → corre o 'end' → grava o ficheiro
```

> ⚠️ **Regra:** tudo o que **depende dos dados** do pedido tem de estar **dentro** do listener `'end'`.

---

## Um pormenor: caracteres especiais

Se escreveres `hello!`, o ficheiro fica com `hello%21`. E os espaços aparecem como `+`.

O formulário **codifica** alguns caracteres para os poder enviar com segurança. O professor diz para não nos preocuparmos com isto por agora: o Express trata disso mais tarde.

---

## ✅ A reter

- Não existe `req.body` no Node puro: o conteúdo chega como **stream**, aos pedaços (**chunks**).
- **`req.on('data', ...)`** → guarda cada pedaço.
- **`req.on('end', ...)`** → junta os pedaços com **`Buffer.concat(...)`** e converte com **`.toString()`**.
- O formulário envia os dados como **`nome=valor`**. `split('=')[1]` tira o valor.
- Um listener **regista código para mais tarde**: o que depende dos dados vai **dentro** do `'end'`.
- Próxima aula: perceber melhor esta ordem de execução dos event listeners.

---

## 🔗 Ligação ao Nexus

No Express nunca escreves isto à mão. Uma linha no arranque do servidor faz todo este trabalho:

```javascript
app.use(express.json());                          // para pedidos com JSON
app.use(express.urlencoded({ extended: false })); // para formulários HTML
```

A partir daí, o que o utilizador enviou aparece já pronto em **`req.body`**:

```javascript
app.post('/message', (req, res) => {
  console.log(req.body.message);   // 'hello', já sem split nem Buffer
});
```

O `express.json()` está no backend do Nexus precisamente para isto.
