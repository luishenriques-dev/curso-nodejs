# 169. Deleting Related Items & Deleting Cart Products

**Secção 11 — Understanding Sequelize**

> ⏭️ **Aula saltada.** É sobre o carrinho. Fica só o README, com a ideia que serve para qualquer relação muitos para muitos.

> **Em resumo:** para tirar um produto do carrinho, **não se apaga o produto**: apaga-se só **a linha da tabela do meio** que liga este carrinho a esse produto. Faz-se com **`product.cartItem.destroy()`**.

---

## O código: `postCartDeleteProduct`

```javascript
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};
```

Os passos já são conhecidos:

1. **`req.user.getCart()`** → o carrinho (aula 166).
2. **`cart.getProducts({ where: { id: prodId } })`** → este produto, dentro do carrinho (aula 167).
3. **`products[0]`** → é um array (aula 164).
4. **`product.cartItem.destroy()`** → apaga **só a linha da tabela do meio**.
5. **`redirect`** dentro do `.then`.

---

## A ideia importante: o que se apaga

| Código | Apaga | Resultado |
|---|---|---|
| `product.destroy()` | O **produto** da tabela `products` | ❌ Desaparecia da loja toda! |
| **`product.cartItem.destroy()`** | **Só a ligação** na tabela `cartItems` | ✅ Sai do carrinho, mas continua na loja |

```sql
-- o que o Sequelize corre:
DELETE FROM cartItems WHERE cartId = 1 AND productId = 1;
```

> 🧾 **Analogia:** riscas **a linha do talão**, não deitas fora o artigo da prateleira.

> 🏢 **No meu exemplo de empresa:** tirar um colaborador de um projeto → apagar a linha em `colaboradorProjetos`. O colaborador **continua na empresa**, e o projeto **continua a existir**.

---

## ✅ A reter

- Numa relação muitos para muitos, **"tirar"** = apagar a linha da **tabela do meio**, e não um dos lados.
- **`product.cartItem.destroy()`** → apaga só a ligação.
- Cuidado para não fazer **`product.destroy()`** por engano.