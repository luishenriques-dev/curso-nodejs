# 52. Restarting the Debugger Automatically After Editing our App

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** por defeito, o debugger **não reinicia** quando alteras o código. Com um ficheiro de configuração (`.vscode/launch.json`), o debugger passa a usar o **nodemon** e reinicia sozinho.

O professor diz no fim que, no resto do curso, vai usar sobretudo o **`npm start`** e só liga o debugger quando houver um erro a investigar. Esta configuração é **opcional**.

---

## O problema

Com o `npm start`, o **nodemon** reinicia o servidor a cada alteração (aula 45). Mas o debugger arranca o servidor com `node`, e não com `nodemon`. Por isso, se alterares o código com o debug ligado, **o debugger continua com a versão antiga**, e tens de o reiniciar à mão.

---

## A solução: o `launch.json`

No VS Code: **Run → Add Configuration… → Node.js**. É criada uma pasta **`.vscode`** com o ficheiro **`launch.json`**, onde configuras como o debugger arranca.

A configuração do professor, adaptada a este repositório:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug com nodemon",
      "program": "${fileDirname}/app.js",
      "runtimeExecutable": "nodemon",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

| Opção | O que faz |
|---|---|
| `"program"` | **Que ficheiro arranca.** O professor usa `${workspaceFolder}/app.js`. Como aqui há um `app.js` **em cada aula**, uso `${fileDirname}/app.js`: o `app.js` **da pasta do ficheiro que tens aberto**. Podes estar no `routes.js` e carregar em F5, que ele arranca o `app.js` certo |
| `"runtimeExecutable": "nodemon"` | Arranca com o **nodemon** em vez do `node` |
| `"restart": true` | **Reinicia o debugger** quando o nodemon reinicia o servidor |
| `"console": "integratedTerminal"` | O output aparece no **terminal**, e não na Debug Console. É preciso para poderes parar o nodemon com **Ctrl + C** |

---

## O nodemon tem de estar instalado globalmente

O debugger **procura o nodemon no computador**, e não no projeto. O nodemon local, da aula 43, não chega. Instala-o globalmente:

```bash
npm install -g nodemon
```

> ⚠️ No vídeo, o professor diz que no Mac pode ser preciso **`sudo`** à frente. **No teu Mac não é**: instalaste o Node com o **nvm**, e com o nvm os pacotes globais instalam-se sem `sudo`. Usar `sudo` com o nvm até pode causar problemas de permissões.

---

## Duas coisas a saber

- **São dois processos:** o debugger e o nodemon. Quando paras o debugger (⏹️), o nodemon **continua a correr** no terminal. Pára-o com **Ctrl + C**.
- **A Debug Console continua a funcionar** para testares código (aula 51), mesmo com o output no terminal.

---

## ✅ A reter

- O **`launch.json`** (na pasta `.vscode`) configura o debugger.
- `"runtimeExecutable": "nodemon"` + `"restart": true` → o debugger reinicia sozinho.
- O nodemon tem de estar **instalado globalmente**: `npm install -g nodemon`, **sem `sudo`** com o nvm.
- Ao parar o debugger, pára também o nodemon com **Ctrl + C** no terminal.
- É **opcional**: no dia a dia, o `npm start` chega.