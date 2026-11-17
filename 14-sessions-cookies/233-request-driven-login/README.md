# 233. Adding the Request Driven Login Solution

**Secção 14 — Sessions & Cookies**

> **Em resumo:** o professor **tenta** fazer a app lembrar-se do login guardando **`req.isLoggedIn = true`**, e **falha de propósito**. Os links do admin deviam aparecer depois do login, mas **não aparecem**. Motivo: o **`req` morre** quando se envia a resposta, e o `redirect` cria um **pedido novo**, vazio. Esta aula mostra **o problema**, e os **cookies** (próxima aula) resolvem-no.

---

## O objetivo

Os links **Add Product** e **Admin Products** só devem aparecer **depois** de fazer login.

---

## O código

### `controllers/authController.js` — o `postLogin`

```javascript
exports.postLogin = (req, res, next) => {
  req.isLoggedIn = true;
  res.redirect('/');
};
```

Nesta secção **não se valida** o e-mail nem a password: assume-se que estão certos. A validação fica para a secção de **Authentication**.

### `routes/auth.js` — a rota POST

```javascript
router.post('/login', authController.postLogin);
```

### `views/includes/navigation.ejs` — os links só com login

```ejs
<% if (isAuthenticated) { %>
    <li class="main-header__item">
        <a class="<%= path === '/admin/add-product' ? 'active' : '' %>" href="/admin/add-product">Add Product</a>
    </li>
    <li class="main-header__item">
        <a class="<%= path === '/admin/products' ? 'active' : '' %>" href="/admin/products">Admin Products</a>
    </li>
<% } %>
```

### Todos os `res.render` — passar o `isAuthenticated`

```javascript
res.render('shop/index', {
  prods: products,
  pageTitle: 'Shop',
  path: '/',
  isAuthenticated: req.isLoggedIn      // ← em TODOS os render
});
```

A navegação aparece em **todas** as páginas, por isso **todos** os `res.render` têm de passar o `isAuthenticated`: shop, admin, auth, e também o **404** (`errorController`). Se faltar num, essa página dá erro: *isAuthenticated is not defined*.

> 💡 Ao início, `req.isLoggedIn` é **`undefined`**, que o `if` trata como **falso**. Por isso os links ficam escondidos.

---

## ❌ O resultado: os links não aparecem

Clica-se em **Login** → vai-se para a página inicial → os links **continuam escondidos**.

### Porquê?

```
Pedido 1: POST /login  → req.isLoggedIn = true → redirect('/') → 💀 o req morre
Pedido 2: GET /        → req NOVO, vazio       → req.isLoggedIn = undefined → links escondidos
```

- O **`req`** só existe durante **um pedido**. Quando se envia a resposta, **morre**, e o que lá estava **perde-se**.
- O **`redirect`** faz o browser enviar um **pedido novo**, com um `req` **novo**.
- Cada pedido é **independente**, mesmo vindo da mesma pessoa e do mesmo IP. É **de propósito**: se não fosse assim, os dados de um utilizador podiam aparecer a outro.

> 🗒️ **Analogia:** escreves *"este cliente já pagou"* num **post-it** e colas no balcão. Quando o cliente sai, o post-it vai **para o lixo**. Se ele voltar, ninguém se lembra.

### "Então porque é que o `req.user` funciona?"

Porque o **middleware** do `app.js` **volta a pô-lo em cada pedido**, logo no início, antes das rotas. O `isLoggedIn` só era posto **uma vez**, no pedido do login.

| | `req.user` | `req.isLoggedIn` |
|---|---|---|
| Quando é posto | Em **todos** os pedidos (middleware) | **Só** no pedido do login |
| Nos pedidos seguintes | ✅ Está lá | ❌ Desapareceu |

---

## A solução: próxima aula

É preciso guardar a informação **fora** do `req`, num sítio que **dure entre pedidos**: um **cookie**, no browser.

> 💡 O **"Lembrar-me"** (*remember me*) de muitos sites é a mesma ideia: um cookie que dura **vários dias**.

---

## ✅ A reter

- O **`req` morre** quando se envia a resposta. Não serve para guardar coisas **entre** pedidos.
- O **`redirect`** cria um **pedido novo**.
- Cada pedido é **independente**, mesmo vindo do mesmo utilizador.
- O `req.user` funciona porque o middleware o **repõe em cada pedido**.
- Para lembrar o login entre pedidos → **cookies** (e depois **sessões**).