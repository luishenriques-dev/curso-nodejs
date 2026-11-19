# 252. Updated Project Status

**Secção 15 — Authentication**

> **Em resumo:** adicionamos a **página de registo** (Sign Up) ao projeto. Ainda não cria utilizadores: é só a **estrutura** (link, rotas e vista). O registo real vem na próxima aula. Também vemos que, hoje, uma rota protegida pode ser aberta **à mão** no browser, mesmo sem login.

---

## O que foi adicionado

### 1. A vista `views/auth/signup.ejs`

Um formulário de registo, igual ao de login, mas com a legenda do botão a dizer **Sign Up**.

### 2. O link no menu (`views/includes/navigation.ejs`)

Um item de lista novo, **Sign Up**, depois do Login, nos dois menus (normal e mobile):

```html
<li class="main-header__item">
  <a class="<%= path === '/signup' ? 'active' : '' %>" href="/signup">Sign Up</a>
</li>
```

> 💡 O link só deve aparecer quando **não** há login, como o Login.

### 3. As rotas (`routes/auth.js`)

```javascript
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
```

### 4. As ações (`controllers/authController.js`)

```javascript
exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postSignup = (req, res, next) => {
  // ainda vazio: o registo real vem na próxima aula
};
```

---

## Testar

1. Vê o link **Sign Up** no menu, sem login.
2. Abre **`/signup`**: deve aparecer o formulário.
3. Carrega em **Sign Up**: não acontece nada, porque o `postSignup` ainda está vazio.

---

## Um problema que fica para depois

Sem login, o menu esconde **Add Product**, mas a rota `/admin/add-product` **continua acessível** se escreveres o endereço à mão. Esconder o link **não protege** nada. A proteção no servidor vem mais à frente neste módulo.

---

## ✅ A reter

- A página de **registo** tem vista, rota e ação. Ainda **não grava** utilizadores.
- Os links do menu devem depender do **estado de login**.
- Esconder um link **não é segurança**: a rota tem de ser protegida no **servidor**.