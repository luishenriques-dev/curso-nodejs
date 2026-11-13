# 46. Global & Local npm Packages

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** um pacote **local** fica só no projeto, na `node_modules`. Um pacote **global** (`-g`) fica no computador e usa-se em qualquer pasta, diretamente no terminal.

Esta aula é só texto: explica melhor o que viste na aula 45.

---

## Local vs global

| | **Local** | **Global** |
|---|---|---|
| Como instalar | `npm install nodemon --save-dev` | `npm install -g nodemon` |
| Onde fica | Na `node_modules` **do projeto** | No **computador** |
| Fica registado no `package.json`? | ✅ Sim | ❌ Não |
| Funciona com `npm start`? | ✅ Sim | ✅ Sim |
| Funciona escrevendo `nodemon app.js` no terminal? | ❌ Não | ✅ Sim, em qualquer pasta |

---

## A vantagem dos pacotes locais

Como ficam registados no `package.json`, **não precisas de partilhar a `node_modules`**:

1. Partilhas só o código: os teus ficheiros, o `package.json` e o `package-lock.json`.
2. Quem recebe o projeto corre **`npm install`**.
3. O npm lê o `package.json` e **recria a `node_modules`** com tudo o que o projeto precisa.

O projeto partilhado fica **muito mais pequeno**. É exatamente o que já fazes com o GitHub entre o Mac e o Codespaces.

> 💡 **Os ficheiros do professor também vêm assim.** Quando descarregares o código anexo a uma aula (como o zip da secção 15), corre **`npm install`** dentro da pasta antes de o tentares correr.

---

## E o global?

Se quiseres escrever `nodemon app.js` diretamente no terminal, em qualquer pasta, podes instalá-lo globalmente:

```bash
npm install -g nodemon
```

O **`-g`** quer dizer *global*.

**Não é necessário.** Com o nodemon local e o script `start`, o `npm start` funciona na mesma. E o local tem uma vantagem: quem pegar no projeto **não tem de instalar nada à parte**, porque o `npm install` trata de tudo.

---

## ✅ A reter

- **Local** = no projeto, registado no `package.json`, usado através dos scripts (`npm start`).
- **Global** (`-g`) = no computador, usado diretamente no terminal, em qualquer pasta.
- Partilha-se **sem a `node_modules`**, e quem recebe corre **`npm install`**.
- Prefere **local**: o projeto fica completo e funciona em qualquer computador.
