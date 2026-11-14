# 99. Adding a Product Model

**Secção 7 — The Model View Controller (MVC)**

> **Em resumo:** o array `products` e o `push` **saem do controller** e vão para um **model**: `models/product.js`. O model oferece ao controller **dois "botões"**: **`save()`** para guardar e **`fetchAll()`** para ir buscar todos. O controller deixa de saber **onde e como** os produtos são guardados.

---

## Ideia 1 — O que sai do controller

Estas duas coisas saem do controller e vão para o model:

```javascript
const products = [];          // onde os produtos estão guardados
products.push({ ... });       // guardar um produto
```

É **mudar código de sítio**, como na aula 97 com as rotas.

---

## Ideia 2 — Os dois "botões"

O model fica com o array, e dá ao controller **duas funções** para mexer nele. Escrito com funções normais, seria assim:

```javascript
const products = [];

function save(produto) {
  products.push(produto);     // o push que saiu do controller
}

function fetchAll() {
  return products;            // devolve o array todo
}
```

| Botão | Para quê |
|---|---|
| **`save()`** | **Guardar** um produto |
| **`fetchAll()`** | **Ir buscar** todos |

---

## Ideia 3 — A classe (como o professor escreve)

O professor escreve o mesmo, mas com uma **classe**: uma **fôrma para criar produtos**.

### `models/product.js`

```javascript
const products = [];

module.exports = class Product {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
};
```

> 💡 O `price` é do meu desafio da aula 91. O professor só tem o `title`.

| Parte | O que quer dizer |
|---|---|
| `class Product` | A **fôrma** chama-se `Product`, com **maiúscula**, por convenção para as classes |
| `constructor(title, price)` | Corre quando **crias** um produto: guarda os dados nele |
| `this` | **"Este produto"**, aquele que estás a criar ou a guardar |
| `save()` | Guarda **este** produto no array |
| `static fetchAll()` | Devolve todos. O **`static`** quer dizer que é **da fôrma**, e não de um produto |

### Porquê o `static`?

- Para **guardar**, precisas de **um produto concreto**: *"guarda o Book"* → `product.save()`.
- Para **buscar todos**, não precisas de nenhum produto: pedes **à fôrma** → `Product.fetchAll()`.

Sem o `static`, terias de criar um produto falso só para chamar o `fetchAll`.

---

## O controller com o model

### `controllers/products.js` (o que muda)

```javascript
const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
};
```

| Linha | O que faz |
|---|---|
| `require('../models/product')` | Sobe para a raiz e entra em **`models`** |
| `new Product(...)` | Usa a fôrma: **cria um produto** com o título e o preço |
| `product.save()` | Carrega no botão **guardar** |
| `Product.fetchAll()` | Pede **à fôrma** todos os produtos |

O **`const products = []`** e o **`push`** já **não aparecem** no controller.

---

## Porque é que isto vale a pena

Agora parece **mais complicado** para fazer o mesmo, e é. Mas:

- na **próxima aula**, os produtos passam a ser guardados num **ficheiro**;
- mais tarde, numa **base de dados**.

Nos dois casos, **só o model muda**. O controller continua a chamar `save()` e `fetchAll()`, sem saber o que acontece lá dentro.

---

## ⚠️ Erros comuns

| Erro | Causa | Correção |
|---|---|---|
| `Cannot find module '../productModel'` | Falta a pasta no caminho | **`'../models/nome-do-ficheiro'`** |
| `Cannot read property 'length'` | O `fetchAll` devolve **`this.products`** em vez de **`products`** | O array está **fora** da classe: `return products;` |

---

## ✅ A reter

- **Model** = quem guarda e vai buscar os dados. Pasta **`models/`**, nome no **singular** (`product.js`), porque representa **um** produto.
- **Classe** = fôrma. **`new Product(...)`** cria um produto. **`this`** = este produto.
- **`product.save()`** → guarda um produto. **`Product.fetchAll()`** → `static`, pede todos à fôrma.
- O controller **não sabe onde** os dados estão: só chama os "botões".