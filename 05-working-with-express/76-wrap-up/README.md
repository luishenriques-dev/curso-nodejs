# 76. Wrap Up

**Secção 5 — Working with Express.js**

> **Em resumo:** o Express é uma **framework do Node**: continuas a usar o Node (por exemplo o `path`), mas com ferramentas prontas e regras claras para organizar a app. **Tudo gira à volta do middleware** e do caminho que um pedido faz por ele, de cima para baixo.

---

## O mapa da secção

| Tema | Aulas | A ideia principal |
|---|---|---|
| O que é o Express | 58–59 | Uma framework **por cima** do Node, que poupa trabalho |
| Middleware | 60–62 | Funções `(req, res, next)` por onde o pedido passa, **por ordem** |
| Rotas | 63, 65 | Filtrar por **caminho** e por **método** |
| Ler dados do formulário | 64 | `body-parser` → `req.body` |
| Router | 66, 68 | Dividir as rotas por **vários ficheiros** |
| Página 404 | 67, 71 | Middleware "apanha-tudo" no **fim** |
| Enviar ficheiros HTML | 69–70, 73 | `res.sendFile` + `path.join` |
| Ficheiros estáticos | 75 | `express.static` → pasta `public` |

---

## 1. Middleware: a regra de ouro

Uma função de middleware recebe três coisas:

| Argumento | Para quê |
|---|---|
| `req` | O **pedido**: o caminho, o método, o `body`… |
| `res` | A **resposta**, para enviar alguma coisa ao browser |
| `next` | Uma função que **passa o pedido** ao middleware seguinte |

> ⚠️ **Ou chamas o `next()`, ou envias uma resposta. Nunca as duas, e nunca nenhuma.**
> Se não fizeres nenhuma das duas, o pedido fica **pendurado**. Se fizeres as duas, dá erro (`ERR_HTTP_HEADERS_SENT`).

Os middlewares correm **de cima para baixo**, pela ordem em que estão no `app.js`.

---

## 2. Filtrar por caminho e método

| Escreves | Método | Como compara o caminho |
|---|---|---|
| `app.use('/admin', ...)` | Qualquer um | **O início** do endereço: apanha `/admin`, `/admin/add-product`… |
| `app.get('/', ...)` | Só GET | **Exato** |
| `app.post('/add-product', ...)` | Só POST | **Exato** |

O **mesmo caminho** pode ter um `get` e um `post`: é o **método** que os distingue.

---

## 3. O Router

Com o **`express.Router()`**, as rotas ficam em ficheiros separados (`routes/admin.js`, `routes/shop.js`). O router exportado entra no `app.js` como **mais um middleware**:

```javascript
app.use('/admin', adminRoutes);
```

---

## 4. Enviar ficheiros

| Para quê | Como |
|---|---|
| Uma página HTML numa rota | `res.sendFile(path.join(rootDir, 'views', 'shop.html'))` |
| CSS, JS do browser, imagens | `app.use(express.static(path.join(__dirname, 'public')))` |

---

## Porque é que o Express é tão popular

É **fácil de estender**. Muitos pacotes são **só middleware**, como o `body-parser`: instalas, metes um `app.use(...)`, e o pedido passa por ele.

---

## A analogia da secção: a loja 🏪

| Peça | Na loja |
|---|---|
| **Pedido** | Um cliente que entra |
| **Middlewares** | Os balcões por onde ele passa, **por ordem** |
| **`next()`** | "Siga para o próximo balcão" |
| **`res.send` / `sendFile`** | Entregar-lhe o que pediu: o atendimento acaba |
| **Router** | Os departamentos: o `/admin` é o armazém, o `/` é a loja |
| **404** | O último balcão: "isso não temos" |
| **`public`** | A montra: qualquer um pode ver, ninguém mexe |

---

## O que vem a seguir

Com esta base vai-se mais fundo: **conteúdo dinâmico** (templates, secção 6), **bases de dados**, **autenticação**, gerir dados no servidor, etc.

---

## 🧠 Testa-te

**1. Num middleware, quando chamas o `next()`?**
> Quando **não** envias resposta e queres que o pedido siga para o middleware seguinte. Se envias resposta, **não** chamas o `next()`.

**2. Qual é a diferença entre `app.use('/admin', ...)` e `app.get('/admin', ...)`?**
> O `use` aceita **qualquer método** e compara **o início** do caminho. O `get` só aceita **GET** e compara o caminho **exato**.

**3. Para que serve o `express.Router()`?**
> Para pôr as rotas em **ficheiros separados**. Depois junta-se no `app.js` com `app.use(...)`.

**4. Porque é que a página 404 fica no fim do `app.js`?**
> Porque os middlewares correm **por ordem**. Só chega ao fim um pedido que **nenhuma rota** apanhou.

**5. Porque é que o `sendFile` precisa do `path.join`?**
> Porque exige um caminho **absoluto**, e o `path.join` constrói-o com o separador certo para cada sistema.

**6. No `<link href="...">`, porque é que o caminho não leva `/public`?**
> Porque o `express.static` já procura **dentro** da `public`. Escreve-se como se já lá estivesses: `/css/main.css`.

---

## ✅ A reter

- **Express** = Node + ferramentas + regras para organizar a app.
- **Middleware** = `(req, res, next)`, de cima para baixo: **ou `next()`, ou resposta**.
- **`use`** = início do caminho, qualquer método. **`get`/`post`** = caminho exato, um método.
- **Router** = rotas em vários ficheiros.
- **`sendFile`** para páginas, **`express.static`** para CSS, JS e imagens.