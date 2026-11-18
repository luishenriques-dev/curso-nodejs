# 237. What is a Session?

**Secção 14 — Sessions & Cookies**

> **Em resumo:** uma **sessão** guarda os dados de um utilizador (como *"tem login"*) **no servidor**, e não no browser. O browser fica só com um **cookie** que tem o **número da sessão** (o *session ID*), **cifrado**, para que não possa ser falsificado. Assim, o utilizador **não consegue fingir** que fez login. Esta aula é só teoria.

---

## Onde guardar *"este utilizador tem login"*?

| Sítio | Problema |
|---|---|
| No **`req`** (aula 233) | Morre a cada pedido |
| Numa **variável global** (aula 234) | É **partilhada por todos** os utilizadores |
| Num **cookie** (aulas 234–236) | O utilizador **pode alterá-lo** (aula 235) |
| **Numa sessão, no servidor** ✅ | Dura entre pedidos, é **só desse utilizador**, e ele **não lhe toca** |

---

## Como funciona

```
1. Login           → o servidor cria uma SESSÃO: { id: 123, isLoggedIn: true }   (no servidor)
2. Resposta        → envia um COOKIE com o número da sessão, cifrado               (no browser)
3. Pedidos seguintes → o browser envia o cookie → o servidor encontra a sessão 123 → "tem login"
```

> 🧥 **Analogia: o bengaleiro.**
> - O **casaco** (os dados) fica **lá dentro**, guardado pelo funcionário → a **sessão**, no **servidor**.
> - Tu ficas só com a **senha com o número** → o **cookie**, no **browser**.
> - Para levantares o casaco, **mostras a senha**.

---

## "E se eu mudar o número no cookie?"

Não funciona. O cookie não leva o número **simples**, mas o número **cifrado** (*hashed*), com um algoritmo que **só o servidor** sabe confirmar.

Se alguém mudar o valor, o servidor percebe que **foi mexido** e **não aceita**.

> 🧥 A senha do bengaleiro tem um **carimbo especial** que só o funcionário sabe fazer. Uma senha desenhada à mão é recusada.

---

## Porque não pelo endereço IP?

Podia-se tentar reconhecer o utilizador pelo **IP**, mas é **difícil de manter** (muitas pessoas partilham o mesmo IP, e o IP muda) e **pode ser falsificado**. Por isso usa-se o cookie com o número da sessão.

---

## Onde ficam guardadas as sessões?

| Aula | Onde |
|---|---|
| 238–239 | Na **memória** do servidor (simples, mas perdem-se quando o servidor reinicia) |
| 240 | Na **base de dados** (MongoDB) |

---

## ✅ A reter

- **Cookie** → no **browser** (o utilizador pode mexer).
- **Sessão** → no **servidor** (o utilizador não toca).
- O cookie da sessão só leva o **número da sessão**, **cifrado**.
- Cada utilizador tem a **sua** sessão: os outros não veem os seus dados.