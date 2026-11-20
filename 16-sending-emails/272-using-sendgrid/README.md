# 272. Using SendGrid

**Secção 16 — Sending Emails**

> **Em resumo:** vamos usar o **SendGrid** para enviar os emails. Tem um plano gratuito que permite enviar menos de 100 emails por dia. Depois de criares a conta, instalamos dois pacotes: o **nodemailer** e o **nodemailer-sendgrid-transport**.

---

## 1. Criar a conta no SendGrid

1. Vai a **sendgrid.com** e carrega em **Try for free**.
2. Cria a conta.

> 💡 Existem outras alternativas, como o Mailchimp, a AWS ou o SES. Se procurares "nodemailer" + o nome do serviço, encontras tutoriais para cada um.

---

## 2. Instalar os pacotes

Na pasta do projeto, corre:

```bash
npm install --save nodemailer nodemailer-sendgrid-transport
```

| Pacote | Para que serve |
|---|---|
| `nodemailer` | Facilita o envio de emails a partir do Node |
| `nodemailer-sendgrid-transport` | Liga o nodemailer ao SendGrid |

---

## 3. Reiniciar o servidor

Para o servidor e arranca de novo:

```bash
npm start
```

> ⚠️ A chave da API do SendGrid não deve ser escrita no código nem partilhada. Vai ser usada na próxima aula e deve ficar no `.env`.

---

## ✅ A reter

- O SendGrid é um serviço de terceiros para enviar emails, com plano gratuito até 100 emails por dia.
- `nodemailer` trata do envio no Node.
- `nodemailer-sendgrid-transport` liga o `nodemailer` ao SendGrid.