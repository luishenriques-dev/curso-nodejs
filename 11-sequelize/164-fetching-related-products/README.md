# 164. Fetching Related Products

**Secção 11 — Understanding Sequelize**

> **Em resumo:** o admin passa a ver e editar **só os produtos do utilizador**. Usa-se outro método "mágico": **`req.user.getProducts()`**, que junta sozinho o **`WHERE userId = 1`**. Atenção: devolve **sempre um array**, mesmo com um só produto.

---

## Outro método "mágico": `getProducts`

Tal como o `createProduct` (aula 163), o Sequelize cria o **`getProducts`** por causa do **`User.hasMany(Product)`**:

```
get  +  Products  =  getProducts
```

Vai buscar **os produtos deste utilizador**:

```sql
-- o que o Sequelize corre:
SELECT * FROM products WHERE userId = 1
```

> 🗂️ **Analogia:** em vez de ires ao arquivo **inteiro** e procurar, abres logo **a gaveta com o teu nome**.

---

## O que muda no `adminController.js`

| Função | Muda? | Porquê |
|---|---|---|
| `getAddProduct` | ❌ | Só mostra o formulário vazio |
| `postAddProduct` | ✅ (aula 163) | Já usa o `createProduct` |
| **`getEditProduct`** | ✅ | Só deixa editar produtos **do utilizador** |
| `postEditProduct` | ❌ | Se chegaste ao formulário, o produto já é teu |
| **`getProducts`** | ✅ | A lista do admin mostra só os produtos **do utilizador** |
| `postDeleteProduct` | ❌ | Mesma razão do `postEditProduct` |

---

## 1. `getProducts` — a lista do admin

```javascript
exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};
```

**Antes:** `Product.findAll()` → **todos** os produtos.
**Agora:** `req.user.getProducts()` → **só os do utilizador**.

---

## 2. `getEditProduct` — o formulário de edição

```javascript
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};
```

```sql
-- o que o Sequelize corre:
SELECT * FROM products WHERE userId = 1 AND id = ?
--                           ↑ juntado pelo Sequelize   ↑ o nosso where
```

### ⚠️ O array: `products[0]`

O **`getProducts`** devolve **sempre um array**, mesmo que só encontre **um** produto. Sem o `[0]`, o formulário aparece **vazio**, porque a view recebe `[ {produto} ]` em vez de `{produto}`.

| Método | Devolve |
|---|---|
| `findByPk` | **Um objeto** (ou `null`) |
| `findAll` / `getProducts` | **Um array** `[ ... ]` |

> 💡 É o mesmo problema das aulas 145 e 156.

---

## Testar

1. **Admin Products** → aparecem só os produtos com **`userId` = 1**.
2. **Edit** num produto → o formulário aparece **preenchido**.
3. No terminal, os `SELECT` têm o **`WHERE userId = 1`**.

> 💡 Produtos criados **antes** da aula 163 não têm `userId`, por isso **deixam de aparecer** no admin. Continuam a aparecer na loja (Shop), que usa o `findAll`.

---

## 🏢 No meu exemplo de empresa

*"Mostrar só os equipamentos deste colaborador"* → `colaborador.getEquipamentos()` → `SELECT * FROM equipamentos WHERE colaboradorId = ?`.

---

## ✅ A reter

- **`req.user.getProducts()`** → só os produtos do utilizador (`WHERE userId = ...`).
- Pode levar um **`where`** extra: `getProducts({ where: { id: prodId } })`.
- Devolve **sempre um array** → **`products[0]`** para ter um só.
- Mudam o **`getProducts`** e o **`getEditProduct`**. O edit e o delete (POST) ficam iguais.