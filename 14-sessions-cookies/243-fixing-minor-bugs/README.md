# 243. Fixing Minor Bugs

**Secção 14 — Sessions & Cookies**

> **Em resumo:** o frontend mostra botões que não funcionam sem login (carrinho, encomendas, adicionar ao carrinho). A correção é simples: **mostrar só o que o utilizador pode usar**, com o mesmo `if (isAuthenticated)` que já usámos. O problema de fundo (as ações precisam de um **utilizador válido**) fica para a próxima aula.

---

## O problema

Depois do logout, a sessão é destruída. Mas a navegação e as páginas continuam a mostrar tudo:

- **Carrinho** e **Encomendas**: dependem de um utilizador. Sem sessão, dão erro.
- **Adicionar ao carrinho**: também depende de um utilizador. Sem sessão, falha.
- **Login** aparece mesmo com sessão iniciada, e **Logout** não aparece.

> 🧥 **Analogia do bengaleiro:** é como mostrar o botão "Pedir o casaco" a quem não deixou casaco nenhum. Não faz sentido, e dá erro.

---

## 1. A navegação (`views/includes/navigation.ejs`)

**Login** e **Logout** nunca aparecem ao mesmo tempo:

```html
<% if (isAuthenticated) { %>
  <li class="main-header__item">
    <form action="/logout" method="POST">
      <button type="submit">Logout</button>
    </form>
  </li>
<% } else { %>
  <li class="main-header__item">
    <a class="<%= path === '/login' ? 'active' : '' %>" href="/login">Login</a>
  </li>
<% } %>
```

Os links que dependem de utilizador (Carrinho, Encomendas, Add Product, Admin Products) passam para dentro de `<% if (isAuthenticated) { %>`.

> 💡 A mesma lógica aplica-se ao **menu mobile**.

---

## 2. Os botões "Adicionar ao carrinho"

Em `views/includes/add-to-cart.ejs`, o botão só é desenhado se houver sessão. Nas páginas que o incluem (`shop/product-list.ejs` e `shop/index.ejs`), a inclusão fica assim:

```html
<% if (isAuthenticated) { %>
  <%- include('../includes/add-to-cart.ejs') %>
<% } %>
```

> 💡 `isAuthenticated` chega a **todas** as views, porque o controller passa-o em cada `res.render`. Por isso, a mesma verificação funciona em qualquer página.

---

## Testar

1. Sem login: a navegação mostra **Login**. Não há Carrinho, Encomendas nem botões de adicionar.
2. Faz **login**: aparecem **Logout**, Carrinho, Encomendas e os botões de adicionar.
3. Faz **logout**: volta ao estado do ponto 1.

---

## O que fica para a próxima aula

Mesmo com sessão, adicionar ao carrinho ainda pode falhar. A causa é que o código ainda não verifica se o **utilizador existe no servidor**. Isso chega com o módulo de autenticação.

---

## ✅ A reter

- **Login** e **Logout** são **mutuamente exclusivos**: `if (isAuthenticated)` / `else`.
- Só mostrar **botões que funcionam**: se a ação precisa de um utilizador, a sua UI também só aparece com sessão.
- `isAuthenticated` está disponível em **todas** as views, por isso a verificação funciona em qualquer página.
- Esconder um botão **não** é segurança: quem tiver o endereço do pedido pode fazê-lo na mesma. A proteção real vem com a autenticação.