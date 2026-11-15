# 145. Fetching a Single Product with the "where" Condition

**Secção 10 — SQL Introduction**

> **Em resumo:** o **`findById`** passa a usar o MySQL: um **`SELECT`** com **`WHERE`** para ir buscar **só um** produto. No controller, o resultado continua a ser um **array** (com um só elemento), por isso o produto é **`product[0]`**.

---

## O código desta aula

### `models/productModel.js` — o `findById`

```javascript
static findById(id) {
  return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
}
```

### `controllers/shopController.js` — o detalhe do produto

```javascript
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};
```

> 💡 No meu projeto, a função chama-se **`getProductId`** (aula 119). O nome tem de bater certo com o da rota, em `routes/shop.js`.

---

## O `WHERE`

```sql
SELECT * FROM products WHERE products.id = ?
```

| Parte | Quer dizer |
|---|---|
| `SELECT *` | Todas as **colunas** (e não "todas as linhas") |
| `FROM products` | Da tabela `products` |
| **`WHERE products.id = ?`** | **Só** as linhas onde o `id` é igual ao valor dado |

- O **`WHERE`** **filtra as linhas**: é o **`find`** da aula 119, mas feito **pelo MySQL**. Já não é preciso ler a tabela toda.
- No SQL, a igualdade é **um só `=`**. No JavaScript era `===`.
- O **`?`** + **`[id]`** → o ID entra **de forma segura** (aula 144). O ID vem do URL, ou seja, do utilizador.

> 💡 `products.id` é o mesmo que só `id`: o nome da tabela à frente deixa claro **de que tabela** é a coluna.

---

## ⚠️ O erro (que eu e o professor tivemos)

```javascript
.then(([product]) => {
  res.render('shop/product-detail', { product: product, ... });   // ❌
```

Um **`SELECT`** devolve **sempre um array de linhas**, **mesmo que só encontre uma**:

```javascript
product = [ { id: 2, title: 'A Book', price: 9.99, ... } ]
```

A página de detalhe espera **um produto** (um objeto), e não **uma lista com um produto**. Por isso:

```javascript
product: product[0],            // ✅ o primeiro (e único) elemento
pageTitle: product[0].title,    // ✅
```

> 📦 **Analogia:** o MySQL entrega sempre **uma caixa** com as fichas que encontrou. Mesmo que só haja uma, vem **dentro da caixa**. O `[0]` é **tirar a ficha da caixa**.

> 💡 **Mudar o nome não muda o conteúdo.** Chamar `product` em vez de `rows` não transforma o array num objeto: continua a ser a caixa.

### Os meus outros erros pelo caminho

| Erro | Porquê |
|---|---|
| `Product.findById()` sem o `prodId` | O model não sabe **qual** produto procurar |
| `pageTitle: product.title`, com o `product` só como **chave** do objeto | Uma **chave** (`product:`) não é uma **variável**: não se pode usar logo a seguir |

---

## Testar

Na lista de produtos, clica em **Details**: aparece a página do produto, com os dados **vindos do MySQL**.

---

## ✅ A reter

- **`SELECT * FROM tabela WHERE coluna = ?`** → só as linhas que cumprem a condição.
- No SQL, **um `=`**.
- O resultado é **sempre um array**, mesmo com um só elemento → **`[0]`** para o tirar.
- Nesta secção ficam a funcionar: **ver todos**, **adicionar** e **ver um**. Editar, apagar e o carrinho ficam para a **secção 11** (Sequelize).