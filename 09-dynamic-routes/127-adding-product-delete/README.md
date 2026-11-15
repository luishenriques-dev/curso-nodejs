# 127. Adding the Product-Delete Functionality

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** o botão **Delete** na página de produtos do admin passa a **apagar o produto**. O formulário manda o ID num **input escondido**, e o model ganha um método **`deleteById`**, que usa o **`filter`** para criar uma lista **sem** esse produto e a guarda no ficheiro.

---

## A ideia, com o caderno 📒

Não dá para **arrancar uma página** do ficheiro. O que se faz é:

1. ler o caderno todo;
2. **copiar todas as fichas, menos a que queres apagar**, para um caderno novo;
3. guardar o caderno novo **por cima** do antigo.

O passo 2 faz-se com o **`filter`**.

---

## O código desta aula

### 1. `views/admin/products.ejs` — o formulário do Delete

```html
<form action="/admin/delete-product" method="POST">
    <input type="hidden" value="<%= product.id %>" name="productId">
    <button class="btn" type="submit">Delete</button>
</form>
```

Mais uma vez, o **input escondido** (aulas 121 e 126): o botão diz ao servidor **qual produto** apagar.

### 2. `routes/admin.js`

```javascript
router.post('/delete-product', adminController.postDeleteProduct);
```

**POST** e **sem `:productId`**: o ID vai no **corpo do pedido**.

### 3. `controllers/admin.js`

```javascript
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;          // do input escondido
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
```

> 💡 O `res.redirect` é acrescentado pelo professor no início da aula seguinte. Sem ele, o browser fica à espera de resposta (aula 126).

### 4. `models/product.js` — o `deleteById`

```javascript
static deleteById(id) {
  getProductsFromFile(products => {
    const updatedProducts = products.filter(prod => prod.id !== id);
    fs.writeFile(p, JSON.stringify(updatedProducts), err => {
      console.log(err);
    });
  });
}
```

| Parte | O que faz |
|---|---|
| `static` | Como o `findById`: não precisas de um produto para apagar um. Pede-se **à fôrma** |
| `getProductsFromFile` | Lê o caderno todo |
| `products.filter(prod => prod.id !== id)` | Lista nova com **todos menos** o que tem aquele ID |
| `fs.writeFile(...)` | Guarda a lista nova **por cima** da antiga |

> ⚠️ No vídeo, o professor também chama o **`Cart.deleteProduct`** dentro do `writeFile`, para tirar o produto do carrinho. Como **saltei o carrinho**, o meu `deleteById` fica **sem essa linha**.

---

## O `filter`, passo a passo

```javascript
products.filter(prod => prod.id !== id)
```

Passa por **cada** produto e pergunta: *"o teu ID é **diferente** do que quero apagar?"*

```
apagar id "0.2"
   {id:"0.1"}  → "0.1" !== "0.2"? sim → fica ✅
   {id:"0.2"}  → "0.2" !== "0.2"? não → sai ❌
   {id:"0.3"}  → "0.3" !== "0.2"? sim → fica ✅

resultado: [ {id:"0.1"}, {id:"0.3"} ]
```

| | `find` | `findIndex` | **`filter`** |
|---|---|---|---|
| Devolve | **Um** elemento | A **posição** de um elemento | **Uma lista nova** |
| Usado para | Ver um produto (119) | Substituir na edição (126) | **Apagar** |

> 💡 O professor começou com o `findIndex`, mas trocou pelo `filter`, que é **mais simples** para apagar: não é preciso saber a posição.

---

## Testar

1. Vai a **Admin Products**.
2. Carrega em **Delete** num produto.
3. O produto **desaparece** da lista, e também do `data/products.json`.

---

## ✅ A reter

- Botão Delete = **formulário POST** + **input escondido** com o ID.
- Rota **`POST /admin/delete-product`**, com o ID no **corpo**.
- **`Product.deleteById(id)`** → **`filter`** para ficar com **todos menos** esse → **`writeFile`**.
- **`!==`** = "diferente de".
- No meu projeto: **sem** o `Cart.deleteProduct`.