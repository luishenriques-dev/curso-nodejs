# 119. Loading Product Detail Data

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** o model ganha uma função nova, **`findById`**: *"dá-me a ficha com este ID"*. O controller usa o ID que veio no URL (aula 118) para pedir **esse produto** ao model.

---

## A ideia, com o caderno 📒

Até agora, o model sabia fazer duas coisas com o caderno:

| Função | Em português |
|---|---|
| `save` | Guarda uma ficha nova |
| `fetchAll` | Dá **todas** as fichas |

Agora ganha uma terceira:

| Função | Em português |
|---|---|
| **`findById`** | Dá **só a ficha com este ID** |

---

## Passo 1 — O model: `findById`

### `models/product.js`

```javascript
static findById(id, cb) {
  getProductsFromFile(products => {
    const product = products.find(p => p.id === id);
    cb(product);
  });
}
```

Linha a linha:

| Linha | Em português |
|---|---|
| `findById(id, cb)` | Recebe **o ID** que se procura e **a quem entregar** o resultado (`cb`) |
| `getProductsFromFile(products => {` | Lê o caderno **todo**. Não há base de dados, por isso não dá para ler só uma ficha |
| `products.find(p => p.id === id)` | **Procura** na lista a ficha cujo `id` é igual ao que se pediu |
| `cb(product)` | Entrega essa ficha a quem pediu |

> 💡 **`static`**, como o `fetchAll`: para procurar um produto, **ainda não tens** nenhum produto. Pede-se à fôrma (aula 99).

### O `find`

O **`find`** é um método normal dos arrays de JavaScript. **Passa por cada elemento** da lista e devolve **o primeiro** para o qual a função dá `true`.

```javascript
products.find(p => p.id === id)
```

```
lista:  [ {id:"0.1", title:"Book"}, {id:"0.2", title:"Pen"}, {id:"0.3", title:"Mug"} ]
procura id === "0.2"
   "0.1" === "0.2"? não
   "0.2" === "0.2"? sim → devolve {id:"0.2", title:"Pen"}
```

É como **folhear o caderno** até encontrar a ficha com aquele número.

### A seta curta `p => p.id === id`

Quando uma função seta tem **só uma linha**, podes tirar as `{ }` e o `return`. O resultado dessa linha é **devolvido sozinho**.

```javascript
p => p.id === id
// é o mesmo que:
(p) => { return p.id === id; }
```

---

## Passo 2 — O controller usa o `findById`

### `controllers/shop.js`

```javascript
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;          // o ID que veio no URL (aula 118)
  Product.findById(prodId, product => {         // "dá-me a ficha com este ID"
    console.log(product);                       // por agora, só mostra no terminal
  });
  res.redirect('/');
};
```

```
/products/0.2  →  req.params.productId = "0.2"
               →  Product.findById("0.2", ...)
               →  model folheia o caderno → encontra a ficha "0.2"
               →  console.log mostra o produto
```

> 💡 Por agora, o produto **só aparece no terminal**. Na próxima aula, aparece numa **página de detalhe**.

---

## Testar

1. Clica em **Details** num produto.
2. No **terminal** aparece **o produto inteiro**: título, imagem, preço, descrição e ID.
3. Adiciona outro produto, clica no **Details** dele, e aparece **esse**.

> 💡 Se o `imageUrl` aparecer **enorme**, é porque a imagem está em **base64**: a imagem escrita como texto, em vez de um link para um ficheiro. É normal.

---

## ✅ A reter

- **`findById(id, cb)`** no model → *"dá-me a ficha com este ID"*.
- Lê o caderno **todo** e **procura** com o **`find`**.
- **`find`** → devolve o **primeiro** elemento para o qual a função dá `true`.
- **`p => p.id === id`** → seta curta: sem `{}` nem `return`.
- No controller: **`Product.findById(prodId, product => {...})`**.
- Próxima aula: mostrar o produto numa **página de detalhe**.e