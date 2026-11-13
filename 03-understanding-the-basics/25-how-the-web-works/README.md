# 25. How The Web Works

**Secção 3 — Understanding the Basics**

> **Em resumo:** o browser pede, o servidor responde. O Node.js é o código que corre no servidor e decide o que responder.

---

## A analogia: encomendar uma pizza 🍕

| Na Web | Na pizzaria |
|---|---|
| **Tu, no browser** | O cliente com fome |
| **O domínio** (`google.com`) | O nome da pizzaria |
| **O DNS** | A lista telefónica: dá-te o número a partir do nome |
| **O endereço IP** | O número de telefone verdadeiro |
| **O pedido (request)** | A chamada a fazer a encomenda |
| **O servidor com Node.js** | A cozinha, que recebe a encomenda e prepara-a |
| **A base de dados** | A despensa, onde a cozinha vai buscar os ingredientes |
| **A resposta (response)** | A pizza entregue à porta |

---

## O que acontece, passo a passo

1. Escreves um endereço no browser, por exemplo `google.com`.
2. O browser não sabe onde fica `google.com`. Pergunta ao **DNS**, que responde com o **endereço IP**, a morada real do servidor.
3. O browser envia um **pedido** para esse IP.
4. No servidor corre o **nosso código Node.js**. Ele recebe o pedido e faz o que for preciso: verificar os dados que enviaste, ir buscar informação à base de dados, etc.
5. O servidor envia uma **resposta** de volta ao browser.

```
Browser ──(1. "onde fica google.com?")──▶ DNS
Browser ── pedido ──▶ Servidor (Node.js) ◀──▶ Base de dados
Browser ◀── resposta ── Servidor (Node.js)
```

---

## O que vem dentro de um pedido e de uma resposta

Os pedidos e as respostas têm sempre duas partes:

- **O conteúdo (body):** o que se envia de facto. Numa resposta pode ser uma página HTML, um ficheiro, ou dados em JSON ou XML.
- **Os cabeçalhos (headers):** informação *sobre* o conteúdo, por exemplo "isto é uma página HTML" ou "isto é JSON".

> 📦 Pensa num **envelope**: o conteúdo é a carta lá dentro; os headers são o que está escrito por fora (remetente, destinatário, "frágil").

---

## HTTP e HTTPS

- **HTTP** é o conjunto de **regras** que o browser e o servidor seguem para se entenderem: como se escreve um pedido válido e como se devolve uma resposta. É como uma língua comum.
- **HTTPS** é o mesmo HTTP, mas com os dados **encriptados**. Se alguém intercetar a comunicação, só vê texto baralhado.

No curso vamos usar **HTTP** enquanto trabalhamos no nosso computador, e só no fim, ao pôr a aplicação online, ativamos o **HTTPS**.

---

## ✅ A reter

- O browser **pede**, o servidor **responde**.
- O **Node.js** é o código do lado do servidor. Podia ser PHP, ASP.NET ou Ruby on Rails, que fazem o mesmo papel.
- Na próxima aula (26): criar o primeiro servidor com Node.js.
