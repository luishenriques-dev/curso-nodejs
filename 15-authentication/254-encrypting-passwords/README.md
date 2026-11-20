# 254. Encrypting Passwords

**Secção 15 — Authentication**

> **Em resumo:** guardar a password em texto simples é uma falha grave. Usamos o pacote **bcryptjs** para guardar um **hash** da password, que não se consegue reverter. O email continua em texto simples, porque precisamos dele para enviar mensagens.

---

## 1. O problema

Na aula anterior, a password ficava guardada tal como foi escrita. No MongoDB Compass consegue-se ler a password que introduziste.

Se a base de dados for comprometida, ou se alguém da empresa tiver acesso a ela, as passwords dos utilizadores ficam expostas.

> 🧥 **Analogia do cofre:** guardar a password em texto simples é como deixar a chave de casa escrita no papel dentro da gaveta. Um hash é como guardar a impressão digital da chave: consegues confirmar que é a chave certa, mas não consegues reconstruir a chave a partir dela.

---

## 2. Instalar o bcryptjs

Para o servidor, carrega em **Ctrl+C**. Depois instala o pacote:

```bash
npm install --save bcryptjs
```

Arranca de novo o servidor:

```bash
npm start
```

---

## 3. Importar o bcryptjs no controlador

No topo do `controllers/authController.js`:

```javascript
const bcrypt = require('bcryptjs');
```

---

## 4. Criar o hash da password

No `postSignup`, a password já não é guardada diretamente. Primeiro passa pelo `bcrypt.hash`:

```javascript
return bcrypt.hash(password, 12);
```

| Parte | O que faz |
|---|---|
| `bcrypt.hash(...)` | Gera o hash da password. É uma tarefa **assíncrona**, por isso devolve uma **promessa** |
| `password` | A string que queremos transformar em hash |
| `12` | O número de **rondas** de hashing. Quanto maior, mais lento e mais seguro |

> 💡 O valor `12` é considerado seguro atualmente. Um valor muito alto deixa o registo lento.

---

## 5. Usar o hash no bloco `then`

Como o hash é assíncrono, encadeamos um bloco `then`. Esse bloco só corre quando o hash estiver pronto, e recebe a password já transformada:

```javascript
.then(hashedPassword => {
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    cart: { items: [] }
  });
  return user.save();
})
```

> 💡 A palavra-passe guardada é o `hashedPassword`, e não o `password` que veio do formulário.

---

## 6. O código completo

```javascript
exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

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
};
```

> ⚠️ O `return` antes de `bcrypt.hash` é importante. Sem ele, a cadeia não espera pelo hash e o `hashedPassword` chega vazio.

> ⚠️ O bloco que cria o utilizador fica **dentro** do `if`, depois do `return`. Assim, se o email já existir, a cadeia para e o utilizador não é criado.

---

## Testar

1. Abre **`/signup`** e regista um utilizador com um **email novo**. Deves ser redirecionado para **`/login`**.
2. No **MongoDB Compass**, na coleção `users`, a `password` deve aparecer como um texto comprido a começar por `$2`. Isso é o hash.
3. Tenta registar o **mesmo email** outra vez. Deves voltar a **`/signup`**, sem criar um segundo utilizador e **sem erros no terminal**.
4. Apaga o utilizador com a password insegura da aula anterior, para ficarmos só com utilizadores protegidos.

---

## ⚠️ O que ainda não está feito

O login ainda compara a password escrita com o texto guardado, e isso já não funciona com hashes. A comparação correta (com `bcrypt.compare`) fica para a próxima aula.

---

## ✅ A reter

- Nunca guardamos a password em texto simples. Guardamos o **hash**.
- `bcrypt.hash(password, 12)` devolve uma **promessa**, por isso usamos `return` e um `then`.
- O utilizador só é criado depois de o hash estar pronto.
- O email continua em texto simples, porque precisamos dele para contactar o utilizador.