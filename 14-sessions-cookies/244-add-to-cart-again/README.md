# 244. Add to Cart Again

**Secção 14 — Sessions & Cookies**

> **Em resumo:** a sessão guarda o utilizador como **dados simples**. Esses dados não têm os **métodos** do Mongoose (como `addToCart`). Por isso, o "Adicionar ao carrinho" falha. A correção: **em cada pedido**, usar o ID do utilizador da sessão para ir buscar **um modelo Mongoose completo** e guardá-lo em **`req.user`**.

---

## O problema

Antes, o middleware em `app.js` ia buscar o utilizador à base de dados em **cada pedido**, e o Mongoose devolvia o modelo completo, com os métodos.

Com sessões, guardamos o utilizador **na sessão** depois do login. Quando o pedido chega, o store do MongoDB devolve só os **dados**. O store não conhece os modelos do Mongoose.

> 🧥 **Analogia da fotocópia:** a sessão guarda uma **fotocópia** do utilizador: tem os dados, mas não tem as funções. O **Mongoose** é o **original**, com os métodos. Para usar o `addToCart`, precisas do original.

---

## A solução

Em vez de guardar o utilizador completo, guardamos só o **ID** (ou os dados) na sessão. Depois, **em cada pedido**, vamos buscar o utilizador **com o ID da sessão**.

### 1. `app.js`: o middleware

Depois de inicializar a sessão, e antes das rotas:

```javascript
app.use((req, res, next) => {
  if (!req.session.user) {
    return next(); // sem sessão: segue sem utilizador
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user; // modelo Mongoose completo, só para este pedido
      next();
    })
    .catch(err => console.log(err));
});
```

| Parte | O que faz |
|---|---|
| `req.session.user._id` | O ID do utilizador, que **persiste** entre pedidos |
| `User.findById(...)` | Vai buscar o **modelo completo** à base de dados |
| `req.user = user` | Guarda-o só para **este pedido** |
| `return next()` | Sem sessão, não há utilizador: o código seguinte não corre |

### 2. Controllers e rotas (`shop.js`, `admin.js`)

Troca **`req.session.user`** por **`req.user`** em todos os sítios onde se usam métodos do utilizador (`req.user.addToCart`, `req.user.getCart`, etc.).

> 💡 Já o **`req.session.isLoggedIn`** continua igual: é só `true` ou `false`, não precisa de ser um utilizador.

---

## Testar

1. Faz **login** e adiciona um produto ao carrinho: deve funcionar.
2. Carrega na **página inicial** e na de **detalhes**: deve funcionar.
3. Apaga um produto do carrinho e faz **logout**.
4. Sem login, a página inicial deve carregar sem erros.

---

## ✅ A reter

- A **sessão** guarda **dados**. Os **métodos** do Mongoose não são guardados.
- Em cada pedido, usa o **ID da sessão** para ir buscar o **modelo completo** e guarda-o em **`req.user`**.
- Usa **`req.user`** nos controllers para os métodos. Usa **`req.session.isLoggedIn`** só para o `true`/`false`.
- Sem sessão, o middleware segue com `next()` sem fazer nada.