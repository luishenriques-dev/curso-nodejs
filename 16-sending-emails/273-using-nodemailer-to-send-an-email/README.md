# 273. Using Nodemailer to Send an Email

**Secção 16 — Sending Emails**

> **Em resumo:** configuramos um **transporter** com o `nodemailer`, que diz como os emails são entregues. Neste projeto, o transporter usa as definições SMTP do email do teu domínio, em vez do SendGrid. Depois, enviamos um email de confirmação quando o registo tem sucesso.

---

## 1. Instalar o pacote

Na pasta do projeto:

```bash
npm install --save nodemailer
```

---

## 2. Guardar as definições no `.env`

Estes valores vêm do cPanel: **Email Accounts** → escolhe a conta → **Connect Devices**.

```
EMAIL_HOST=mail.teudominio.pt
EMAIL_PORT=465
EMAIL_USER=conta@teudominio.pt
EMAIL_PASS=<a password da conta>
```

> ⚠️ O `.env` não vai para o GitHub. Não cole a password no chat nem no código.

---

## 3. Importar o nodemailer

No `controllers/authController.js`, no topo do ficheiro:

```javascript
const nodemailer = require('nodemailer');
```

---

## 4. Criar o transporter

O `transporter` é a configuração que diz ao `nodemailer` como entregar os emails. É criado uma vez:

```javascript
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT == 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

| Campo | O que é |
|---|---|
| `host` | Servidor de envio (SMTP) do teu domínio |
| `port` | `465` com SSL, `587` com TLS |
| `secure` | `true` quando a porta é `465` |
| `auth` | Utilizador e password da conta de email |

---

## 5. Enviar o email depois do registo

No `postSignup`, depois de guardar o utilizador, redirecionamos e enviamos o email:

```javascript
.then(result => {
  res.redirect('/login');
  return transporter.sendMail({
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'Signup succeeded!',
    html: '<h1>You successfully signed up!</h1>'
  });
})
```

| Campo | O que é |
|---|---|
| `to` | Email do utilizador que se registou |
| `from` | Teu email, que aparece como remetente |
| `subject` | Assunto da mensagem |
| `html` | Conteúdo da mensagem |

> ⚠️ O `from` tem de ser a conta de email que configuraste no `.env`. Outros endereços costumam ser bloqueados pelo servidor SMTP.

---

## Testar

1. Reinicia o servidor com `npm start`.
2. Regista um utilizador com um **email real** teu.
3. Confirma que és redirecionado para `/login`.
4. Verifica a caixa de correio. Deves receber o email com o título "Signup succeeded!".
5. Se não chegar, verifica a pasta de spam e confirma no terminal se aparece algum erro.

---

## ✅ A reter

- O `transporter` é a configuração de entrega. É criado uma vez.
- `transporter.sendMail` envia o email e devolve uma promessa.
- O `from` tem de ser a conta de email configurada.
- As credenciais ficam no `.env`, nunca no código.