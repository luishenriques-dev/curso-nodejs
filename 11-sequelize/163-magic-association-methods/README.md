# 163. Using Magic Association Methods

**Secção 11 — Understanding Sequelize**

> **Em resumo:** a partir de agora, **cada produto novo fica associado ao utilizador** (por agora, o utilizador de teste). Há duas formas: escrever o **`userId: req.user.id`** à mão, ou usar o método "mágico" **`req.user.createProduct({...})`**, que o Sequelize cria sozinho por causa da associação da aula 161 e que preenche o `userId` automaticamente.

---

## Porque é que isto é possível

Juntam-se duas aulas anteriores:

| Aula | O que deu |
|---|---|
| **161** | A coluna **`userId`** na tabela `products` (com `belongsTo` / `hasMany`) |
| **162** | O utilizador guardado em **`req.user`**, disponível em todos os controllers |

---

## Forma 1 — À mão: `userId: req.user.id`

### `controllers/adminController.js` — o `postAddProduct`

```javascript
Product.create({
  title: title,
  price: price,
  imageUrl: imageUrl,
  description: description,
  userId: req.user.id
})
```

- **`userId`** é a coluna criada na aula 161.
- **`req.user.id`** é o id do utilizador que está no `req` (aula 162).

> ✍️ **Analogia:** é como **escrever o nome à mão** na ficha do produto. Funciona, mas tens de te lembrar sempre de o fazer.

---

## Forma 2 — A "mágica": `req.user.createProduct({...})` ✅

### `controllers/adminController.js` — o `postAddProduct`

```javascript
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    .then(result => {
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
```

**O que mudou:** `Product.create({...})` passa a **`req.user.createProduct({...})`**, **sem** o `userId`. O resto (`.then`, `.catch`, `redirect`) fica igual.

> 🔖 **Analogia:** é como usar um **carimbo** com o nome. Não tens de escrever nada: o carimbo já sabe quem és.

### De onde vem o `createProduct`?

Ninguém o escreveu. Como na aula 161 se disse **`User.hasMany(Product)`**, o Sequelize **inventa sozinho** métodos novos no utilizador:

```
create  +  Product (o nome do model)  =  createProduct
```

Só funciona porque o **`req.user`** é um **objeto Sequelize** (aula 162), e não um objeto JavaScript simples.

Passa-se **só** o que o Sequelize não consegue adivinhar: os campos do produto. O **`userId`** e as datas (`createdAt`/`updatedAt`) são preenchidos **automaticamente**.

> 💡 Há mais métodos "mágicos" deste género. A lista está na documentação do Sequelize, no artigo das **Associations**. Na próxima aula usa-se outro: o **`getProducts`**.

---

## As duas formas lado a lado

| | Forma 1 (à mão) | Forma 2 (mágica) |
|---|---|---|
| Código | `Product.create({ ..., userId: req.user.id })` | `req.user.createProduct({ ... })` |
| Quem preenche o `userId` | **Tu** | O **Sequelize** |
| Risco de te esqueceres | Sim | Não |
| SQL que corre | `INSERT INTO products (..., userId) VALUES (..., 1)` | **O mesmo** |

---

## Testar

1. **Add Product** → preenche o formulário → **Add Product**.
2. No Workbench: botão direito na base de dados → **Refresh All** → abre a tabela `products`.
3. O produto novo tem **`userId` = 1**, apesar de não o termos escrito no código.

---

## ✅ A reter

- Cada produto novo fica **associado ao utilizador**.
- Forma 1: **`userId: req.user.id`** à mão.
- Forma 2 (a do professor): **`req.user.createProduct({...})`**, que preenche o `userId` sozinho.
- O Sequelize **cria métodos "mágicos"** por causa das associações (`create` + nome do model).
- Só funciona porque o **`req.user`** é um **objeto Sequelize**.