# 257. Working on Route Protection

**Secção 15 — Authentication**

> **Em resumo:** esconder os links no menu não protege nada. Quem escrever o endereço à mão consegue abrir a página. Por isso, cada rota protegida tem de verificar, no servidor, se há sessão iniciada antes de mostrar a página. Se não houver, redirecionamos para o **login**.

---

## 1. O problema

Mesmo com a sessão terminada, é possível abrir **`/admin/add-product`** diretamente no browser. O menu esconde o link, mas a rota continua acessível.

> 🧥 **Analogia da discoteca:** o segurança não está na entrada, por isso qualquer pessoa entra pela porta das traseiras. Esconder a porta não basta, é preciso o segurança à porta.

---

## 2. A verificação no controlador

No `controllers/adminController.js`, no `getAddProduct`, verificamos a sessão antes de renderizar a página:

```javascript
exports.getAddProduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};
```

| Parte | O que faz |
|---|---|
| `if (!req.session.isLoggedIn)` | Verifica se a sessão **não** tem login |
| `return res.redirect('/login')` | Redireciona e **para** a função. O `return` impede que a página seja renderizada |
| `res.render(...)` | Só corre se o utilizador estiver com sessão iniciada |

> ⚠️ O `return` é essencial. Sem ele, o redirecionamento acontece, mas a linha seguinte também corre.

---

## Testar

1. Com a sessão **terminada**, abre **`/admin/add-product`** no browser. Deves ser redirecionado para **`/login`**.
2. Faz **login** com um utilizador válido e abre **`/admin/add-product`**. Deves ver a página normalmente.

---

## ✅ A reter

- Esconder links no menu **não é segurança**. A proteção tem de estar no servidor.
- Antes de renderizar uma página protegida, verificamos `req.session.isLoggedIn`.
- Se não houver login, fazemos `return res.redirect('/login')`.
- Esta verificação tem de ser repetida em todas as rotas protegidas. Na próxima aula vemos uma forma mais escalável.