# 249. Module Introduction

**Secção 15 — Authentication**

> **Em resumo:** até agora, o login era **fictício**: escondíamos os menus, mas qualquer pessoa podia aceder às rotas. Este módulo implementa **autenticação a sério**: registo, início e fim de sessão, e **bloqueio real** das rotas, verificado **no servidor**.

---

## O que vamos fazer

| Tema | O que é |
|---|---|
| **O que é autenticação** | Provar **quem** és. Não é exclusivo do Node: é igual em PHP, Python, Java… |
| **Credenciais** | O **email** e a **password** com que o utilizador se regista |
| **Guardar passwords** | Nunca em texto simples: guardam-se **cifradas** |
| **Proteção de rotas** | Só quem tem sessão acede às páginas certas |
| **Verificação no servidor** | Esconder um botão não basta: o servidor tem de **recusar** o pedido |

---

## Escondido vs. bloqueado

Até aqui, fizemos isto:

```html
<% if (isAuthenticated) { %>
  <a href="/admin/products">Admin Products</a>
<% } %>
```

> ⚠️ Isto **esconde** o link. Mas quem souber o endereço `/admin/products` consegue abri-lo na mesma.

Neste módulo, o servidor **verifica** a sessão antes de responder. Sem login, o pedido é recusado.

> 🧥 **Analogia da discoteca:** esconder o botão é pôr a fila de entrada invisível. **Bloquear** é ter um segurança à porta, que pede o bilhete a **toda a gente**, mesmo a quem já sabe o caminho.

---

## ✅ A reter

- **Autenticação** = provar quem és. Funciona igual em qualquer linguagem.
- As **passwords** nunca se guardam em texto simples.
- **Esconder** um botão não protege nada: é preciso **verificar no servidor**.
- Neste módulo, as rotas ficam **realmente bloqueadas** para quem não tem login.