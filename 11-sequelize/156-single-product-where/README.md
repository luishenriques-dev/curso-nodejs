# 156. Getting a Single Product with the "where" Condition

**Secção 11 — Understanding Sequelize**

> **Em resumo:** para ir buscar **um** produto, usa-se **`Product.findByPk(id)`**, que entrega **logo o produto** (e não um array). Também dá para usar o **`findAll({ where: { id: ... } })`**, mas esse devolve **sempre um array**. O professor mostra os dois, e prefere o `findByPk`.

---

## Forma 1 — `findByPk` (a preferida)

### `controllers/shopController.js`

```javascript
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};
```

> ⚠️ No vídeo, o professor escreve **`findById`**, porque o curso usa uma versão antiga do Sequelize. Na versão atual dá **`findById is not a function`**: é **`findByPk`** (aula 154).

### Comparação com a secção 10

```javascript
// Secção 10 (mysql2, aula 145)
Product.findById(prodId)
  .then(([product]) => {
    res.render(..., { product: product[0], pageTitle: product[0].title, ... });
  })

// Secção 11 (Sequelize)
Product.findByPk(prodId)
  .then(product => {
    res.render(..., { product: product, pageTitle: product.title, ... });
  })
```

Com o `findByPk`, **acabou-se a caixa**: o Sequelize sabe que só pode haver **um** produto com aquela chave primária, e entrega-o **diretamente**. Sem `[product]` e sem `[0]`.

---

## Forma 2 — `findAll` com `where`

```javascript
Product.findAll({ where: { id: prodId } })
  .then(products => {
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products[0].title,
      path: '/products'
    });
  })
  .catch(err => console.log(err));
```

| | `findByPk(id)` | `findAll({ where: {...} })` |
|---|---|---|
| Procura por | Só a **chave primária** | **Qualquer coluna**: preço, título… |
| Devolve | **O produto** | **Um array**, mesmo com um só |
| Precisa do `[0]`? | Não | **Sim** |
| SQL | `SELECT ... WHERE id = ?` | `SELECT ... WHERE id = ?` |

> 📦 O `findAll` volta a entregar **a caixa**: mesmo que só encontre um, vem num array. Daí o **`products[0]`**.

> ⚠️ O professor esqueceu-se do `[0]` no **`pageTitle`**, e deu `product is not defined`. O `[0]` tem de estar **nos dois** sítios.

### O que mais dá para fazer com o `findAll`

| Opção | Exemplo | SQL equivalente |
|---|---|---|
| `where` | `{ where: { price: 9.99 } }` | `WHERE price = 9.99` |
| `attributes` | `{ attributes: ['title'] }` | `SELECT title` (só essa coluna) |
| Operadores | maior que, menor que, "ou"… | `>`, `<`, `OR` |

Está tudo na documentação do Sequelize: **sequelize.org** → *Model Querying*.

**Quando usar cada um:** para **um registo pelo ID** → **`findByPk`**. Para **filtrar por outra coisa** → **`findAll({ where })`**.

---

## Bónus: imagem mais pequena (CSS)

Na página de detalhe, a imagem ficava enorme.

### `views/shop/product-detail.ejs`

```html
<div class="image">
    <img src="<%= product.imageUrl %>" alt="<%= product.title %>">
</div>
```

### `public/css/main.css`

```css
.image {
  height: 20rem;
}

.image img {
  height: 100%;
}
```

---

## ✅ A reter

- **`findByPk(id)`** → **um** registo, pelo `id`, entregue **diretamente**.
- **`findAll({ where: {...} })`** → **filtrar** por qualquer coluna. Devolve **sempre um array** → `[0]`.
- No vídeo é `findById`, mas agora é **`findByPk`**.
- O **CRUD** até agora: **C** (`create`) ✅, **R** (`findAll`, `findByPk`) ✅.