# Tarefa 1: Time to Practice - The Basics

**Secção 3 — Understanding the Basics**

> **Objetivo:** juntar tudo o que se aprendeu na secção 3 num servidor feito **de raiz**, sem copiar o código das aulas.

---

## O enunciado

1. Arrancar um servidor Node.js na **porta 3000**.
2. Tratar duas rotas:
   - **`/`** → um texto de boas-vindas;
   - **`/users`** → uma lista de utilizadores inventados, em HTML (`<ul><li>User 1</li></ul>`).
3. Na página **`/`**, um **formulário** com um campo `username` que, ao clicar no botão, envia um pedido **`POST`** para **`/create-user`**.
4. A rota **`/create-user`** lê o `username` enviado e mostra-o no **terminal** com `console.log`.

---

## Aulas usadas em cada passo

| Passo | Aulas |
|---|---|
| 1. Servidor na porta 3000 | 26 |
| 2. Rotas `/` e `/users` | 30, 32 |
| 3. Formulário com `POST` | 32 |
| 4. Ler o `username` e responder | 33, 34, 35 |

---

## O que aprendi ao fazê-la

- **Aspas dentro de aspas partem o texto.** `'...URL '/' ...'` foi lido como texto ÷ texto, e deu `NaN`. Dentro de `'...'` usa-se `"..."`.
- **O `action` do formulário e o `if` têm de bater certo.** Se o formulário envia para `/create-user`, o `if` tem de verificar `/create-user`.
- **Registar ≠ executar.** O `console.log` escrito depois do `req.on('data', ...)` apareceu **antes** dos dados no terminal.
- **O servidor não se lembra de nada entre pedidos.** Uma variável criada no pedido `POST /create-user` já não existe no pedido `GET /users`. Para guardar dados entre pedidos é preciso um ficheiro ou uma base de dados.
- **Para pôr o valor de uma variável dentro de um texto**, usa-se a crase e `${ }`: `` `<li>${username}</li>` ``.

---

## Por fazer

- [ ] Reescrever de memória o bloco do `/create-user` (o `req.on('data')` e o `req.on('end')`).
- [ ] Acrescentar uma saudação (`<h1>`) na página `/`.