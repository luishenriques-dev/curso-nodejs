# 75. Serving Files Statically

**Secção 5 — Working with Express.js**

> **Em resumo:** o CSS sai dos HTML para ficheiros **`.css`** dentro de uma pasta **`public/`**. Para o browser os conseguir ir buscar, usa-se o middleware **`express.static(...)`**, que dá **acesso de leitura** a essa pasta.

---

## A nova estrutura

```
75-serving-static-files/
├── app.js
├── public/              ← nova
│   └── css/
│       ├── main.css     ← o estilo comum: body, cabeçalho
│       └── product.css  ← só o estilo do formulário
├── routes/
│   ├── admin.js
│   └── shop.js
├── util/
│   └── path.js
├── views/
│   ├── 404.html
│   ├── add-product.html
│   └── shop.html
├── package.json
└── README.md
```

> 💡 O professor anexa a esta aula os **três HTML** com o estilo e as classes da aula 74. Ele pede para substituíres os teus por esses.

---

## O código desta aula

### `app.js` (só o que muda)

```javascript
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
```

### Nos HTML: o `<style>` sai e entra um `<link>`

| Ficheiro | No `<head>` |
|---|---|
| `shop.html` | `<link rel="stylesheet" href="/css/main.css">` |
| `404.html` | `<link rel="stylesheet" href="/css/main.css">` |
| `add-product.html` | `<link rel="stylesheet" href="/css/main.css">` **e** `<link rel="stylesheet" href="/css/product.css">` |

O CSS que estava dentro do `<style>` passa para os ficheiros:

- **`main.css`** → `body`, `main` e tudo o que é `.main-header...`;
- **`product.css`** → `.form-control`, `button` e `.product-form`, que só o `add-product.html` usa.

---

## Porque é que o `<link>` sozinho não funciona

Experimenta abrir `localhost:3000/views/shop.html`: **não funciona**. O Express não deixa o browser mexer nos ficheiros do projeto. Cada pedido passa pelos middlewares e pelas rotas, e se nenhuma rota responde, cai na 404.

E **ainda bem**: se o browser pudesse abrir qualquer ficheiro, também podia ler o `app.js` ou outros ficheiros privados.

Mas o `<link href="/css/main.css">` faz **um pedido ao servidor** para ir buscar o CSS. Sem nada que o apanhe, também cai na 404, e a página fica sem estilo. Podes confirmar isso no separador **Network** das ferramentas de programador.

---

## A solução: `express.static`

```javascript
app.use(express.static(path.join(__dirname, 'public')));
```

| Parte | O que faz |
|---|---|
| `express.static(...)` | Um middleware **que já vem com o Express**: serve ficheiros diretamente da pasta indicada |
| `path.join(__dirname, 'public')` | O caminho absoluto da pasta `public` (aula 70). No `app.js`, o `__dirname` já é a raiz |

"Estático" quer dizer que o ficheiro é **enviado tal como está**, sem passar pelas rotas.

### Porque é que a pasta se chama `public`

É uma convenção. Diz que o que está lá dentro é **público**: qualquer pessoa pode pedir esses ficheiros, sem permissões. É **só leitura**: o browser pode ler, mas não pode alterar.

---

## ⚠️ O caminho no `href` não leva o `public`

```html
<link rel="stylesheet" href="/public/css/main.css">   <!-- ❌ não funciona -->
<link rel="stylesheet" href="/css/main.css">          <!-- ✅ -->
```

O `express.static` já sabe que tem de procurar **dentro** da `public`. Por isso, escreves o caminho **como se já lá estivesses**:

```
pedido:   /css/main.css
procura:  public  +  /css/main.css  →  public/css/main.css ✅
```

É a mesma ideia do `app.use('/admin', ...)` da aula 68, mas ao contrário: lá o prefixo era **tirado**, e aqui a `public` é **acrescentada** pelo Express.

> 💡 Se o ficheiro não existir na `public`, o `express.static` **passa o pedido à frente** (`next()`), para as rotas seguintes. Só responde quando encontra o ficheiro.

---

## Mais coisas que dá para fazer

- Podes servir **qualquer tipo de ficheiro**: CSS, JavaScript do browser, imagens, etc.
- Podes registar **várias pastas estáticas**, com vários `app.use(express.static(...))`. O Express procura em todas, por ordem, até encontrar o ficheiro.

---

## A analogia: a montra da loja 🪟

O servidor é uma loja onde **tudo está nos bastidores**. O cliente não entra no armazém: pede ao balcão (as rotas), e o funcionário traz-lhe o que pediu.

A pasta **`public`** é a **montra**: o que lá está, qualquer pessoa pode ver diretamente, sem pedir ao balcão. O `express.static` é **abrir a montra**. O cliente pode ver o que lá está, mas não pode mexer.

---

## O que vem a seguir

As páginas continuam a ser **HTML fixo**: os produtos que adicionas não aparecem em lado nenhum. Na secção 6 entram os **templates** (o EJS), que deixam **pôr dados do JavaScript dentro do HTML**.

---

## ✅ A reter

- **`app.use(express.static(path.join(__dirname, 'public')))`** → o browser pode ir buscar ficheiros à pasta `public`.
- A pasta **`public`** = ficheiros que todos podem ver (CSS, JS do browser, imagens). Os outros ficheiros continuam fechados.
- No **`href`**, o caminho **não leva `public`**: `/css/main.css`.
- **`main.css`** = estilo comum. **`product.css`** = só o do formulário.
- Pode haver **várias pastas estáticas**. O Express procura em todas, por ordem.