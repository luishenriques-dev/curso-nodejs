# 241. Sessions & Cookies: Resumo

**Secção 14 — Sessions & Cookies**

> **Em resumo:** um **cookie** fica no **browser** e leva um identificador. A **sessão** fica no **servidor** e guarda os dados. Juntos, o cookie diz ao servidor *"sou eu"*, e a sessão diz *"o que sei sobre ti"*. O **`express-session`** trata de criar e ler o cookie por nós.

---

## A ideia central

| | **Cookie** | **Sessão** |
|---|---|---|
| **Onde fica** | No **browser** | No **servidor** |
| **O que guarda** | Um identificador (o `connect.sid`) | Os dados (`isLoggedIn`, o carrinho…) |
| **Quem pode mexer** | O utilizador (pode editar o cookie) | Só o servidor |
| **Exemplo** | O talão com o número do casaco | O casaco no bengaleiro |

> 🧥 **Analogia do bengaleiro:** o **casaco** (os dados) fica guardado no bengaleiro (**servidor**). Tu levas só a **senha** (o **cookie**). Para levantares o casaco, mostras a senha.

---

## Como funciona o login com sessão

```
1. Login       → req.session.isLoggedIn = true   (dado guardado no servidor)
2. Resposta    → o express-session envia o cookie connect.sid (cifrado)
3. Pedidos     → o browser envia o cookie → o servidor encontra a sessão → "tem login"
```

---

## Quem faz o trabalho?

**O `express-session`**, o middleware que configuramos no `app.js`:

- **Cria** o cookie `connect.sid` sozinho.
- **Lê** o cookie em cada pedido e encontra a sessão certa.
- **Aceita** opções de cookie (`cookie: { maxAge: ... }`, etc.).

Por isso, raramente gerimos cookies à mão. Os cookies à mão (aulas 234–236) serviram para **perceber** como funcionam.

---

## Para que servem as sessões?

Para **qualquer dado** que:

- pertence a **um** utilizador,
- deve **durar entre pedidos**,
- e **não deve ser visto** pelos outros.

Exemplos: o **login** (`isLoggedIn`) e o **carrinho de compras**.

---

## Cookies para rastreio

Os cookies também são usados por **terceiros** (como a Google) para **rastrear** os utilizadores entre sites. Isso não se implementa à mão: são ferramentas de terceiros que o fazem.

---

## O que ainda falta

- As sessões ficam, por enquanto, **na memória** (aula 239), e perdem-se ao reiniciar o servidor.
- A aula 240 resolve isto, guardando as sessões no **MongoDB**.

---

## ✅ A reter

- **Cookie** → no **browser**, leva o **identificador**.
- **Sessão** → no **servidor**, guarda os **dados**.
- O **`express-session`** cria e lê o cookie **automaticamente**.
- Sessões servem para **login** e para **dados que devem durar entre pedidos** (carrinho, por exemplo).
- Cookies de **rastreio** são usados por **terceiros**, não por nós.