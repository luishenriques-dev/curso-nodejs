# 55. Wrap Up

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** fim da secção 4. Duas partes: o **npm** (configurar o projeto, scripts e pacotes de terceiros) e os **erros** (os três tipos e como os encontrar, incluindo o debugger).

---

## Parte 1: o npm

| Tema | Ideia principal | Aulas |
|---|---|---|
| **`npm init`** | Cria o **`package.json`**, a ficha do projeto | 42 |
| **Scripts** | Atalhos para comandos. `npm start` para o `start`, `npm run nome` para os outros | 42 |
| **Pacotes de terceiros** | `npm install nome`. Ficam na `node_modules`, registados no `package.json` | 43 |
| **Tipos de dependências** | `--save-dev` (desenvolvimento), sem nada (produção), `-g` (global) | 43, 46 |
| **Global vs core vs third-party** | Global: usa logo. Core: `require`. Third-party: `npm install` **e** `require` | 44 |
| **nodemon** | Reinicia o servidor sozinho quando guardas | 45 |

---

## Parte 2: os erros

| Tipo | Como se reconhece | Como se encontra | Aulas |
|---|---|---|---|
| **Sintaxe** | O Node **não arranca**: `SyntaxError` | Ir à linha indicada e procurar **para trás** | 47, 48 |
| **Execução** | Arranca, mas **rebenta quando a linha corre** | Ler a mensagem: **topo** (o quê) e **primeira linha com um ficheiro teu** (onde) | 47, 49 |
| **Lógico** | **Sem mensagem**: o resultado está errado | `console.log` ou **debugger** | 47, 50 |

---

## O debugger, em três ideias

1. **Breakpoint** (o ponto vermelho) → o código **pára** nessa linha.
2. Com o código parado → **vês as variáveis** (passando o rato ou no painel Variables), **testas código** na Debug Console e podes **alterar valores**.
3. Para analisar um **callback**, o breakpoint tem de estar **dentro dele**, porque o Node não corre linha a linha.

---

## 🧠 Testa-te

<details>
<summary>Qual a diferença entre <code>npm start</code> e <code>npm run start-server</code>?</summary>

O `start` é um nome especial e corre sem `run`. Qualquer outro script precisa de `npm run`.
</details>

<details>
<summary>Porque é que a <code>node_modules</code> não vai para o Git?</summary>

Porque é enorme e pode ser recriada com `npm install`, a partir do `package.json` e do `package-lock.json`.
</details>

<details>
<summary>Porque é que <code>nodemon app.js</code> no terminal dá "command not found", mas <code>npm start</code> funciona?</summary>

O nodemon foi instalado localmente, no projeto. O terminal só procura pacotes globais, enquanto o npm procura primeiro na `node_modules` do projeto.
</details>

<details>
<summary>Um erro diz <code>ReferenceError: http is not defined</code>. É de sintaxe ou de execução?</summary>

De execução: o código está bem escrito, mas rebenta ao usar uma variável que não existe. Os de sintaxe dizem `SyntaxError`.
</details>

<details>
<summary>A aplicação corre sem erros, mas grava o texto errado no ficheiro. Que tipo de erro é, e como o encontras?</summary>

É um erro lógico. Encontra-se com `console.log` ou com o debugger, partindo do resultado errado e verificando as variáveis para trás.
</details>

---

## ➡️ A seguir

**Secção 5: Working with Express.js.** Tudo o que fizeste à mão na secção 3 (routing, ler o body, redirecionar) passa a caber em poucas linhas.