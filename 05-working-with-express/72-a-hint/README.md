# 72. A Hint!

**Secção 5 — Working with Express.js**

> **Em resumo:** aviso para a próxima aula. O código que o professor vai escrever usa o `process.mainModule`, que está **desatualizado**. Usa antes **`require.main`**.

---

## O aviso

Na aula 73, o professor escreve:

```javascript
module.exports = path.dirname(process.mainModule.filename);
```

Nas versões atuais do Node, o **`process.mainModule`** está **desatualizado** (*deprecated*): pode mostrar um aviso no terminal, e pode deixar de funcionar no futuro.

Usa esta versão, que faz o mesmo:

```javascript
module.exports = path.dirname(require.main.filename);
```

> 💡 **Deprecated** quer dizer "ainda funciona, mas vai deixar de existir". Quando o Node avisa que algo está *deprecated*, deves trocar pela alternativa recomendada.

---

## O que faz este código (em resumo)

É explicado na aula 73. Por agora, a ideia é:

| Parte | O que dá |
|---|---|
| `require.main.filename` | O caminho completo do **ficheiro principal** que arrancou a aplicação: o `app.js` |
| `path.dirname(...)` | A **pasta** onde esse ficheiro está, ou seja, a **raiz do projeto** |

Serve para ter **o caminho da raiz do projeto** em qualquer ficheiro, sem `'../'`.

---

## ✅ A reter

- Na aula 73, escreve **`require.main.filename`**, e **não** `process.mainModule.filename`.
- Os dois dão o caminho do `app.js`. O `process.mainModule` está desatualizado.