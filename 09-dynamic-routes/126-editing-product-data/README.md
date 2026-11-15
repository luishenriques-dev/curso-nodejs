# 126. Editing the Product Data

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** a edição passa a **ser guardada**. O **`save()`** do model passa a fazer **duas coisas**: se o produto **já tem ID**, **substitui** o antigo; se **não tem**, **cria** um novo. O formulário manda o ID num **input escondido**.

---

## A ideia, com o caderno 📒

Até agora, o `save()` fazia sempre o mesmo: **dava um número novo à ficha** e **juntava-a** ao caderno.

Agora, primeiro **olha para a ficha**:

| A ficha já tem número (ID)? | O que o `save()` faz |
|---|---|
| **Não** → é um produto **novo** | Dá-lhe um número e **junta-a** ao caderno (como antes) |
| **Sim** → é uma **edição** | Procura a página com esse número e **substitui-a** pela ficha nova |

Assim, o **mesmo `save()`** serve para **adicionar** e para **editar**.

---

## O código desta aula

### 1. `models/product.js` — o `constructor` recebe o ID

```javascript
constructor(id, title, imageUrl, description, price) {
  this.id = id;                       // ← novo: primeiro argumento
  this.title = title;
  this.imageUrl = imageUrl;
  this.description = description;
  this.price = price;
}
```

### 2. `models/product.js` — o `save()` com as duas opções

```javascript
save() {
  getProductsFromFile(products => {
    if (this.id) {
      // EDITAR: já tem ID → substitui o antigo
      const existingProductIndex = products.findIndex(prod => prod.id === this.id);
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = this;
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      });
    } else {
      // ADICIONAR: não tem ID → cria um e junta
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    }
  });
}
```

| Parte | O que faz |
|---|---|
| `if (this.id)` | A ficha **tem ID**? (`null` conta como **falso**) |
| `findIndex(prod => prod.id === this.id)` | Em que **posição** do caderno está a ficha antiga (aula 122) |
| `[...products]` | Faz uma **cópia** da lista |
| `updatedProducts[existingProductIndex] = this` | **Troca** a ficha antiga pela nova, nessa posição |
| `else { ... }` | O código de antes, para produtos novos |

> 💡 O `this.id = Math.random()...` passou para **dentro do `else`**: só se cria um ID novo quando **não** há um.
> 💡 O `writeFile` **substitui** sempre o ficheiro inteiro. Não junta: escreve a lista toda de novo.

### 3. `views/admin/edit-product.ejs` — o ID num input escondido

Dentro do `<form>`:

```html
<% if (editing) { %>
    <input type="hidden" value="<%= product.id %>" name="productId">
<% } %>
```

Só aparece **no modo edição**: um produto novo ainda não tem ID. É a técnica da **aula 121**.

### 4. `controllers/admin.js` — `postAddProduct` manda `null`

```javascript
const product = new Product(null, title, imageUrl, description, price);
```

> ⚠️ **Muito importante.** O `constructor` agora recebe o **ID primeiro**. Se te esqueceres do `null`, o **título vai parar ao `id`**, a imagem ao `title`, e por aí fora. E como o "id" passa a ter um valor, o `save()` pensa que é uma **edição**!

### 5. `controllers/admin.js` — o `postEditProduct`

```javascript
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;              // do input escondido
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,                                       // ← com ID → o save() vai EDITAR
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};
```

Os nomes em `req.body.____` têm de ser **iguais** aos `name` dos inputs do formulário.

> ⚠️ O professor esqueceu-se do **`res.redirect`** no início, e o browser ficou **à espera** de uma resposta que nunca veio. Um controller tem **sempre** de responder (aula 61).

---

## O caminho completo da edição

```
1. Admin Products → clica em Edit
       → GET /admin/edit-product/123?edit=true          (aula 125)
2. Formulário preenchido, com o ID escondido              (aulas 124 e 126)
3. Alteras e carregas em "Update Product"
       → POST /admin/edit-product, com o productId no corpo
4. postEditProduct → new Product(prodId, ...) → save()
5. save(): tem ID → substitui no caderno
6. redirect → /admin/products, já com as alterações
```

---

## Testar

1. Em **Admin Products**, clica em **Edit** num produto.
2. Muda o título, o preço ou a descrição, e carrega em **Update Product**.
3. Voltas a **Admin Products**, já com as alterações.
4. No `data/products.json`, o produto mudou, e **não** apareceu nenhum produto novo.
5. Adiciona também um produto **novo**: deve continuar a funcionar.

---

## ✅ A reter

- O **`save()`** serve para **adicionar e editar**: **tem ID → substitui**; **não tem → cria**.
- O `constructor` recebe o **ID primeiro**. Para um produto novo: **`new Product(null, ...)`**.
- O ID vai no formulário num **`<input type="hidden">`**, só no modo edição.
- Substituir num array: **`findIndex`** + cópia **`[...lista]`** + **`lista[posição] = novo`**.
- O controller tem **sempre** de responder: **`res.redirect(...)`**.