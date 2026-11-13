# 58. What is Express.js?

**Secção 5 — Working with Express.js**

> **Em resumo:** o Express.js é um **framework** para Node.js. Trata do trabalho repetitivo do servidor, para te concentrares na lógica da tua aplicação. É **o mais popular** porque é **flexível** e tem milhares de pacotes feitos para ele.

---

## Porque é que precisamos dele

Lembra-te do que foi preciso, só com o Node, para **ler o body** de um pedido (aula 34):

```javascript
const body = [];
req.on('data', (chunk) => body.push(chunk));
req.on('end', () => {
  const parsedBody = Buffer.concat(body).toString();
  ...
});
```

E isto só funcionava para **um tipo de dados**: texto de um formulário. Para um ficheiro ou para JSON, era preciso escrever outra lógica.

O objetivo é **não reescrever isto em cada projeto** e passar o tempo no que torna a tua aplicação única.

> 💡 O próprio Express **também não lê o body sozinho**. Mas facilita muito ligar-lhe outro pacote que o faz por ti. Vem nas próximas aulas.

---

## O que é um framework

Um **framework** é:

- um conjunto de **funções prontas** para tarefas comuns;
- **regras e uma estrutura** sobre como organizar o código.

### A analogia: construir uma casa 🏗️

| Sem framework (Node puro) | Com framework (Express) |
|---|---|
| Fabricas os tijolos, cortas a madeira, fazes as janelas | Já tens **as peças pré-feitas** e uma **planta** a seguir |
| Fazes tudo, mas demora e é fácil errar | Concentras-te no **que torna a casa tua**: a disposição, as cores, os detalhes |

---

## Alternativas ao Express

| Opção | Nota |
|---|---|
| **Node puro** ("vanilla") | O que fizeste até agora. Funciona, mas é preciso escrever tudo |
| **Adonis.js** | Inspirado no Laravel (do PHP) |
| **Koa** | Mais minimalista |
| **Sails.js** | Mais completo, com mais coisas já incluídas |
| **Express.js** | **De longe o mais usado.** É o que o curso ensina |

---

## A grande vantagem do Express

- **Traz pouco de origem**, mas dá-te **uma forma clara de trabalhar** com os pedidos.
- Por isso é **muito fácil de estender**: há **milhares de pacotes** feitos para o Express que lhe acrescentas com pouca configuração (ler o body, sessions, segurança, uploads…).

---

## ✅ A reter

- **Express.js** = framework para Node que trata do **trabalho repetitivo** do servidor.
- **Framework** = funções prontas + **regras** de como estruturar o código.
- É o **mais popular**: flexível e com **milhares de pacotes** que se ligam facilmente.
- Próxima aula: instalar o Express.

---

## 🔗 Ligação ao Nexus

O backend do Nexus usa o Express. Tudo o que aprenderes nesta secção (rotas, middleware, `req` e `res`) é exatamente o que lá está. Mais à frente no teu plano de estudo aparece o **Nest**, que é um framework construído **por cima do Express**, com ainda mais estrutura e regras.