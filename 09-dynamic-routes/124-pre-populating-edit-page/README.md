# 124. Pre-Populating the Edit Product Page with Data

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** no modo de edição, o controller vai buscar o produto (**`findById`**) e passa-o à página. O formulário fica **já preenchido** com os dados do produto, e o **botão** e o **`action`** mudam conforme se está a **adicionar** ou a **editar**.

---

## A ideia

| | Adicionar | Editar |
|---|---|---|
| Campos | **Vazios** | **Preenchidos** com o produto |
| Texto do botão | "Add Product" | "Update Product" |
| Para onde vai o formulário (`action`) | `/admin/add-product` | `/admin/edit-product` |

O ficheiro é **o mesmo** (`edit-product.ejs`). Quem decide é a variável **`editing`**, que o controller manda: `true` ou `false`.

---

## O código desta aula

### `controllers/admin.js`

```javascript
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false                              // ← novo: não está a editar
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;          // ← o ID que vem no URL
  Product.findById(prodId, product => {         // ← vai buscar a ficha
    if (!product) {
      return res.redirect('/');                 // ← não existe? volta à página inicial
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product                          // ← a página recebe o produto
    });
  });
};
```

> ⚠️ O **`getAddProduct`** também tem de mandar **`editing: false`**. Como o ficheiro agora usa o `editing`, sem isto dá **`editing is not defined`**.

### `views/admin/edit-product.ejs` (o formulário)

```html
<form class="product-form" action="/admin/<% if (editing) { %>edit-product<% } else { %>add-product<% } %>" method="POST">
    <div class="form-control">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" value="<% if (editing) { %><%= product.title %><% } %>">
    </div>
    <div class="form-control">
        <label for="imageUrl">Image URL</label>
        <input type="text" name="imageUrl" id="imageUrl" value="<% if (editing) { %><%= product.imageUrl %><% } %>">
    </div>
    <div class="form-control">
        <label for="price">Price</label>
        <input type="number" name="price" id="price" step="0.01" value="<% if (editing) { %><%= product.price %><% } %>">
    </div>
    <div class="form-control">
        <label for="description">Description</label>
        <textarea name="description" id="description" rows="5"><% if (editing) { %><%= product.description %><% } %></textarea>
    </div>
    <button class="btn" type="submit"><% if (editing) { %>Update Product<% } else { %>Add Product<% } %></button>
</form>
```

---

## Como ler as linhas confusas

Esta é difícil de ler:

```html
value="<% if (editing) { %><%= product.title %><% } %>"
```

Parte-se em **três blocos**:

```
<% if (editing) { %>      → "se estiver a editar..."
<%= product.title %>      → "...escreve o título"
<% } %>                   → fecha o if
```

Se **não** estiver a editar, não se escreve nada: `value=""`, e o campo fica vazio.

### Uma forma mais curta (o ternário da aula 92)

O mesmo, numa só tag:

```html
value="<%= editing ? product.title : '' %>"
```

*"Está a editar? Escreve o título. Senão, escreve nada."* Funciona igual, e é mais fácil de ler.

---

## O `textarea` é diferente

Um `<input>` tem o valor **no atributo `value`**. Um **`<textarea>`** tem o valor **entre as tags**:

```html
<input value="aqui">
<textarea>aqui</textarea>
```

---

## Testar

| URL | Resultado |
|---|---|
| `/admin/add-product` | Formulário **vazio**, botão **"Add Product"** |
| `/admin/edit-product/<um ID real>?edit=true` | Formulário **preenchido**, botão **"Update Product"** |

> 💡 Ainda não dá para **guardar** a edição: o `action` vai para `/admin/edit-product`, e essa rota POST ainda não existe. Fica para a aula 126.

---

## ✅ A reter

- **`editing`** (`true`/`false`) decide se o formulário é de **adicionar** ou **editar**.
- Todas as rotas que usam o `edit-product.ejs` têm de mandar o **`editing`**.
- No modo edição: **`findById`** → manda o **`product`** para a página.
- Preencher um campo: **`value="<%= editing ? product.title : '' %>"`**.
- **`<textarea>`** → o valor vai **entre as tags**.
- O **botão** e o **`action`** também mudam com o `editing`.