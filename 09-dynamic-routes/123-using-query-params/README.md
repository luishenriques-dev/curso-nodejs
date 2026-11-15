# 123. Using Query Params

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** começa a funcionalidade de **editar produtos**. O formulário de "Add Product" passa a servir **também para editar** (`edit-product.ejs`). A rota de edição leva o **ID no caminho** e um **query param** `?edit=true`, que se lê com **`req.query.edit`**.

---

## O que são query params

São **dados extra** no fim do URL, depois de um **`?`**:

```
/admin/edit-product/123?edit=true
                    ↑   ↑
     route param ───┘   └─── query param
```

| | Como se escreve | Vários? |
|---|---|---|
| Um | `?edit=true` | — |
| Vários | `?edit=true&title=novo` | Separados por **`&`** |

| | Route params (aula 118) | Query params |
|---|---|---|
| Exemplo | `/edit-product/123` | `?edit=true` |
| Escreve-se na rota? | **Sim**: `/:productId` | **Não**: a rota **não muda** |
| Lê-se com | `req.params.productId` | **`req.query.edit`** |
| Obrigatório? | Sim | **Não**: é **opcional** |

> 💡 A **rota** é decidida só pela parte **antes do `?`**. Tudo o que vem depois **não afeta** que rota é escolhida.

### Para que se usam

Para **informação opcional**: um **filtro** que o utilizador escolheu, um **modo** da página (como aqui, `edit`), ou para **seguir** de onde vem um utilizador.

---

## O que muda nesta aula

### 1. Um só formulário para adicionar e editar

O formulário de **editar** é **igual** ao de **adicionar**, só que já preenchido. Por isso, o professor:

- **move** o conteúdo do `views/admin/add-product.ejs` para o **`views/admin/edit-product.ejs`**;
- **apaga** o `add-product.ejs`.

O `edit-product.ejs` passa a servir **para os dois**.

### 2. `controllers/admin.js` — o `getAddProduct` usa o novo ficheiro

```javascript
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};
```

Também saíram o `formsCSS`, o `productCSS` e o `activeAddProduct`: eram do Handlebars (aula 90) e não faziam nada.

### 3. `controllers/admin.js` — o novo `getEditProduct`

```javascript
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;          // lê o ?edit=... do URL
  if (!editMode) {
    return res.redirect('/');               // sem ?edit → volta à página inicial
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode
  });
};
```

| Parte | O que faz |
|---|---|
| `req.query.edit` | O valor de `edit` no URL. Se **não vier**, é **`undefined`**, que conta como **falso** |
| `if (!editMode)` | Sem `?edit=true` → **redireciona** |
| `return res.redirect(...)` | O **`return`** para a função aqui, para não correr também o `render` |
| `editing: editMode` | Diz à página que está em **modo edição**. É usado na próxima aula |
| `path: '/admin/edit-product'` | Nenhum link do menu tem este caminho, por isso **nenhum fica destacado** |

> 💡 O professor admite que o `?edit=true` é **redundante**: a rota já diz que é para editar. Está aqui só **para mostrar** como se usam os query params.

> ⚠️ Os query params chegam **sempre como texto**. `?edit=false` daria `"false"`, que é um texto **não vazio**, e conta como **verdadeiro**! Aqui não faz mal, mas convém saber.

### 4. `routes/admin.js` — a rota de edição

```javascript
router.get('/edit-product/:productId', adminController.getEditProduct);
```

Leva o **ID** como route param. O `?edit=true` **não aparece** na rota.

---

## Testar

| URL | Resultado |
|---|---|
| `/admin/add-product` | O formulário, para **adicionar** (continua a funcionar) |
| `/admin/edit-product/123?edit=true` | O formulário, com o título **Edit Product** |
| `/admin/edit-product/123` (sem `?edit`) | **Redireciona** para a página inicial |

> 💡 Por agora, o formulário de editar ainda aparece **vazio**. Preenchê-lo com os dados do produto é a próxima aula.

---

## ✅ A reter

- **Query params** → `?chave=valor`, vários com **`&`**. **Opcionais**.
- Lêem-se com **`req.query.chave`**. **Não** se escrevem na rota.
- Se não vier → **`undefined`**, que conta como falso.
- Chegam **sempre como texto**.
- **Um só formulário** (`edit-product.ejs`) para **adicionar e editar**.
- **`return res.redirect(...)`** → para a função, para não fazer também o `render`.