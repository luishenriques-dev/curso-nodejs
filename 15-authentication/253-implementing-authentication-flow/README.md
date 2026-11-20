# 253. Implementing an Authentication Flow

**Secção 15 — Authentication**

> **Em resumo:** o registo passa a **criar utilizadores reais**. O `postSignup` lê o email e a password do formulário, verifica se já existe um utilizador com esse email, cria o novo utilizador e redireciona para o **login**. Ainda há um problema grande: a **password é guardada em texto simples**. Isso fica para a próxima aula.

---

## 1. O formulário de registo

A vista `auth/signup.ejs` tem quatro campos: **name**, **email**, **password** e **confirmar password**, e um botão **Sign Up**. O formulário envia um `POST` para `/signup`.

```html
<form action="/signup" method="POST">
  <input type="text" name="name">
  <input type="email" name="email">
  <input type="password" name="password">
  <input type="password" name="confirmPassword">
  <button type="submit">Sign Up</button>
</form>
```

> 💡 O `name` de cada campo é a chave que a rota usa para ler o valor. Se o `name` estiver errado, o valor chega como `undefined`.

---

## 2. A rota e os valores do pedido

```javascript
router.post('/signup', authController.postSignup);
```

No controller, lemos os valores do corpo do pedido:

```javascript
const name = req.body.name;
const email = req.body.email;
const password = req.body.password;
const confirmPassword = req.body.confirmPassword;
```

> 💡 Validar se o email é válido e se as passwords coincidem é possível, mas fica para um módulo próprio. Por agora, ignoramos.

---

## 3. Verificar se o email já existe

Não podemos ter dois utilizadores com o mesmo email. Procuramos na base de dados:

```javascript
User.findOne({ email: email })
  .then(userDoc => {
    if (userDoc) {
      return res.redirect('/signup');
    }
    // ...criar o utilizador
  })
  .catch(err => console.log(err));
```

| Parte | O que faz |
|---|---|
| `findOne({ email: email })` | Procura um documento em que o campo `email` seja igual ao que chegou do formulário |
| `if (userDoc)` | Se existir, o email já está registado |
| `res.redirect('/signup')` | Volta ao registo (sem mensagem de erro, por agora) |

> 🧥 **Analogia do cartório:** antes de abrir uma conta nova, o balcão confere se o número de contribuinte já está no sistema.

> 💡 Uma alternativa é criar um **índice único** no campo `email` diretamente no MongoDB. Ficam ambas as hipóteses.

---

## 4. Criar o novo utilizador

Se o email não existir, criamos o utilizador:

```javascript
const user = new User({
  name: name,
  email: email,
  password: password,
  cart: { items: [] }
});
return user.save();
```

Depois de gravar, redirecionamos para o **login**, porque depois de registar é preciso iniciar sessão:

```javascript
.then(result => {
  res.redirect('/login');
})
```

> 💡 O `cart` começa com `items` vazio, para o carrinho funcionar desde o início.

---

## 5. O modelo de utilizador

O modelo tem o **`name`**, o **email**, a **password** (do tipo `String`, obrigatória) e o **carrinho**:

```javascript
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: {
    items: [ /* ... */ ]
  }
});
```

> 💡 O `name` é **obrigatório** neste projeto. Por isso, o formulário tem de o enviar. No vídeo, o professor remove o `name`.

---

## 6. Limpeza

Removemos do `app.js` o código que criava um **utilizador fictício** quando não havia nenhum na base de dados, porque agora há um registo real.

---

## Testar

1. Abre **`/signup`**, preenche o email e a password (não é preciso confirmar), e carrega em **Sign Up**.
2. Deves ser redirecionado para **`/login`**, sem erros no terminal.
3. No **MongoDB Compass**, na coleção `users`, deve aparecer o novo utilizador com o email e a password.
4. Tenta registar o **mesmo email** outra vez: deve voltar a `/signup`, sem criar um segundo utilizador.

---

## ⚠️ O problema que fica para a próxima aula

A **password fica guardada em texto simples** na base de dados. Quem tiver acesso à base de dados consegue lê-la. Na próxima aula, vamos **cifrar** a password antes de a guardar.

---

## ✅ A reter

- O registo lê **email**, **password** e **confirmação** do corpo do pedido (`req.body`).
- Antes de criar, verificamos se o **email já existe** com `User.findOne({ email })`.
- Criamos com `new User(...)`, guardamos com `save()` e redirecionamos para o **login**.
- A password **não pode** ficar em texto simples: fica para a próxima aula.