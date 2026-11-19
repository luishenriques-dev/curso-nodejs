# 251. How is Authentication Implemented?

**Secção 15 — Authentication**

> **Em resumo:** o utilizador envia o **email** e a **password**. O servidor confere-os na base de dados. Se estiverem certos, cria uma **sessão**, responde com **200** e envia o **cookie** dessa sessão. A partir daí, cada pedido leva o cookie, e o servidor sabe quem é o utilizador.

---

## O fluxo, passo a passo

```
1. Registo    → o visitante cria conta (email + password), guardada na base de dados
2. Login      → envia email + password
3. Servidor   → procura um utilizador com esse email e confere a password
4. Se certo   → cria uma SESSÃO para esse utilizador (no servidor)
5. Resposta   → 200 (sucesso) + cookie com o ID da sessão
6. Pedidos    → o browser envia o cookie em cada pedido
7. Rotas      → o servidor liga o cookie à sessão e vê se o utilizador tem login
```

---

## Porque é que precisamos da sessão?

Os pedidos **não sabem nada uns dos outros**. Sem sessão, mesmo com credenciais válidas, o utilizador seria desligado no pedido seguinte.

> 🧥 **Analogia do bengaleiro:** a verificação da password é o momento em que mostras o bilhete de identidade. A sessão é o **talão do casaco**: sem ele, no próximo pedido ninguém te reconhece.

---

## Esta abordagem é para aplicações com vistas

Esta forma de autenticação (sessão + cookie) é a usada em **aplicações web tradicionais**, onde o servidor gera as páginas (EJS, Handlebars, etc.).

Mais tarde, com **APIs REST** e **GraphQL**, a autenticação é diferente. Mas para o que estamos a construir, a sessão é a abordagem certa.

---

## ✅ A reter

- Login: **verificar** email e password na base de dados.
- Se estiverem certos: **criar sessão**, responder **200** e enviar o **cookie**.
- Cada pedido seguinte leva o cookie: é assim que o servidor **reconhece** o utilizador.
- Para aplicações com vistas: **sessão + cookie**.