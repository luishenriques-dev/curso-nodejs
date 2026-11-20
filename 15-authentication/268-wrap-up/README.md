# 268. Wrap Up

**Secção 15 — Authentication**

> **Em resumo:** fechamos o módulo de autenticação. Sabes o que é autenticação, como funciona com sessões, como proteger rotas no servidor, porque é que as passwords têm de ser guardadas em hash, porque é que precisas de proteção CSRF e como usar mensagens flash para dar feedback ao utilizador.

---

## 1. O que aprendemos

| Tema | Ideia principal |
|---|---|
| Autenticação | Distinguir visitantes de utilizadores com sessão iniciada, e permitir ou bloquear ações |
| Sessões | Guardam o estado de login no servidor. O browser só guarda o cookie com o ID |
| Proteção de rotas | Verificar o login no servidor, antes de a ação do controlador correr. Esconder links não basta |
| Passwords | Guardar sempre um **hash** com `bcrypt`. Nunca texto simples |
| CSRF | Um site falso pode usar a sessão do utilizador. O **token CSRF** impede isso |
| Mensagens flash | Dados guardados na sessão entre pedidos, removidos automaticamente depois de lidos |

---

## 2. Regras a guardar

- A verificação de login tem de estar no **servidor**. Quem tenta aceder à rota vê a verificação, não o menu.
- A password nunca fica em texto simples. Quem tiver acesso à base de dados não deve conseguir lê-la.
- Todos os formulários que alteram dados (`POST`) precisam do campo `_csrf`.
- Um redirecionamento inicia um pedido novo. Para passar mensagens, usa a sessão e o `connect-flash`.

---

## 3. Próximo módulo

O próximo módulo trata do **envio de emails** a partir da aplicação Node. Vai ser preciso para a recuperação de password.

---

## ✅ A reter

- Autenticação: quem é o utilizador e o que pode fazer.
- Sessão + cookie: o servidor sabe quem está ligado.
- Hash + `bcrypt.compare`: a password nunca é revertida.
- CSRF: o token impede que sites falsos usem a sessão.
- Flash: mensagens que sobrevivem a um redirecionamento e desaparecem depois de lidas.