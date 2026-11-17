# 232. Optional: Creating the Login Form

**Secção 14 — Sessions & Cookies**

> **Em resumo:** cria-se a **página de login**, que aparece ao clicar em **Login**. Por enquanto, só **mostra** o formulário (e-mail + password), e ainda não faz login. São 5 peças, todas copiadas de coisas que já existem: **rota**, **controller**, registo no **`app.js`**, **view** e **CSS**.

---

## As 5 peças

| # | Ficheiro | Novo? | Copiado de… |
|---|---|---|---|
| 1 | `routes/auth.js` | ✅ | `routes/shop.js` |
| 2 | `controllers/authController.js` | ✅ | o `getOrders` do `shopController.js` |
| 3 | `app.js` | — | as linhas do `shopRoutes` |
| 4 | `views/auth/login.ejs` | ✅ | `views/admin/edit-product.ejs` |
| 5 | `public/css/auth.css` | ✅ | o estilo do `.product-form` |

> 💡 O nome **auth** vem de *authentication* (autenticação): tudo o que tem a ver com login, registo e logout.

---

## 1. `routes/auth.js`

```javascript
const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.getLogin);

module.exports = router;
```

## 2. `controllers/authController.js`

```javascript
exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login'
  });
};
```

Não vai buscar nada à base de dados: só **mostra a página**.

## 3. `app.js` — registar as rotas

```javascript
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');      // ← novo

// ...

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);                              // ← novo
```

Como o `shopRoutes`, **não tem filtro** (`'/admin'`): o que não for encontrado nas rotas da loja passa para as rotas do auth.

## 4. `views/auth/login.ejs`

```ejs
<%- include('../includes/head.ejs') %>
    <link rel="stylesheet" href="/css/forms.css">
    <link rel="stylesheet" href="/css/auth.css">
</head>

<body>
   <%- include('../includes/navigation.ejs') %>

    <main>
        <form class="login-form" action="/login" method="POST">
            <div class="form-control">
                <label for="email">E-Mail</label>
                <input type="email" name="email" id="email">
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
            </div>
            <button class="btn" type="submit">Login</button>
        </form>
    </main>
<%- include('../includes/end.ejs') %>
```

| Campo | `type` | Porquê |
|---|---|---|
| E-Mail | **`email`** | O browser verifica se tem ar de e-mail (com `@`) |
| Password | **`password`** | Os caracteres ficam **escondidos** (●●●●) |

- O formulário envia um **POST** para **`/login`**. Essa rota **ainda não existe**: é a próxima aula.
- Saem o `product.css`, os outros campos e o `input` escondido do id.

## 5. `public/css/auth.css`

```css
.login-form {
  width: 20rem;
  max-width: 90%;
  margin: auto;
  display: block;
}
```

O mesmo estilo do `.product-form`. O professor diz que se podia ter juntado os dois num estilo global, mas prefere separá-los.

## Extra — `views/includes/navigation.ejs`

Para o **Login** ficar realçado quando se está na página, junta-se a mesma classe que os outros links têm:

```ejs
<a class="<%= path === '/login' ? 'active' : '' %>" href="/login">Login</a>
```

O `path` tem de ser **igual** ao que se pôs no controller (`'/login'`).

---

## Testar

1. **http://localhost:3000** → **Login**.
2. Aparece o formulário centrado, com **E-Mail**, **Password** e o botão **Login**.
3. O **Login** fica realçado na navegação.
4. Clicar no botão dá **Page Not Found**. É normal, porque o POST `/login` é feito na próxima aula.

---

## ✅ A reter

- Uma funcionalidade nova = **rota** + **controller** + **view** (+ CSS), e registar a rota no **`app.js`**.
- `type="email"` → o browser valida o formato. `type="password"` → esconde os caracteres.
- O **`path`** do controller serve para realçar o link certo na navegação.
- O login a sério (com password verificada) fica para a secção de **Authentication**. Aqui é só para usar **cookies e sessões**.