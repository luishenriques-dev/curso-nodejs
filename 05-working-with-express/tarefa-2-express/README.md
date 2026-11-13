# Tarefa 2: Time to Practice - Express.js

**Secção 5 — Working with Express.js**

> **Objetivo:** criar **do zero** uma aplicação Express com middlewares e duas rotas, sem copiar o código das aulas.

---

## O enunciado

1. **Criar um projeto npm** e instalar o **Express.js**. O nodemon é opcional.
2. **Dois middlewares em fila:** cada pedido passa por **dois middlewares** que escrevem alguma coisa no terminal, e **só um deles** envia a resposta.
3. **Duas rotas:** tratar os pedidos para **`/`** e para **`/users`**, de forma que **cada pedido seja tratado por um só middleware** (por exemplo, cada um envia uma resposta diferente).

---

## Como confirmar que está feito

| Parte | Teste |
|---|---|
| 1 | O `package.json` tem o Express nas dependências, e o servidor arranca com `npm start` |
| 2 | Ao abrir uma página, aparecem **duas mensagens** no terminal, e o browser recebe **uma** resposta |
| 3 | `/` e `/users` mostram respostas **diferentes**, e em cada pedido **só um** middleware de rota corre |

---

## Aulas usadas

| Parte | Aulas |
|---|---|
| 1. Projeto e Express | 42, 43, 59 |
| 2. Middlewares em fila (`next()`) | 60, 61 |
| 3. Rotas com `app.use('/caminho', ...)` e a ordem | 63 |

---

## O que aprendi ao fazê-la

- **`express()` com parênteses.** O pacote exporta uma **função**. Sem os `()`, a `app` é a própria função, e não a aplicação.
- **A forma de uma arrow function** é `() => { }`: primeiro os parênteses, depois a seta.
- **Texto leva aspas**, até dentro de um `console.log`: `console.log('http://localhost:3000')`.
- **A ordem dos middlewares decide tudo.** O `'/'` quer dizer "começa por `/`" e apanha **todos** os pedidos. Por isso, o `/users` tem de vir **antes** do `/`.
- **Um middleware que só escreve no terminal** tem de chamar **`next()`**, senão o pedido fica parado.

---

## Por fazer

- [x] Parte 2: um middleware no topo que escreve no terminal e deixa o pedido seguir, e um `console.log` em cada middleware de rota.
