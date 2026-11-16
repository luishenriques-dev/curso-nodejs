# 159. Deleting Products

**Secção 11 — Understanding Sequelize**

> **Em resumo:** é o **D** do CRUD (*Delete*). O Sequelize não tem `deleteById`: tem o **`destroy()`**. Vai-se buscar o produto com o **`findByPk`**, faz-se **`return product.destroy()`**, e o **`redirect`** vai para o `.then` seguinte. Com isto, **o CRUD fica completo**.

---

## O código desta aula

### `controllers/adminController.js` — o `postDeleteProduct`

```javascript
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
```

É a **mesma estrutura** do `postEditProduct` (aula 158): `findByPk` → **`return`** da ação → **`.then` com o `redirect`** → `.catch`.

```sql
-- o que o Sequelize corre:
DELETE FROM products WHERE id = ?
```

### Outra forma: `destroy` com `where`

```javascript
Product.destroy({ where: { id: prodId } })
  .then(result => {
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
```

Apaga **diretamente**, sem ir buscar o produto primeiro. O professor mostra as duas, e usa a do `findByPk`.

| | `product.destroy()` | `Product.destroy({ where })` |
|---|---|---|
| Chama-se em | **Um produto** (depois do `findByPk`) | **No model** (a "fôrma") |
| Apaga | Esse produto | **Todos** os que cumprem o `where` |
| Passos | 2 (encontrar + apagar) | 1 |

> ⚠️ Cuidado com o `Product.destroy({ where })`: se o `where` apanhar vários registos, **apaga-os todos**. E sem `where`, apagaria a tabela inteira.

---

## O `redirect` no `postAddProduct`

O professor repara que, depois de **adicionar** um produto, o browser ficava a carregar. Junta o `redirect` dentro do `.then` (aula 153):

```javascript
.then(result => {
  console.log('Created Product');
  res.redirect('/admin/products');
})
```

---

## 🎉 O CRUD completo com o Sequelize

| Letra | Ação | Sequelize | SQL | Aula |
|---|---|---|---|---|
| **C** | Criar | `Product.create({...})` | `INSERT INTO` | 153 |
| **R** | Ler todos | `Product.findAll()` | `SELECT *` | 155 |
| **R** | Ler um | `Product.findByPk(id)` | `SELECT ... WHERE id = ?` | 156 |
| **U** | Editar | `findByPk` → mudar → `product.save()` | `UPDATE ... SET ... WHERE id = ?` | 158 |
| **D** | Apagar | `findByPk` → `product.destroy()` | `DELETE FROM ... WHERE id = ?` | 159 |

Esta tabela serve para **qualquer** app com Sequelize, com **MySQL** ou com **SQL Server**.

---

## A seguir: relações

O professor avisa que ainda falta uma coisa importante: as **relações**. A loja não tem só produtos: tem também **utilizadores** (e o carrinho). Nas próximas aulas, as tabelas passam a **ligar-se entre si**.

---

## ✅ A reter

- **Delete** = `findByPk` → **`return product.destroy()`** → `.then` com o `redirect`.
- Ou **`Product.destroy({ where: { id } })`**, num só passo. Cuidado com o `where`.
- O **`redirect`** vai **sempre dentro do `.then`**: no add, no edit e no delete.
- **CRUD completo**: `create`, `findAll`/`findByPk`, `save`, `destroy`.