# 276. Module Introduction

**Secção 17 — Advanced Authentication**

> **Em resumo:** este módulo melhora a autenticação. Começamos pela **redefinição de palavras-passe** e depois vemos a **autorização**, para garantir que um utilizador só pode editar e apagar o que criou.

---

## 1. O que vamos fazer

1. **Redefinir a palavra-passe**: o utilizador pede uma nova por email, usando o envio de emails do módulo anterior.
2. **Autorização**: verificar se o utilizador é o dono do produto antes de o editar ou apagar.

---

## 2. Porquê

Hoje, qualquer utilizador com sessão iniciada consegue, em princípio, alterar ou apagar produtos de outros. Com a autorização, cada ação verifica quem criou o produto.

> 🧥 **Analogia da chave:** ter login é ter a chave da porta do prédio. A autorização é a chave do teu apartamento: só serve para a tua porta.

---

## ✅ A reter

- Autenticação responde a **quem és**.
- Autorização responde a **o que podes fazer**.
- Neste módulo, começamos pela redefinição de palavras-passe e depois tratamos da autorização.