# 28. Controlling the Node.js Process

**Secção 3 — Understanding the Basics**

> **Em resumo:** para parar um servidor Node que está a correr, carrega em **`Ctrl + C`** no terminal onde o iniciaste.

---

## Como parar o servidor

1. Vai ao terminal onde correste `node app.js`.
2. Carrega em **`Ctrl + C`**.
3. O servidor para e o terminal volta a uma linha nova, pronto para outro comando.

> 💡 Funciona da mesma forma em Windows, Mac e Linux. No Mac é `Ctrl + C`, não `Cmd + C`.

---

## Quando vais precisar disto

Sempre que **alteras o código**, o servidor que está a correr continua com a versão antiga. Para veres as alterações:

```bash
Ctrl + C        # parar o servidor
node app.js     # voltar a arrancar
```

> 💡 Mais à frente (secção 4) vais conhecer o **`nodemon`**, que reinicia o servidor sozinho sempre que guardas um ficheiro.

---

## `Ctrl + C` ou `process.exit()`?

| | `Ctrl + C` | `process.exit()` |
|---|---|---|
| Quem para o servidor | **Tu**, no terminal | **O próprio código** |
| Quando usar | Sempre que quiseres parar o servidor | Quase nunca num servidor (aula 27) |

---

## ✅ A reter

- **`Ctrl + C`** no terminal para o servidor Node.
- Depois de alterares o código, tens de **parar e voltar a arrancar** o servidor.
