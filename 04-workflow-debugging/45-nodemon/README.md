# 45. Using Nodemon for Autorestarts

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** com o script `start` a usar **`nodemon app.js`** em vez de `node app.js`, o servidor **reinicia sozinho** sempre que guardas um ficheiro. Acabou o Ctrl + C seguido de `npm start` depois de cada alteração.

---

## O que muda: uma palavra no `package.json`

```json
"scripts": {
  "start": "nodemon app.js"
}
```

Antes era `"node app.js"`. Continuas a arrancar o servidor com **`npm start`**, como até aqui.

---

## O que o nodemon faz

1. **Arranca o servidor**: no fundo, corre `node app.js` por ti.
2. **Fica a vigiar os ficheiros** do projeto.
3. **Quando guardas uma alteração**, para o servidor e volta a arrancá-lo sozinho.

No terminal, a cada alteração aparece algo como:

```
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
```

---

## A analogia: o assistente 🧑‍🔧

Até agora eras tu que, depois de cada alteração, tinhas de **desligar e voltar a ligar** o servidor. O nodemon é um **assistente ao teu lado**: vê-te guardar o ficheiro e trata disso por ti, logo a seguir.

---

## Porque é que `npm start` funciona mas `nodemon app.js` não

Se escreveres diretamente no terminal:

```bash
nodemon app.js
```

dá erro: **`command not found: nodemon`**.

O nodemon foi instalado **só neste projeto** (com `--save-dev`, na aula 43), dentro da `node_modules`. O terminal só procura comandos **instalados globalmente** no computador, e lá não o encontra.

O **`npm start`** funciona porque, quando o npm corre um script, **procura primeiro nos pacotes do projeto**, na `node_modules`. Aí encontra o nodemon.

| Comando | Onde procura o nodemon | Resultado |
|---|---|---|
| `nodemon app.js` | Só no computador (global) | ❌ `command not found` |
| `npm start` (com `"start": "nodemon app.js"`) | Primeiro no projeto (`node_modules`) | ✅ Funciona |

> 💡 Mais uma razão para usar scripts: o comando funciona em qualquer computador que tenha feito `npm install`, sem precisar de instalar nada globalmente.

---

## ✅ A reter

- **nodemon** = arranca o servidor e **reinicia-o sozinho** quando guardas um ficheiro.
- No `package.json`: **`"start": "nodemon app.js"`**, e arrancas com `npm start`.
- Instalado só no projeto → funciona **pelo `npm start`**, não escrito diretamente no terminal.
- Para parar o nodemon: **Ctrl + C**, como sempre.

---

## 🔗 Ligação ao Nexus

O Nexus usa o mesmo princípio. O script de desenvolvimento (`npm run dev`) arranca o servidor com uma ferramenta que reinicia sozinha a cada alteração: o nodemon ou um equivalente para TypeScript. É por isso que lá nunca precisas de parar e arrancar o servidor à mão.
