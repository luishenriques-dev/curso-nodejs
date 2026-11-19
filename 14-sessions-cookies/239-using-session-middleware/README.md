# 239. Using the Session Middleware

**Secção 14 — Sessions & Cookies**

> **Em resumo:** em vez de criar um cookie à mão, guarda-se o login **na sessão**: **`req.session.isLoggedIn = true`**. O `express-session` cria sozinho um cookie **`connect.sid`**, com o **número da sessão cifrado**. O dado *"tem login"* fica **no servidor**, onde o utilizador não lhe toca. Cada browser tem a **sua** sessão. É o **mecanismo central** do login na web.

---

## O código: `controllers/authController.js`

### `postLogin` — guardar na sessão

```javascript
exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
};
```

**Antes (aulas 234–236):** `res.setHeader('Set-Cookie', 'LoggedIn=true; HttpOnly')`, com o dado **no browser** ❌
**Agora:** `req.session.isLoggedIn = true`, com o dado **no servidor** ✅

- **`req.session`** é um objeto criado pelo **`express-session`** (aula 238).
- Pode-se guardar lá **qualquer chave**: `isLoggedIn` é um nome escolhido por nós.
- Ao contrário do `req.isLoggedIn` (aula 233), **dura entre pedidos**.

### `getLogin` — ler da sessão

```javascript
exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
};
```

Acabou o `req.get('Cookie')`, o `split`, o `.includes`… O pacote **lê o cookie por nós** e entrega a sessão certa em `req.session`.

---

## O que acontece por trás

```
1. POST /login → req.session.isLoggedIn = true
               → o express-session guarda a sessão NO SERVIDOR: { isLoggedIn: true }
               → e envia o cookie connect.sid = <número da sessão, cifrado>
2. GET /login  → o browser envia o connect.sid
               → o express-session encontra a sessão certa → req.session.isLoggedIn = true
```

> 🧥 **Analogia do bengaleiro:**
> - `req.session.isLoggedIn = true` → pões **no teu casaco** um papel a dizer *"tem login"*. O casaco fica **no bengaleiro** (servidor).
> - O **`connect.sid`** → a **senha** com o número do casaco, que fica **contigo** (browser).
> - Em cada pedido, mostras a senha, e o servidor vai buscar **o teu** casaco.

---

## O cookie `connect.sid`

No Chrome: **F12** → **Application** → **Cookies** → `http://localhost:3000`:

| | |
|---|---|
| **Nome** | `connect.sid` (*session ID*) |
| **Valor** | Um texto estranho: o número da sessão **cifrado** com o `secret` |
| **Expires** | **Session**: apaga-se quando se fecha o browser |
| **HttpOnly** | ✅ Ligado por defeito |

> 💡 O cookie antigo **`LoggedIn`** já não serve para nada, por isso apaga-se (seleciona-o → tecla **Delete**).

### "A minha password fica no browser?"

**Não.** O `connect.sid` só tem o **número da sessão**, cifrado. Não diz quem és, nem a password. E não pode ser **inventado** nem **alterado**, por causa do `secret`.

⚠️ Mas, se alguém **roubar** o cookie, pode usar a tua sessão. Como no bengaleiro: quem tiver a tua senha leva o teu casaco. Protege-se com o **`HttpOnly`**, **https**, **logout** e **validade** da sessão.

---

## Cada browser é um utilizador diferente

Abre-se o `localhost:3000` **noutro browser** (Safari, Firefox…) → lá **não há login** (`undefined`).

O outro browser **não tem** o cookie `connect.sid`, por isso **não tem sessão**. Para o servidor, é **outro utilizador**, mesmo sendo a mesma pessoa no mesmo computador.

| | Dura entre pedidos? | Partilhado entre utilizadores? | O utilizador pode alterar? |
|---|---|---|---|
| `req.isLoggedIn` (233) | ❌ | — | — |
| Cookie `LoggedIn=true` (234) | ✅ | ❌ | ✅ ⚠️ |
| **Sessão** (239) | ✅ | ❌ | ❌ |

---

## ⚠️ As sessões ficam na memória (por agora)

O `express-session` guarda as sessões, por defeito, **na memória** do servidor. Quando o servidor reinicia (por exemplo, o **nodemon**, ao guardar um ficheiro), **perdem-se**, e é preciso fazer login outra vez.

É por isso que, no vídeo, o primeiro `console.log` dá **`undefined`**: o professor guardou o ficheiro, o servidor reiniciou, e a sessão perdeu-se.

A próxima aula resolve isto: guardar as sessões no **MongoDB**.

---

## ✅ A reter

- **`req.session.chave = valor`** → guardar na sessão. **`req.session.chave`** → ler.
- O `express-session` cria o cookie **`connect.sid`** sozinho, com o número da sessão **cifrado**.
- Os dados ficam **no servidor**: o utilizador **não os consegue alterar**.
- Cada **browser** tem a **sua** sessão.
- Por defeito, as sessões ficam **na memória** → perdem-se quando o servidor reinicia.
- É o **mecanismo central** do login em sites com páginas renderizadas no servidor (como com o EJS).