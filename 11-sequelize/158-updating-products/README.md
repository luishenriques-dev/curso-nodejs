# 158. Updating Products

**Secção 11 — Understanding Sequelize**

> **Em resumo:** é o **U** do CRUD (*Update*). Para editar: **`findByPk`** vai buscar o produto → mudam-se os campos (`product.title = ...`) → **`product.save()`** guarda. As *promises* ficam **em fila**: o `save()` faz-se com **`return`**, e há **um só `.catch`** para tudo. O **`redirect`** vai para **dentro do último `.then`**.

---

## Parte 1 — Mostrar o formulário: `getEditProduct`

```javascript
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
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

Muda só uma coisa em relação às aulas 123–124: o **`findById` com callback** passa a **`findByPk` com `.then`**. O formulário aparece **preenchido**, como antes.

---

## Parte 2 — Guardar as alterações: `postEditProduct`

```javascript
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
```

### Os 3 passos

| Passo | Código | O que faz |
|---|---|---|
| 1 | `Product.findByPk(prodId)` | Vai buscar o produto **à base de dados** |
| 2 | `product.title = updatedTitle` (e os outros) | Muda os valores **só no JavaScript**: ainda **não** está guardado |
| 3 | `product.save()` | **Guarda** na base de dados |

> 📒 **Analogia:** tiras a ficha do arquivo (1), corriges a lápis (2) e voltas a arquivá-la (3). Enquanto não arquivas, a correção **só existe na tua mão**.

O **`save()`** é inteligente:

- se o produto **já existe** (como aqui), **atualiza-o** → `UPDATE products SET ... WHERE id = ?`;
- se **não existe**, cria um novo.

> 💡 É o `UPDATE` que ficou por fazer na secção 10, mas sem o escrever.

---

## Promises em fila: o `return`

Aqui há **duas** coisas que demoram: o `findByPk` e o `save()`. Podia-se pôr uma **dentro** da outra:

```javascript
// ❌ aninhado: o mesmo problema dos callbacks
Product.findByPk(prodId)
  .then(product => {
    product.save()
      .then(result => {
        // ...
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
```

Mas, com o **`return`**, ficam **em fila**:

```javascript
// ✅ em fila
Product.findByPk(prodId)
  .then(product => {
    // ...
    return product.save();      // ← devolve a promise do save
  })
  .then(result => {             // ← só corre quando o save acabar
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));   // ← apanha erros dos DOIS passos
```

| | Sem `return` (aninhado) | Com `return` (em fila) |
|---|---|---|
| Aspeto | Cada passo vai **mais para a direita** | Os passos ficam **um por baixo do outro** |
| `.catch` | Um **por cada** passo | **Um só**, para tudo |

> 🎫 É a **senha do take-away** (aula 139), em fila: *"quando o primeiro pedido estiver pronto, faz o segundo; quando o segundo estiver pronto, leva-me à página"*.

---

## ⚠️ O `redirect` tem de ir para dentro do `.then`

O professor tinha primeiro o `redirect` **no fim da função**, fora das *promises*:

```javascript
Product.findByPk(prodId).then(...).then(...).catch(...);
res.redirect('/admin/products');   // ❌ corre logo, antes do save acabar
```

Resultado: ao voltar à lista, **a alteração ainda não aparecia**. Só aparecia depois de recarregar.

**Porquê?** O Node **não espera** pelas *promises* (o event loop, aula 34). Regista o *"faz isto quando acabares"* e **segue logo para a linha seguinte**. Por isso, o `redirect` corria **antes** de a base de dados ter guardado a alteração.

**Solução:** o `redirect` vai para **dentro do último `.then`**, que só corre **depois** do `save()`.

> 💡 Se houver um erro, o `.catch` só o mostra no terminal, e o browser fica à espera. O curso trata disto numa secção própria (**Error Handling**).

---

## Testar

1. **Admin Products** → **Edit** num produto.
2. Muda o título e o preço → **Update Product**.
3. Voltas à lista, **já com as alterações**, sem precisar de recarregar.
4. No terminal aparece o **`UPDATE`** que o Sequelize correu.

---

## ✅ A reter

- **Update** = `findByPk` → mudar os campos → **`save()`**.
- Mudar `product.title` **não guarda**: só o **`save()`** guarda.
- **`return`** dentro do `.then` → *promises* **em fila**, com **um só `.catch`**.
- O **`redirect`** vai **dentro do `.then`**, senão corre antes de a base de dados acabar.
- No vídeo é `findById`, mas na versão atual é **`findByPk`**.