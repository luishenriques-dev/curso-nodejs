# 271. How Does Sending Emails Work?

**Secção 16 — Sending Emails**

> **Em resumo:** o Node.js e o Express não são servidores de email. Não é prático criar o teu próprio servidor de email. Por isso, as aplicações usam **serviços de terceiros** para enviar as mensagens, e a tua aplicação só fala com esses serviços.

---

## 1. O equívoco comum

O Node.js e o Express tratam de **pedidos e respostas** HTTP. Enviar emails é outro tipo de tecnologia, com regras próprias (entregas, spam, reputação do remetente, filas de envio).

> ⚠️ Não é possível criar um servidor de email "simples" com o Node. Mesmo que consigas enviar um email, os servidores de destino tendem a marcá-lo como spam se não tiver a configuração correta.

---

## 2. Como funciona na prática

```
Tua aplicação (Node + Express)
        │
        │ "envia este email para este utilizador"
        ▼
Serviço de email de terceiros (ex.: SendGrid, AWS SES)
        │
        │ entrega a mensagem
        ▼
Caixa de correio do utilizador
```

| Papel | Quem faz |
|---|---|
| Criar a mensagem (texto, destinatário, assunto) | A tua aplicação |
| Ligar-se ao serviço e enviar a mensagem | A tua aplicação, com um pacote |
| Entregar a mensagem aos servidores de destino | O serviço de terceiros |

> 🧥 **Analogia dos correios:** tu escreves a carta, mas não tens uma frota de carrinhas. Entregas a carta a uma empresa de correio, que a leva até ao destino.

---

## 3. O que as grandes aplicações fazem

As aplicações conhecidas também não têm servidores de email próprios. Usam fornecedores como a AWS ou outros serviços especializados. Vamos fazer o mesmo neste módulo.

---

## ✅ A reter

- Node.js e Express tratam de pedidos e respostas, não de envio de emails.
- Na prática, usamos um **serviço de terceiros** para enviar emails.
- A aplicação só precisa de se ligar a esse serviço, com um pacote.