# 59. Installing Express.js

**Secção 5 — Working with Express.js**

> **Em resumo:** instala-se o Express com **`npm install --save express`**, importa-se com `require('express')` e cria-se a aplicação com **`const app = express()`**. Essa `app` é passada ao `createServer` no lugar da antiga função de rotas.

---

## O código desta aula

```javascript
// app.js
const http = require('http');

const express = require('express');

const app = express();

const server = http.createServer(app);

server.listen(3000);
```

O **`routes.js` desaparece**: o professor começa uma aplicação nova com o Express, e as rotas vão ser refeitas de outra forma nas próximas aulas.

---

## Passo 1: instalar o Express

Na pasta do projeto:

```bash
npm install --save express
```

**Porquê `--save` e não `--save-dev`?** (aula 43)

| | nodemon | Express |
|---|---|---|
| Para quê | Só **enquanto programas** | Faz **parte da aplicação**: sem ele, o servidor não funciona |
| No servidor real | Não é preciso | **Tem de lá estar** |
| Instala-se com | `--save-dev` | `--save` |
| Fica em | `devDependencies` | **`dependencies`** |

Depois de instalar, o `package.json` ganha a secção:

```json
"dependencies": {
  "express": "^4.x.x"
}
```

> 💡 Nas versões atuais do npm, o `--save` já é o comportamento por defeito: `npm install express` faz exatamente o mesmo. O professor escreve-o para ficar claro.

---

## Passo 2: importar

```javascript
const express = require('express');
```

É um **third-party module**: instalado **e** importado (aula 44). O `require` não leva `./`, tal como no `http`.

> 💡 **Arrumação:** o professor separa os `require` por **grupos**, com uma linha em branco entre cada um. Primeiro os core modules do Node (`http`), depois os pacotes de terceiros (`express`) e, no fim, os teus ficheiros (`./routes`). Não é obrigatório, mas ajuda a ver de onde vem cada coisa.

---

## Passo 3: criar a aplicação

```javascript
const app = express();
```

O pacote `express` exporta **uma função**. Ao executá-la, crias **a tua aplicação Express**: um objeto onde o Express guarda e gere muita coisa por trás.

> 💡 Para confirmares que é uma função: carrega em **Cmd** e clica em `express` no VS Code. Abre o código do pacote, e no fim vês que exporta uma função.

---

## Passo 4: passar a `app` ao servidor

```javascript
const server = http.createServer(app);
```

A `app` **é uma função que trata pedidos válida**, tal como o `requestHandler` da aula 38. Por isso pode ocupar o lugar dele no `createServer`.

---

## O que acontece se arrancares agora

`npm start` → o servidor arranca, mas **não responde a nada**, porque ainda não disseste à `app` o que fazer com os pedidos. Se abrires o browser, fica à espera.

Mesmo assim, o Express já preparou **uma forma própria de tratar os pedidos que chegam**. É o tema da próxima aula: o **middleware**.

---

## A analogia: contratar um gerente 🧑‍💼

Até agora, o `createServer` recebia **a tua função**, e eras tu a tratar de cada pedido do princípio ao fim.

Com o `express()`, **contratas um gerente** (a `app`) e entregas-lhe a porta do servidor. Ele ainda não sabe o que fazer, porque ainda não lhe deste instruções, mas já tem **um método de trabalho organizado**. Nas próximas aulas vais ensiná-lo.

---

## ✅ A reter

- **`npm install --save express`** → dependência de **produção** (`dependencies`).
- **`const express = require('express')`** → importar.
- **`const app = express()`** → criar a aplicação. O pacote exporta uma função.
- **`http.createServer(app)`** → a `app` faz de função que trata os pedidos.
- Sem instruções, a `app` **ainda não responde**. Próxima aula: o middleware.

---

## 🔗 Ligação ao Nexus

No arranque do backend do Nexus, o início é igual: `const app = express()`. A única diferença é que lá usa-se o `import` do TypeScript em vez do `require` (aula 38).