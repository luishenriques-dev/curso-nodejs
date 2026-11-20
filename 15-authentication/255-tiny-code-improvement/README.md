# 255. Adding a Tiny Code Improvement

**Secção 15 — Authentication**

> **Em resumo:** no registo, o `return` dentro do `then` do email **não para** a cadeia de promessas. Por isso, quando o email já existe, o bloco seguinte corre sem `hashedPassword` e dá o erro `password is required`. A solução é aninhar o hash e a criação do utilizador dentro do `if`.

---

## 1. Porque é que o erro aparece

Uma cadeia de `then` corre do princípio ao fim, mesmo que um bloco já tenha redirecionado.

```javascript
User.findOne({ email: email })
  .then(userDoc => {
    if (userDoc) {
      return res.redirect('/signup');   // termina ESTA função...
    }
    return bcrypt.hash(password, 12);
  })
  .then(hashedPassword => {             // ...mas este bloco continua a correr
    // hashedPassword é undefined aqui
  });
```

Quando o email já existe, o `return res.redirect(...)` termina o primeiro bloco. O bloco seguinte corre na mesma, recebe `undefined` e tenta criar o utilizador sem password.

> 🧥 **Analogia da fila:** o funcionário diz "esta pessoa já está registada", mas a fila não para. O próximo funcionário ainda tenta registar a pessoa, sem o cartão de cidadão.

---

## 2. A solução: promessas aninhadas

Em vez de encadear os blocos ao mesmo nível, metemos o hash e a criação dentro do `if`:

```javascript
User.findOne({ email: email })
  .then(userDoc => {
    if (userDoc) {
      return res.redirect('/signup');
    }
    return bcrypt
      .hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
          cart: { items: [] }
        });
        return user.save();
      })
      .then(result => {
        res.redirect('/login');
      });
  })
  .catch(err => {
    console.log(err);
  });
```

Agora, se o email já existir, a cadeia termina no redirecionamento. Os blocos de criação só correm quando há hashing.

---

## Testar

1. Regista um email que já existe. Deves voltar a **`/signup`** e **não** aparecer `password is required` no terminal.
2. Regista um email novo. Deves ser redirecionado para **`/login`**.

---

## ✅ A reter

- `return` dentro de um `then` termina essa função, mas não impede o `then` seguinte de correr.
- Para parar uma sequência de promessas, aninha os blocos que dependem de uma condição.
- O `.catch` no fim apanha os erros de toda a cadeia.