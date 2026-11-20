# 266. Finishing the Flash Messages

**Secção 15 — Authentication**

> **Em resumo:** a caixa de erro aparecia sempre, mesmo sem erro, porque `req.flash('error')` devolve sempre uma **lista**, que pode estar vazia. Verificamos o tamanho da lista antes de usar a mensagem. Se não houver mensagem, passamos `null`, e a caixa não aparece.

---

## 1. Porque é que a caixa aparecia vazia

`req.flash('error')` nunca devolve `undefined`. Devolve sempre um array:

| Situação | O que `req.flash('error')` devolve |
|---|---|
| Não há erro na sessão | `[]` (lista vazia) |
| Há um erro | `['E-mail ou palavra-passe inválidos.']` |

Como `[]` é um valor **verdadeiro** no `if` do EJS, a caixa aparecia sempre. Por isso, não basta verificar se a variável existe. Temos de verificar se a lista tem elementos.

---

## 2. A correção no `getLogin`

No `controllers/authController.js`:

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

| Parte | O que faz |
|---|---|
| `req.flash('error')` | Lê a mensagem e remove-a da sessão |
| `message.length > 0` | Verifica se a lista tem alguma mensagem |
| `message[0]` | Retira a primeira (e única) mensagem da lista |
| `message = null` | Se não houver mensagem, a vista não mostra a caixa |

> 💡 Se quiseres, podes resumir isto numa linha: `const errorMessage = req.flash('error')[0] || null;`. Faz o mesmo.

---

## 3. Limpeza: remover o `isAuthenticated`

Desde a aula 261, o `isAuthenticated` vem do `res.locals` no `app.js`, por isso já não é preciso passá-lo em cada `res.render`. Remove-o do `getLogin`:

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

> 💡 O mesmo vale para o `getSignup`, que já não tem o `isAuthenticated`. Se o `isAuthenticated` ainda estiver em algum `res.render`, não dá erro: é só redundante.

---

## 4. A vista

No `views/auth/login.ejs`, a caixa só aparece se `errorMessage` tiver valor:

```html
<% if (errorMessage) { %>
  <div class="user-message-container">
    <div class="user-message user-message--error"><%= errorMessage %></div>
  </div>
<% } %>
```

> 💡 A `div` à volta da mensagem é a que recebeu as classes de estilo na aula anterior. Usa a estrutura que tens no teu projeto.

---

## Testar

0. Confirma que o `getLogin` não tem `isAuthenticated`, e que o menu continua a mostrar Login ou Logout corretamente.
1. Abre **`/login`** sem ter feito nada. **Não** deve aparecer nenhuma caixa.
2. Tenta um email inválido. Deves ver a caixa de erro.
3. Recarrega a página. A caixa **não** deve voltar a aparecer.
4. Abre **`/login`** de novo, sem erro. A caixa não deve aparecer.

---

## ✅ A reter

- `req.flash('chave')` devolve sempre uma lista, mesmo vazia.
- Verifica o tamanho da lista antes de usar a mensagem.
- Depois de ser lida, a mensagem sai da sessão.

---

## 🧩 Desafio

Pensa em outros sítios no ecrã de **login** e de **registo** onde faria sentido mostrar uma mensagem. Por exemplo: sucesso no registo, palavra-passe com menos de X caracteres, email já registado. Na próxima aula, fazemos isso juntos.