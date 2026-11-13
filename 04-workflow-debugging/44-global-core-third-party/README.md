# 44. Global Features vs Core Modules vs Third-Party Modules

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** em Node há três tipos de funcionalidades. As **globais** usam-se logo. Os **core modules** só precisam de ser **importados**. Os **third-party modules** têm de ser **instalados e importados**.

Esta aula é só texto: arruma numa tabela o que já usaste nas aulas anteriores.

---

## Os três tipos

| Tipo | Exemplos | Instalar? | Importar? |
|---|---|---|---|
| **Global features** | `const`, `function`, `console`, `process`, `Buffer` | ❌ Não | ❌ Não |
| **Core modules** | `fs`, `http`, `path` | ❌ Não, vêm com o Node | ✅ Sim |
| **Third-party modules** | `nodemon`, `express`, `express-session` | ✅ Sim, com `npm install` | ✅ Sim |

---

## Cada um, com exemplos que já usaste

### 1. Global features: usam-se logo

Palavras do JavaScript (`const`, `function`, `return`, `if`) e alguns objetos que o Node disponibiliza em qualquer ficheiro:

```javascript
console.log('olá');          // global
process.exit();              // global (aula 27)
Buffer.concat(body);         // global (aula 34)
```

Nada de `require`.

### 2. Core modules: só importar

Vêm instalados com o Node, mas **não estão disponíveis até os importares**:

```javascript
const http = require('http');   // aula 26
const fs = require('fs');       // aula 33
```

Nada de `npm install`.

### 3. Third-party modules: instalar **e** importar

Código feito por outras pessoas. Primeiro **instalas**, na pasta do projeto:

```bash
npm install --save express-session
```

E depois **importas** no código:

```javascript
const session = require('express-session');
```

O `require` é igual ao dos core modules: **sem `./`**. O Node procura primeiro nos core modules e, se não encontrar, vai à pasta `node_modules` do projeto.

> 💡 O **nodemon** (aula 43) é third-party, mas é uma exceção: **não** se importa no código. É uma ferramenta que corres no terminal para arrancar o servidor (aula 45).

---

## A analogia: a cozinha 🍳

| Tipo | Na cozinha |
|---|---|
| **Global** | O **sal e a água da torneira**: estão sempre à mão |
| **Core module** | Os **utensílios na gaveta**: já estão em casa, mas tens de os tirar da gaveta (`require`) |
| **Third-party** | Um **ingrediente especial**: tens de o **comprar** primeiro (`npm install`) e depois tirá-lo do armário (`require`) |

---

## ✅ A reter

- **Global** → usa logo.
- **Core module** → `require('nome')`.
- **Third-party** → `npm install nome` **e** `require('nome')`.
- Os teus ficheiros → `require('./nome')`, **com `./`** (aula 38).
