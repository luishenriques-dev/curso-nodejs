# 35. Understanding Event Driven Code Execution

**Secção 3 — Understanding the Basics**

> **Em resumo:** a ordem em que o código **corre** não é a ordem em que o **escreves**. Uma função passada a um event listener só corre **mais tarde**, quando o evento acontecer. Por isso, a resposta que depende dos dados tem de ir **para dentro** do listener, e o listener leva um **`return`** à frente.

---

## O código desta aula

O redirecionamento passa para **dentro** do `req.on('end', ...)`, e o `req.on('end', ...)` leva um **`return`**:

```javascript
if (url === '/message' && method === 'POST') {
  const body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });

  return req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split('=')[1];
    fs.writeFileSync('message.txt', message);
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  });
}
```

---

## A ideia central: registar ≠ executar

Quando o Node chega a esta linha:

```javascript
req.on('end', () => { ... });
```

**não executa** a função. Só a **regista**, ou seja, toma nota: *"quando o pedido acabar de chegar, corre isto"*. E segue **logo** para a linha seguinte, sem esperar.

O Node guarda internamente um **registo de eventos e listeners**. Quando um evento acontece (por exemplo, *"acabei de ler o pedido"*), vai a esse registo, vê que funções estão à espera desse evento e corre-as.

---

## A analogia: o temporizador do forno ⏲️

Estás a cozinhar e metes um bolo no forno:

1. Programas o temporizador: *"quando tocar, tira o bolo"* → **registas** o listener.
2. **Não ficas parado a olhar para o forno.** Vais lavar a loiça, pôr a mesa… → o Node **continua** para as linhas seguintes.
3. O temporizador toca → **o evento acontece**.
4. Só agora tiras o bolo → **a função corre**.

O problema desta aula é o mesmo de servires a sobremesa ao convidado **antes de o temporizador tocar**: o bolo ainda não está pronto.

---

## O erro que o professor mostra

Imagina que passas o redirecionamento para dentro do `'end'`, mas **sem** o `return` à frente do `req.on`:

```javascript
if (url === '/message' && method === 'POST') {
  ...
  req.on('end', () => {          // ← sem return
    ...
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  });
}

// resposta por defeito
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
...
res.end();
```

O que acontece, por ordem:

```
1. Entra no if do POST /message
2. Regista o listener 'data'          ← não corre ainda
3. Regista o listener 'end'           ← não corre ainda
4. Sai do if (nada o impede!)
5. Corre a resposta por defeito       → envia "Hello from my Node.js Server!"
   ... mais tarde ...
6. O pedido acaba de chegar → corre o 'end'
7. Tenta definir o 302 e o Location   → 💥 ERRO
```

O erro no terminal é:

```
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
```

*"Não podes definir headers depois de a resposta ter sido enviada."* A resposta por defeito já tinha saído no passo 5.

No browser também se nota: **não há redirecionamento (302)**, aparece a página *"Hello…"*.

> 💡 **O `return res.end()` dentro do listener não resolve isto.** Esse `return` sai **da função do listener**, não da função do `createServer`. E quando corre, já é tarde de mais.

---

## A correção: `return req.on(...)`

```javascript
return req.on('end', () => { ... });
```

O `return` à frente do `req.on` faz **sair da função do `createServer`** logo depois de registar o listener. Assim, a resposta por defeito **nunca corre** para este pedido.

A ordem passa a ser:

```
1. Entra no if do POST /message
2. Regista o listener 'data'
3. Regista o listener 'end' e SAI da função (return)
   ... mais tarde ...
4. O pedido acaba de chegar → corre o 'end'
5. Grava o ficheiro, define o 302 e o Location, envia a resposta ✅
```

---

## Duas consequências a reter

1. **Enviar a resposta não "mata" os listeners.** Mesmo depois de a resposta ter saído, os listeners registados continuam ativos e correm quando o evento acontecer.
2. **Se a resposta depende de algo que acontece num listener, tem de ir para dentro desse listener.** Caso contrário, é enviada antes de esse algo acontecer.

---

## Porque é que o Node funciona assim

Se o Node **parasse e esperasse** em cada `req.on(...)` até os dados chegarem, durante essa espera **não podia atender mais ninguém**. Com milhares de pedidos ao mesmo tempo, o servidor ficava lentíssimo.

Assim, o Node **nunca bloqueia**: regista o que tem de fazer, continua, e volta ao **event loop** (aula 27) à espera do próximo evento. Este padrão, em que passas uma função para ser chamada mais tarde, chama-se código **assíncrono**. Vais encontrá-lo em todo o curso, e o professor avisa sempre que acontecer.

> ⚠️ **Nem toda a função passada a outra corre mais tarde.** Mas num event listener (`req.on`, `createServer`) é sempre assim.

---

## ✅ A reter

- **Registar não é executar.** `req.on(evento, função)` só **guarda** a função para mais tarde, e o Node continua logo para a linha seguinte.
- O que **depende** dos dados do pedido, **incluindo a resposta**, vai **dentro** do listener `'end'`.
- **`return req.on('end', ...)`** impede que o código abaixo corra e envie outra resposta.
- O erro **`Cannot set headers after they are sent`** quer dizer que tentaste responder **duas vezes**.
- O Node funciona assim para **nunca bloquear** e poder atender muitos pedidos ao mesmo tempo.
- Próxima aula: o `writeFileSync` também bloqueia, e há uma forma melhor de gravar o ficheiro.

---

## 🔗 Ligação ao Nexus

O erro `Cannot set headers after they are sent` também aparece em Express, e é dos mais comuns. Acontece quando, numa rota, se chama `res.json()` ou `res.send()` duas vezes. Por exemplo, ao esquecer um `return` depois de responder com um erro:

```javascript
app.post('/tarefas', (req, res) => {
  if (!req.body.titulo) {
    res.status(400).json({ erro: 'Falta o título' });   // ❌ sem return
  }
  res.status(201).json({ ok: true });   // corre na mesma → erro
});
```

A correção é a mesma desta aula: **`return res.status(400).json(...)`**.

No Nexus, em vez de listeners com `req.on`, vais usar sobretudo **`async`/`await`**, que é uma forma mais legível de escrever código assíncrono. A ideia por baixo é a mesma.
