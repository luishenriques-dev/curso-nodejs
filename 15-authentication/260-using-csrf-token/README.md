# 260. Using a CSRF Token

**Secção 15 — Authentication**

> **Em resumo:** instalamos o pacote **csurf**, que cria um **token CSRF** por página. Esse token tem de vir em cada formulário que altera dados (`POST`). O servidor só aceita o pedido se o token for válido. Sites falsos não conseguem obter nem adivinhar o token.

---

## 1. O que é o token

Um token é um valor aleatório que a tua aplicação gera e incorpora nas páginas. Cada página renderizada recebe um token novo.

- Os formulários legítimos enviam o token.
- Os sites falsos não o conhecem, por isso os pedidos deles são recusados.

---

## 2. Instalar o pacote

```bash
npm install --save csurf
```

---

## 3. Ativar a proteção no `app.js`

No topo do ficheiro:

```javascript
const csrf = require('csurf');
```

Depois de inicializar a sessão, cria a proteção e usa-a como middleware:

```javascript
const csrfProtection = csrf();

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, store: store }));
app.use(csrfProtection);
```

> ⚠️ A proteção tem de vir **depois** da sessão, porque o pacote usa a sessão para guardar o segredo do token.

---

## 4. Passar o token para as vistas

Nos controladores, passa o token ao `res.render`. Por agora, fazemos isto no `getIndex` do `shopController.js`:

```javascript
exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
      });
    })
    .catch(err => console.log(err));
};
```

| Parte | O que faz |
|---|---|
| `req.csrfToken()` | Gera um token novo para esta página |
| `csrfToken: ...` | Envia o token para a vista, com o nome `csrfToken` |

---

## 5. Pôr o token no formulário de logout

No `views/includes/navigation.ejs`, dentro do formulário de logout, acrescenta um campo escondido. **O nome tem de ser `_csrf`**, porque é esse nome que o pacote procura:

```html
<form action="/logout" method="POST">
  <input type="hidden" name="_csrf" value="<%= csrfToken %>">
  <button type="submit">Logout</button>
</form>
```

> ⚠️ Faz a mesma alteração no menu **mobile** (`<nav class="mobile-nav">`). Se não fizeres, o logout falha quando usas o menu mobile.

---

## Testar

1. Abre a página inicial e inspeciona o botão de logout (F12). Deves ver um `input` escondido com `name="_csrf"` e um valor.
2. Carrega em **Logout**. Deves ser redirecionado para `/` sem erro de token.
3. Se aparecer um erro de token inválido, confirma o nome `_csrf` e se a página foi carregada depois de guardares o ficheiro.

> 💡 Por agora, o token só existe na página inicial. Na próxima aula simplificamos isto para todas as páginas.

---

## ✅ A reter

- O token é gerado por página com `req.csrfToken()` e enviado à vista.
- Os formulários que alteram dados (`POST`) têm de incluir o campo `_csrf`.
- O nome `_csrf` é obrigatório, porque é o nome que o pacote procura.
- O `csrfProtection` vem depois da sessão, no `app.js`.