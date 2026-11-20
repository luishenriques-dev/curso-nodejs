# 261. Adding CSRF Protection

**Secção 15 — Authentication**

> **Em resumo:** em vez de passar o token e o estado de login em cada `res.render`, usamos **`res.locals`** num middleware. Assim, todas as páginas recebem `isAuthenticated` e `csrfToken` automaticamente. Depois, adicionamos o campo escondido `_csrf` a **todos** os formulários que alteram dados.

---

## 1. Passar dados a todas as vistas com `res.locals`

No `app.js`, depois do middleware que extrai o utilizador (`req.user`) e **antes** das rotas, adiciona:

```javascript
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});
```

| Parte | O que faz |
|---|---|
| `res.locals` | Variáveis que ficam disponíveis em **todas** as vistas renderizadas |
| `req.session.isLoggedIn` | Estado de login, para o menu |
| `req.csrfToken()` | Token novo, para os formulários |
| `next()` | Continua para as rotas |

> 💡 Como estas variáveis já existem em todas as páginas, podes **apagar** `isAuthenticated` e `csrfToken` das chamadas `res.render` dos controladores.

---

## 2. Adicionar o token a todos os formulários

Em cada formulário que faz um `POST`, acrescenta este campo escondido, com o nome `_csrf`:

```html
<input type="hidden" name="_csrf" value="<%= csrfToken %>">
```

Formulários a alterar:

| Ficheiro | Formulário |
|---|---|
| `views/includes/navigation.ejs` | Logout (menu normal e mobile) |
| `views/includes/add-to-cart.ejs` | Adicionar ao carrinho |
| `views/admin/edit-product.ejs` | Guardar produto |
| `views/admin/products.ejs` | Eliminar produto |
| `views/shop/cart.ejs` | Eliminar item do carrinho |
| `views/shop/cart.ejs` | Encomendar (botão Order Now) |
| `views/auth/login.ejs` | Login |
| `views/auth/signup.ejs` | Registo |

> ⚠️ Não é preciso nas páginas que não têm formulários `POST`: `index.ejs`, `product-list.ejs`, `product-detail.ejs` (exceto o add-to-cart que já tem) e `orders.ejs`.

> ⚠️ O nome tem de ser exatamente `_csrf`. Com outro nome, o pacote recusa o pedido.

---

## Testar

1. Abre a página de **login**, faz login e confirma que entras sem erro de token.
2. Adiciona um produto ao carrinho. Deve funcionar.
3. Elimina um item do carrinho e encomenda. Ambos devem funcionar.
4. Faz **logout** pelo menu normal e pelo menu mobile.
5. Se algum formulário der erro de token inválido, inspeciona-o (F12) e confirma que tem o `input` com `name="_csrf"`.

> 💡 Se o erro aparecer só numa página, o problema é quase sempre esse formulário ter ficado sem o campo escondido.

---

## ✅ A reter

- `res.locals` disponibiliza variáveis a todas as vistas, sem repetir código em cada controlador.
- Cada formulário `POST` precisa do campo `<input type="hidden" name="_csrf" value="<%= csrfToken %>">`.
- A proteção CSRF não é opcional numa aplicação em produção.