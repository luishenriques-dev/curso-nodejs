# 275. Useful Resources & Links

**Secção 16 — Sending Emails**

> **Em resumo:** esta aula reúne os links de referência do módulo de emails, e o código final da secção, que pode ser usado em alternativa ao teu projeto.

---

## 1. Código da secção

O professor disponibilizou o código final da secção. Se quiseres usá-lo:

1. Extrai o ficheiro numa pasta nova.
2. Corre `npm install` dentro dessa pasta, antes de arrancar.
3. Cria o ficheiro `.env` com as variáveis necessárias (`MONGODB_URI`, `SESSION_SECRET`, e as do email, como `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER` e `EMAIL_PASS`).

> ⚠️ Não copies o `.env` para o GitHub. Ele deve continuar no `.gitignore`.

---

## 2. Links úteis

- **Nodemailer**: documentação oficial do pacote usado para enviar emails. https://nodemailer.com/about/
- **SendGrid**: documentação oficial do serviço de envio de emails usado na aula. https://sendgrid.com/docs/

---

## ✅ A reter

- A documentação do `nodemailer` é a fonte certa para confirmar as opções do `transporter` e do `sendMail`.
- Se usares o email do teu domínio, a documentação do `nodemailer` continua a servir, porque o SMTP é configurado da mesma forma.