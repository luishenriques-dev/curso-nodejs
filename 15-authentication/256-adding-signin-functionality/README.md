# 256. Adding the Signin Functionality

**Secção 15 — Authentication**

> **Em resumo:** o login deixa de usar o utilizador fictício. Agora procuramos o utilizador pelo **email** que chega do formulário, comparamos a **password** com o hash guardado usando `bcrypt.compare` e, só se coincidir, criamos a **sessão**.

---

## 1. Extrair o email e a password

O formulário de login envia dois valores. Lemos ambos do corpo do pedido:

```javascript
const email = req.body.email;
const password = req.body.password;
```

---

## 2. Procurar o utilizador pelo email

Em vez de `findOne()` sem nada, procuramos pelo campo `email`:

```javascript
User.findOne({ email: email })
  .then(user => {
    if (!user) {
      return res.redirect('/login');
    }
    // ...validar a password
  })
  .catch(err => console.log(err));
```

Se não existir nenhum utilizador com esse email, o login falha e voltamos ao **`/login`**.

> 🧥 **Analogia do cartório:** primeiro confirmas que o número de contribuinte existe no sistema. Só depois pedes o código secreto.

---

## 3. Comparar a password com o hash

O `bcrypt` sabe reproduzir o hash a partir da password escrita. Por isso não tentamos reverter nada. Passamos a password do formulário e o hash guardado:

```javascript
bcrypt
  .compare(password, user.password)
  .then(doMatch => {
    if (doMatch) {
      // password correta
    }
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err);
    res.redirect('/login');
  });
```

| Parte | O que faz |
|---|---|
| `bcrypt.compare(password, user.password)` | Gera o hash da password escrita e compara com o hash guardado. Devolve uma **promessa** |
| `doMatch` | `true` se as passwords coincidem, `false` se não coincidem |
| `.catch` | Só apanha erros técnicos. Uma password errada **não** é um erro |

> 💡 Uma password errada não gera erro. O `compare` devolve `false` no `then`.

---

## 4. Criar a sessão só se a password estiver certa

Se `doMatch` for `true`, guardamos a sessão e só depois redirecionamos:

```javascript
if (doMatch) {
  req.session.isLoggedIn = true;
  req.session.user = { _id: user._id.toString() };
  return req.session.save(err => {
    console.log(err);
    res.redirect('/');
  });
}
res.redirect('/login');
```

> ⚠️ O `return` antes de `req.session.save` é importante. Sem ele, a linha `res.redirect('/login')` também pode correr.

> 💡 Guardamos só o `_id` como texto na sessão, pelo mesmo motivo da aula 253: o objeto completo do Mongoose dá o erro de BSON.

---

## 5. O código completo do `postLogin`

```javascript
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = { _id: user._id.toString() };
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};
```

---

## Testar

1. Tenta um **email que não existe**. Deves voltar a **`/login`**, sem sessão.
2. Tenta um **email certo com password errada**. Deves voltar a **`/login`**, sem sessão.
3. Tenta um **email certo com password certa**. Deves ir para **`/`** e ver os links de utilizador com sessão iniciada.
4. No **MongoDB Compass**, na coleção `sessions`, deve aparecer uma sessão, e só depois do login certo.

---

## ✅ A reter

- Procuramos o utilizador pelo **email** com `findOne({ email })`.
- A password **nunca** é revertida. Comparamos com `bcrypt.compare`.
- Uma password errada não é um erro: o `compare` devolve `false`.
- A sessão só é criada se a password estiver certa, e só redirecionamos depois de a guardar.