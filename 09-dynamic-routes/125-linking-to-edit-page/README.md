# 125. Linking to the Edit Page

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** o botão **Edit** na página de produtos do admin passa a levar ao formulário de edição **do produto certo**: com o **ID** no caminho e o **`?edit=true`** no fim. Prepara-se também a rota **POST** para guardar a edição.

---

## O código desta aula

### `views/admin/products.ejs` — o botão Edit

```html
<a href="/admin/edit-product/<%= product.id %>?edit=true" class="btn">Edit</a>
```

| Parte | O que faz |
|---|---|
| `/admin/edit-product/` | A rota de edição (aula 123) |
| `<%= product.id %>` | O **ID** do produto deste cartão → `req.params.productId` |
| `?edit=true` | O **query param** → `req.query.edit` |

### ⚠️ O erro do professor: esqueceu-se do `?edit=true`

Primeiro escreveu o link **só com o ID**, e ao clicar em Edit era **redirecionado** para a página inicial. Porquê?

```javascript
const editMode = req.query.edit;   // sem ?edit=true → undefined
if (!editMode) {
  return res.redirect('/');        // → redireciona
}
```

O controller da aula 123 **exige** o `?edit=true`. Por isso, o link **tem de o levar**.

---

### `routes/admin.js` — a rota POST para guardar

```javascript
router.post('/edit-product', adminController.postEditProduct);
```

**Sem `:productId`!** Num pedido **POST**, os dados vão no **corpo do pedido** (aula 121). O ID vai lá também, num input escondido (próxima aula).

| Rota | Método | Para quê |
|---|---|---|
| `/edit-product/:productId` | **GET** | **Mostrar** o formulário preenchido. O ID vai no URL |
| `/edit-product` | **POST** | **Guardar** a edição. O ID vai no corpo |

### `controllers/admin.js` — o controller (ainda vazio)

```javascript
exports.postEditProduct = (req, res, next) => {
  // próxima aula
};
```

A ideia: criar um produto **com os dados novos** e **substituir** o antigo. Para isso, o **model** precisa de ser ajustado, o que fica para a aula 126.

---

## Testar

1. Vai a **Admin Products**.
2. Clica em **Edit** num produto.
3. Aparece o formulário **preenchido** com esse produto.

> 💡 Carregar em **Update Product** ainda **não faz nada**, porque o `postEditProduct` está vazio.

---

## ✅ A reter

- Link de edição: **`/admin/edit-product/<%= product.id %>?edit=true`**.
- Sem o **`?edit=true`**, o controller **redireciona**.
- **GET** `/edit-product/:productId` → mostra. **POST** `/edit-product` → guarda, com o ID no **corpo**.