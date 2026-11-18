# 238. Initializing the Session Middleware

**Secção 14 — Sessions & Cookies**

> **Em resumo:** instala-se o pacote **`express-session`** e liga-se como **middleware** no `app.js`, com três opções: **`secret`** (para cifrar o número da sessão no cookie), **`resave: false`** e **`saveUninitialized: false`**. Ainda **não se usa**: isso é a próxima aula.

---

## 1. Instalar o pacote

```bash
npm install --save express-session
```

O `express-session` faz parte da **família oficial** do Express, mas não vem incluído nele, por isso instala-se à parte.

---

## 2. `app.js` — importar e ligar

```javascript
const session = require('express-session');

// ...

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// a seguir: o middleware do User e as rotas
```

- Fica **junto aos outros middlewares**, logo no início, para correr em **todos os pedidos**.
- **`session(...)`** é uma **função**: chama-se com um **objeto de configuração**, e devolve o middleware.

### As opções

| Opção | Significado |
|---|---|
| **`secret`** | Texto usado para **cifrar** (assinar) o número da sessão que vai no cookie. Deve ser **comprido** e **secreto** |
| **`resave: false`** | Só volta a guardar a sessão se **algo mudou** nela, e não em cada pedido. Melhor desempenho |
| **`saveUninitialized: false`** | Não guarda sessões **vazias** (de quem ainda não fez nada que precise de sessão) |

> 🧥 **Analogia do bengaleiro (aula 237):** o **`secret`** é o **carimbo especial** que só o funcionário sabe fazer. Sem ele, qualquer um podia falsificar a senha.

### Opcional: configurar o cookie

```javascript
session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }   // 1 hora, em milissegundos
})
```

Sem isto, ficam as definições predefinidas: o cookie apaga-se quando se **fecha o browser**.

---

## O `secret` no `.env`

O professor escreve o segredo diretamente no código:

```javascript
secret: 'my secret'
```

Mas o `secret` é uma espécie de **password**: quem o souber consegue **falsificar** cookies de sessão. Por isso, pus-o no **`.env`**, como o `MONGODB_URI`:

```
SESSION_SECRET=um-texto-comprido-qualquer-inventado-por-mim
```

e no código: `secret: process.env.SESSION_SECRET`.

---

## Testar

`npm start` → a loja abre **igual** a antes. O middleware está ligado, mas ainda não é usado.

---

## ✅ A reter

- **`npm install --save express-session`**.
- **`app.use(session({ secret, resave: false, saveUninitialized: false }))`**, no início, junto aos outros middlewares.
- O **`secret`** cifra o número da sessão no cookie: tem de ser **comprido** e **secreto** → vai para o **`.env`**.
- **`resave`** e **`saveUninitialized`** a `false` → só se guarda o que é **preciso**.