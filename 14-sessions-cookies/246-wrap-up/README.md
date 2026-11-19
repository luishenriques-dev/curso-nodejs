# 246. Wrap-up: Sessions & Cookies

**Secção 14 — Sessions & Cookies**

> **Em resumo:** o **cookie** guarda dados no **browser** e pode ser alterado pelo utilizador, por isso não serve para dados sensíveis. A **sessão** guarda os dados no **servidor**, e o cookie só diz qual é a sessão. Para isso, o `express-session` cria e lê o cookie por nós.

---

## Cookies

- Ficam no **browser**. Só o utilizador vê os seus próprios cookies, mas **pode alterá-los**.
- **Não guardes dados sensíveis** num cookie, nem o estado de login.
- Por defeito, são **cookies de sessão**: apagam-se ao fechar o browser. O nome é enganador, porque **não tem nada a ver** com a sessão do servidor.
- Com **`Max-Age`** ou **`Expires`**, são **cookies permanentes**: sobrevivem ao fecho do browser, até expirarem.
- Na prática, raramente se configuram à mão. Quem trata disso é o pacote de sessões.

---

## Sessões

- Ficam no **servidor**. O utilizador **não as vê nem altera**.
- Servem para dados que devem **sobreviver entre pedidos**: o estado de login, o carrinho, o utilizador.
- Para saber **a que utilizador pertence** cada sessão, o browser envia o cookie com o identificador (`connect.sid`).
- O **store** é onde as sessões são guardadas: memória (só para desenvolvimento), MongoDB (o que usámos), MySQL, ficheiros, etc.

---

## Cookie e sessão, juntos

| | **Cookie** | **Sessão** |
|---|---|---|
| **Onde fica** | Browser | Servidor |
| **Quem altera** | O utilizador | Só o servidor |
| **Serve para** | Identificar a sessão (e outras coisas simples) | Guardar dados |
| **Dura** | Até ao fecho do browser, ou até expirar | Enquanto a sessão existir |

---

## O que vem a seguir

No próximo módulo: **autenticação a sério**. Vamos ter registo, início e fim de sessão, utilizadores reais guardados na base de dados, e a verificação de que o utilizador existe antes de cada ação.

---

## ✅ A reter

- Cookies → no **browser**, não para dados sensíveis.
- Sessões → no **servidor**, para dados que devem sobreviver aos pedidos.
- O cookie de sessão é só o **identificador** da sessão.
- O **store** (MongoDB, MySQL, ficheiros…) é onde as sessões vivem.
- A autenticação real vem no próximo módulo.