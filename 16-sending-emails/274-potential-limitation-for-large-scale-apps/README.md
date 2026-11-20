# 274. Potential Limitation for Large Scale Apps

**Secção 16 — Sending Emails**

> **Em resumo:** enviar um email dentro de um pedido pode tornar a aplicação mais lenta. Em aplicações grandes, convém não bloquear o utilizador à espera do envio, e em alguns casos enviar os emails com tarefas agendadas no servidor.

---

## 1. O problema do envio bloqueante

Se esperarmos pelo envio antes de redirecionar, o utilizador espera pelo servidor de email. Com poucos pedidos, quase não se nota. Com muitos pedidos ao mesmo tempo, a aplicação fica mais lenta.

```javascript
// Mais lento: espera pelo email antes de redirecionar
return transporter.sendMail({...})
  .then(() => res.redirect('/login'));

// Mais rápido: redireciona e envia ao mesmo tempo
res.redirect('/login');
transporter.sendMail({...});
```

> ⚠️ Na versão rápida, se o envio falhar, o utilizador já não vê nada. Por isso, é preciso decidir se o erro é importante e registá-lo com `.catch`.

---

## 2. Quando pode fazer sentido usar tarefas agendadas

Em aplicações muito grandes, pode existir um **script no servidor** que corre de X em X minutos ou de X em X horas, e envia os emails aos utilizadores recém-registados.

| Abordagem | Quando usar |
|---|---|
| Enviar no próprio pedido | Aplicações pequenas e médias |
| Redirecionar e enviar em simultâneo | Quando o email não é crítico para o utilizador continuar |
| Script agendado | Aplicações grandes, com muitos emails |

---

## 3. A regra a guardar

Pergunta sempre: **o utilizador precisa de esperar pelo email para continuar?** Se não precisar, não bloqueies o pedido.

---

## ✅ A reter

- Esperar pelo envio de email pode tornar a aplicação lenta.
- Redirecionar e enviar ao mesmo tempo é uma opção simples.
- Em aplicações grandes, há soluções com tarefas agendadas no servidor.