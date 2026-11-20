# 259. Understanding CSRF Attacks

**Secção 15 — Authentication**

> **Em resumo:** um ataque **CSRF** (Cross-Site Request Forgery) engana o browser de um utilizador com sessão iniciada para enviar um pedido à tua aplicação, sem que ele perceba. Como o browser envia o cookie da sessão automaticamente, o servidor aceita o pedido. A defesa é o **token CSRF**, que vemos na próxima aula.

---

## 1. Como funciona o ataque

O utilizador tem sessão iniciada na tua aplicação. O browser guarda o cookie dessa sessão.

Depois, o utilizador visita outro site, por exemplo através de um link num email. Esse site tem um formulário escondido que envia um pedido para a tua aplicação:

```
Utilizador com sessão iniciada na tua loja
        │
        │ abre um link num email
        ▼
Site falso (formulário escondido)
        │
        │ envia um POST para a tua loja
        ▼
Tua loja: o browser envia o cookie da sessão → o pedido é aceite
```

| Passo | O que acontece |
|---|---|
| 1 | O utilizador tem sessão iniciada na tua aplicação |
| 2 | Visita um site falso, por exemplo através de um email |
| 3 | O site falso envia um pedido para a tua aplicação com dados que o utilizador não escolheu |
| 4 | O browser envia o cookie da sessão, e o servidor aceita o pedido como se fosse do utilizador |

> 🧥 **Analogia do cartão de cliente:** alguém entra na loja com o teu cartão, e o funcionário aceita a compra porque o cartão é válido. O funcionário não sabe que não foste tu que pediste.

---

## 2. Porque é que funciona

O browser envia o cookie automaticamente para o teu domínio, mesmo quando o pedido nasce noutra página. O servidor vê um cookie válido e acredita que o pedido é legítimo.

> ⚠️ Não se trata de roubar a password. O atacante não vê a sessão. Usa-a sem a conhecer.

---

## 3. Exemplo numa loja

Imagina um formulário escondido num site falso que envia:

```html
<form action="https://a-tua-loja.pt/create-order" method="POST">
  <input type="hidden" name="morada" value="Morada do atacante">
</form>
<script>document.forms[0].submit();</script>
```

Para o utilizador, a página só redireciona. Nos bastidores, a encomenda é feita com a sessão dele.

---

## 4. A defesa

A ideia é garantir que o pedido só é aceite se vier das **tuas próprias páginas**. Para isso, vamos usar um **token CSRF**: um valor secreto que só a tua aplicação conhece e que tem de ser enviado em cada formulário. Na próxima aula vemos como funciona.

---

## ✅ A reter

- CSRF engana o browser de um utilizador com sessão iniciada para enviar pedidos à tua aplicação.
- O browser envia o cookie da sessão automaticamente, por isso o servidor aceita o pedido.
- A defesa é o **token CSRF**, que os formulários legítimos enviam e os falsos não conseguem adivinhar.