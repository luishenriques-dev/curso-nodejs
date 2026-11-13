# 39. Wrap Up

**Secção 3 — Understanding the Basics**

> **Em resumo:** fim da secção 3. Aprendeste o que o Node faz **por baixo**, antes de o Express o esconder: como a web funciona, o event loop, o código não bloqueante, os requests e responses, e o sistema de módulos.

---

## A secção numa tabela

| Tema | Ideia principal | Aulas |
|---|---|---|
| **Como a web funciona** | O browser **pede** (request), o servidor **responde** (response). O Node é o código do servidor | 25 |
| **Criar um servidor** | `require('http')` → `createServer(função)` → `listen(3000)` | 26 |
| **Event loop** | O Node continua a correr **enquanto houver listeners**. O `listen` nunca acaba, por isso o servidor nunca termina | 27, 37 |
| **Request** | `req.url`, `req.method`, `req.headers` | 29, 31 |
| **Response** | `setHeader` → `write` → `end`. **Depois do `end`, nada mais** | 30 |
| **Routing** | Responder de forma diferente consoante o `url` (e o `method`), com `return` para parar | 32 |
| **Redirecionar** | `statusCode = 302` + header `Location` | 33 |
| **Ler o body** | Chega aos bocados (**stream**). `req.on('data')` guarda, `req.on('end')` junta com **`Buffer`** | 34 |
| **Código orientado a eventos** | **Registar ≠ executar**. O que depende dos dados vai **dentro** do listener, com `return req.on(...)` | 35 |
| **Não bloquear** | Evitar `...Sync`. Usar `writeFile` com **callback** | 36 |
| **Por trás do Node** | Uma thread para o JavaScript (event loop) e um **worker pool** para o trabalho pesado | 37 |
| **Módulos** | `module.exports` para exportar, `require('./ficheiro')` para importar | 38 |

---

## As três ideias que não podes esquecer

1. **O Node nunca bloqueia.** Regista o que tem de fazer e continua. O trabalho pesado vai para o sistema operativo, e o resultado volta através de um **callback**.
2. **Uma linha escrita mais acima não corre necessariamente primeiro.** O código dentro de um listener ou callback corre **mais tarde**. É a origem do erro `Cannot set headers after they are sent`.
3. **Uma resposta por pedido.** Depois do `res.end()`, mais nada. Usa `return` para garantir que o código abaixo não corre.

---

## 🧠 Testa-te

Responde de cabeça **antes** de leres a resposta por baixo de cada pergunta.

**1. Porque é que o servidor não termina depois de correres `node app.js`?**

> Porque o `server.listen()` regista um listener que nunca acaba. Enquanto houver listeners, o event loop continua a correr.

**2. Qual a diferença entre `require('http')` e `require('./http')`?**

> Sem `./` vai buscar um módulo do Node (ou instalado). Com `./` vai buscar um ficheiro teu, na mesma pasta.

**3. O que acontece se esqueceres o `return` antes de `res.end()` dentro de um `if`?**

> O código continua para as linhas seguintes e tenta enviar outra resposta. Dá o erro `Cannot set headers after they are sent`.

**4. Porque é que não existe `req.body` no Node puro?**

> Porque o body chega aos bocados (stream). Tens de os juntar com `req.on('data')` e `req.on('end')` e converter com `Buffer.concat(...).toString()`.

**5. Porque é que se deve evitar o `writeFileSync` num servidor?**

> Porque bloqueia o event loop. Enquanto grava o ficheiro, o servidor não atende mais ninguém.

**6. Como é que se redireciona o browser para outra página?**

> `res.statusCode = 302` e `res.setHeader('Location', '/')`, seguido de `res.end()`.

---

## ➡️ A seguir

**Secção 4: Improved Development Workflow and Debugging.** O **npm**, o `package.json`, o **nodemon** (reinicia o servidor sozinho sempre que guardas) e como encontrar erros no código.

Depois, na **secção 5**, o **Express**: tudo o que fizeste à mão nesta secção passa a caber em poucas linhas.