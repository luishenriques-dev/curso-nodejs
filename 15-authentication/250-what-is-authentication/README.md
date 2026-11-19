# 250. What is Authentication?

**Secção 15 — Authentication**

> **Em resumo:** a autenticação serve para decidir **quem pode fazer o quê**. Nem todas as ações são para todos: ver produtos é para qualquer visitante, mas criar produtos ou fazer encomendas só para quem tem **sessão iniciada**.

---

## Visitante ≠ utilizador com login

- **Visitante (anónimo)**: qualquer pessoa que abre a página (`localhost:3000`, mais tarde o domínio). Não tem sessão iniciada.
- **Utilizador com login**: um visitante que se **registou** e **iniciou sessão**.

> 💡 Como na Amazon: qualquer pessoa vê os produtos, mas para comprar tens de ter conta.

---

## O que cada um pode fazer

| Ação | Visitante | Com login |
|---|---|---|
| Ver produtos | ✅ | ✅ |
| Ver detalhes | ✅ | ✅ |
| Adicionar ao carrinho | ❌ | ✅ |
| Fazer encomendas | ❌ | ✅ |
| Criar e gerir produtos | ❌ | ✅ |

---

## Porque é que precisamos disto

Um produto fica **ligado a um utilizador**: quem o criou. Uma encomenda também fica ligada a quem a fez. Sem saber quem é o utilizador, não há como fazer essas ligações.

> 🧥 **Analogia da loja:** qualquer pessoa pode **ver** as prateleiras. Mas só quem tem **cartão de cliente** pode levar produtos para casa, e só quem é **funcionário** pode mexer no stock.

---

## O que a autenticação precisa de ter

1. **Distinguir** visitantes anónimos de utilizadores com login.
2. Um **fluxo de registo**: a pessoa cria conta.
3. Um **fluxo de login**: a pessoa prova quem é.
4. **Sessões**: para guardar que o utilizador tem login entre pedidos.
5. **Proteção no servidor**: as ações restritas só funcionam com login.

---

## ✅ A reter

- Há **visitantes** (anónimos) e **utilizadores com login**.
- Ver produtos é para todos. Comprar e gerir produtos é só para quem tem login.
- Autenticação = **distinguir** quem é quem, e **permitir ou bloquear** ações.
- As ações ficam ligadas ao utilizador (um produto tem um dono, uma encomenda tem um cliente).