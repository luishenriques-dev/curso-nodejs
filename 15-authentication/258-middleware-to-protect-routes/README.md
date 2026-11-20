# 258. Using Middleware to Protect Routes

**Secção 15 — Authentication**

> **Em resumo:** em vez de repetir a verificação de login em cada ação do controlador, criamos um **middleware** próprio, `isAuth`. Ele corre antes do controlador em todas as rotas que devem ser protegidas. Se não houver sessão iniciada, redireciona para o **login** e não chama o `next()`.

---

## 1. O problema da solução anterior

Na aula anterior, a verificação estava dentro de cada ação do controlador. Para proteger uma rota nova, era preciso copiar o `if` para essa ação. Não é uma solução escalável.

---

## 2. Criar o middleware

Na **raiz do projeto**, cria uma pasta `middleware` e, dentro dela, um ficheiro `isAuthMiddleware.js`:

```
projeto/
├── middleware/
│   └── isAuthMiddleware.js
├── controllers/
├── routes/
└── ...
```

No `middleware/isAuthMiddleware.js`:

```javascript
module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  next();
};
```

| Parte | O que faz |
|---|---|
| `(req, res, next)` | Um middleware recebe o pedido, a resposta e o `next` |
| `return res.redirect('/login')` | Sem sessão, redireciona e **não** chama o `next()`. O pedido nunca chega ao controlador |
| `next()` | Com sessão, passa o pedido para o passo seguinte |

> 🧥 **Analogia da discoteca:** o segurança à porta (o `isAuth`) verifica a pulseira. Sem pulseira, não entras. Com pulseira, segues para a sala (o controlador).

---

## 3. Usar o middleware nas rotas de admin

No `routes/admin.js`, importa o middleware e coloca-o **antes** do controlador:

```javascript
const isAuth = require('../middleware/isAuthMiddleware');

router.get('/add-product', isAuth, adminController.getAddProduct);
```

Podes encadear quantos middlewares quiseres. O pedido passa por eles da **esquerda para a direita**.

---

## 4. Proteger as rotas da loja

No `routes/shop.js`, protege as rotas que precisam de login:

```javascript
const isAuth = require('../middleware/isAuthMiddleware');

router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);
router.post('/create-order', isAuth, shopController.postOrder);
router.get('/orders', isAuth, shopController.getOrders);
```

> 💡 Usa os nomes das rotas que já tens no teu `shop.js`. Se os nomes forem diferentes, mantém os teus e acrescenta só o `isAuth`.

> 💡 As páginas públicas (lista de produtos, detalhe do produto, login e registo) continuam sem o `isAuth`.

---

## Testar

1. Sem sessão iniciada, abre **`/admin/add-product`**. Deves ser redirecionado para **`/login`**.
2. Sem sessão iniciada, abre **`/cart`**. Deves ser redirecionado para **`/login`**.
3. Sem sessão iniciada, consegues ver a lista de produtos e os detalhes.
4. Faz login e confirma que **`/admin/add-product`** e **`/cart`** abrem normalmente.

---

## ✅ A reter

- Um middleware recebe `(req, res, next)`. Chama `next()` para continuar, ou redireciona para parar.
- Colocamos o middleware **antes** do controlador na rota: `router.get('/x', isAuth, controller)`.
- Esconder links no menu não protege nada. A proteção está no servidor, em cada rota.