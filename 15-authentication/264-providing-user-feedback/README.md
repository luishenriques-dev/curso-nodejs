# 264. Providing User Feedback

**Secção 15 — Authentication**

> **Em resumo:** quando o login falha, o utilizador é redirecionado sem nenhuma mensagem. Para mostrar uma mensagem de erro depois do redirecionamento, usamos o pacote **connect-flash**. Ele guarda a mensagem na sessão e remove-a automaticamente depois de ser lida.

---

## 1. O problema

Um redirecionamento inicia um **novo pedido**. Esse pedido não sabe porque chegou ali. Os dados que usámos no pedido anterior perdem-se.

Para guardar uma mensagem entre dois pedidos, precisamos da **sessão**. Mas não queremos que a mensagem fique lá para sempre, por isso usamos o `connect-flash`.

> 🧥 **Analogia do post-it:** deixas um recado no balcão. Quem o lê, tira-o e o recado deixa de existir.

---

## 2. Instalar o pacote

```bash
npm install --save connect-flash
```

---

## 3. Ativar o flash no `app.js`

No topo do ficheiro:

```javascript
const flash = require('connect-flash');
```

Depois de inicializar a sessão, antes das rotas:

```javascript
app.use(flash());
```

> ⚠️ Tem de vir **depois** da sessão, porque o `connect-flash` guarda as mensagens na sessão.

---

## 4. Guardar a mensagem no `postLogin`

No `controllers/authController.js`, quando o email não existe, guardamos a mensagem com uma chave, aqui `error`, antes de redirecionar:

```javascript
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'E-mail ou palavra-passe inválidos.');
        return res.redirect('/login');
      }
      // ...restante código igual
    })
    .catch(err => console.log(err));
};
```

> 💡 Podes usar a mesma mensagem para email e para password errados. Assim não se sabe qual dos dois está errado.

---

## 5. Ler a mensagem no `getLogin`

No mesmo ficheiro, na função `getLogin`, lê a mensagem. Ao ler, o `connect-flash` remove-a da sessão:

```javascript
exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};
```

> 💡 O `req.flash('error')` devolve uma lista. Se a lista estiver vazia, não há erro, por isso passamos `null`.

---

## 6. Mostrar a mensagem na vista

No `views/auth/login.ejs`, acima do formulário:

```html
<% if (errorMessage) { %>
  <div class="user-message user-message--error"><%= errorMessage %></div>
<% } %>
```

---

## Testar

1. Abre **`/login`** e tenta um **email que não existe**. Deves ver a mensagem de erro.
2. Recarrega a página. A mensagem já **não** deve aparecer.
3. Tenta um email válido com password errada. Por agora, a mensagem não aparece, porque ainda não foi guardada na sessão nesse caso. Na próxima aula, tratamos disso.

---

## ✅ A reter

- Um redirecionamento inicia um pedido novo. Para passar dados entre pedidos, usamos a sessão.
- `connect-flash` guarda a mensagem com `req.flash(chave, mensagem)` e remove-a ao ser lida.
- Verificamos se a mensagem existe com `<% if (errorMessage) { %>` antes de a mostrar.