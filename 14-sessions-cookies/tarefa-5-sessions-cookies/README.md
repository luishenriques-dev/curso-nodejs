# Tarefa 5: Time to Practice, Sessions & Cookies

**Secção 14 — Sessions & Cookies**

> **Pergunta:** o que aprendeste sobre sessões e cookies neste módulo?

---

## Resposta (resumo)

**Cookie:** um pequeno texto que o servidor envia ao browser, que o guarda e o devolve em cada pedido. Fica no **browser**, e o utilizador pode alterá-lo. Pode ter opções como `Max-Age`, `Secure` e `HttpOnly`.

**Sessão:** os dados de um utilizador guardados no **servidor**. O utilizador não os consegue alterar, e duram entre pedidos.

**Ligação entre as duas:** o cookie `connect.sid` leva só o número da sessão, cifrado. O servidor usa esse número para encontrar a sessão certa, e aí lê ou guarda dados como `isLoggedIn`.

**O `express-session`** cria e lê o cookie automaticamente, por isso raramente o gerimos à mão.

**Vantagem da sessão:** os dados ficam no servidor, por isso o utilizador não os pode falsificar. Só o identificador vai para o browser.

**Para que serve:** login, carrinho de compras e outros dados que pertencem a um utilizador e devem durar entre pedidos.

**Limitação atual:** nas aulas 238 e 239 as sessões ficam na memória e perdem-se ao reiniciar o servidor. A aula 240 resolve isto, guardando-as no MongoDB.

---

> Resposta escrita com base nas aulas. Se preferires, reescreve com as tuas palavras.