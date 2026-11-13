# 57. Module Introduction

**Secção 5 — Working with Express.js**

> **Em resumo:** com o Node sozinho é preciso muito código para coisas básicas, como ler o body de um pedido ou ter rotas diferentes. O **Express.js** é um **framework** (um pacote de terceiros) que trata desse trabalho repetitivo, para te poderes concentrar no que a tua aplicação faz.

---

## Porquê o Express

Na secção 3 viste quanto trabalho dá, só com o Node:

- **ler o body** de um pedido: `req.on('data')`, `req.on('end')`, `Buffer`…
- **routing**: um `if` para cada `url` e cada `method`…
- **escrever HTML** linha a linha com `res.write()`.

Não é isto que queremos fazer em cada projeto. Queremos escrever a **lógica da aplicação**, aquilo que a torna diferente das outras. O Express dá-nos **regras e funções prontas** para o resto, e o código fica mais limpo.

---

## O que se vai aprender nesta secção

1. **O que é o Express.js**, com mais detalhe.
2. **Middleware**: o conceito central em que o Express assenta.
3. **Requests e responses** de forma mais simples do que na secção 3.
4. **Routing**: código diferente para cada caminho, **sem uma série de `if`**.
5. **Devolver páginas HTML** a partir de ficheiros, em vez de as escrever no código com `res.write()`.