# 49. Dealing with Runtime Errors

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** um erro de execução só aparece **quando a linha estragada corre**. O servidor arranca bem e rebenta mais tarde. A mensagem de erro **diz-te o que se passou e onde**, mas tens de a **saber ler**: começa pelo **topo**, e depois procura a primeira linha com **um ficheiro teu**.

---

## O exemplo da aula: o `return` esquecido

No `routes.js`, o professor tira o `return` da frente de um `res.end()`:

```javascript
if (url === '/') {
  res.setHeader('Content-Type', 'text/html');
  res.write('...');
  res.end();          // ← sem return: o código continua para baixo
}

res.setHeader('Content-Type', 'text/html');   // ← linha 32: rebenta aqui
```

- **Não é um erro de sintaxe**: o código está bem escrito, e o `npm start` arranca sem queixas.
- **Só quando abres a página** é que a linha 32 corre e o servidor rebenta.

É o erro que já conheces das aulas 35 e 36.

---

## Como ler a mensagem de erro

A mensagem parece um bloco enorme e assustador, mas tem uma ordem. **Lê-a de cima para baixo**:

```
node:_http_outgoing:652
    throw new ERR_HTTP_HEADERS_SENT('set');
    ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client   ← 1
    at ServerResponse.setHeader (node:_http_outgoing:652:11)                          ← 2
    at Server.requestHandler (/.../routes.js:32:7)                                    ← 3
    at Server.emit (node:events:509:28)                                               ← 4
    at parserOnIncoming (node:_http_server:1268:12)
```

| | O que é | O que te diz |
|---|---|---|
| **1** | **O código e a mensagem** do erro | **O que** correu mal: tentaste definir headers depois de a resposta ter sido enviada |
| **2** | O sítio **dentro do Node** onde rebentou | Que função falhou (`setHeader`). Linhas começadas por `node:` são código do Node, e o número delas não te ajuda |
| **3** | **A primeira linha com um ficheiro teu** | **Onde**: `routes.js`, **linha 32**, coluna 7. É aqui que vais |
| **4** | O resto, para baixo | Código interno do Node. Normalmente podes ignorar |

> 💡 O professor deixa um conselho: **não copies a mensagem de erro para perguntar a alguém sem a ler primeiro.** Muitas mensagens já dizem o que precisas, e só tens de saber onde olhar.

---

## Do erro à correção

1. **Lê a mensagem**: *"Cannot set headers after they are sent"*. Já estou a responder outra vez a algo que já tinha terminado.
2. **Vai à linha**: `routes.js:32` → é um `res.setHeader`.
3. **Pensa para trás**: se a resposta já foi enviada antes desta linha, onde é que foi? Olha para o código **acima** da linha 32.
4. **Encontra a causa**: o `res.end()` dentro do `if`, **sem `return`**, deixa o código continuar para a linha 32.
5. **Corrige**: põe o `return` à frente do `res.end()`.

Com o **nodemon**, guardas e o servidor reinicia sozinho. Recarregas a página, e funciona.

---

## Erros de execução que já viste

| Mensagem | Quando aconteceu | Causa |
|---|---|---|
| `Cannot set headers after they are sent` | Aulas 35 e 36 | Responder duas vezes |
| `The argument 'encoding' is invalid` | Aula 34, com dois campos | O `writeFileSync` recebeu um valor errado no 3.º argumento |
| `The "chunk" argument must be of type string ... Received type number (NaN)` | Tarefa 1 | Aspas dentro de aspas: o `write` recebeu `NaN` |
| `EPERM: process.cwd failed` | Aula 43 | O terminal estava numa pasta que tinha sido apagada |

Em todas, a primeira linha da mensagem já te dizia **o que** se passava.

---

## ✅ A reter

- Erro de execução = código **bem escrito** que **rebenta quando a linha corre**.
- O servidor **arranca bem**, e só rebenta mais tarde.
- **Ler a mensagem:**
  1. **Topo** → o código e a mensagem: **o que** correu mal.
  2. **Primeira linha com um ficheiro teu** → **onde**: ficheiro e linha.
  3. As linhas começadas por `node:` são internas do Node.
- A causa costuma estar **antes** da linha indicada.