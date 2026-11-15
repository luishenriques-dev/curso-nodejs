# 117. Adding the Product ID to the Path

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** cada produto passa a ter um **ID único**, criado no `save()`. Na lista de produtos aparece um botão **Details** que leva a **`/products/<id>`**. A página ainda dá 404: ler o ID do URL fica para a aula 118.

---

## 📖 Antes de começar: o model, explicado de forma simples

Imagina um **caderno** onde se apontam os produtos. O caderno é o ficheiro **`data/products.json`**. Cada produto é uma **ficha**.

### Quem faz o quê

| Quem | Papel |
|---|---|
| **Controller** | Atende os pedidos. **Nunca mexe no caderno diretamente**: só diz *"guarda"* ou *"dá-me tudo"* |
| **Model** (`models/product.js`) | É quem **sabe ler e escrever** no caderno |

### As funções do model

| Função | Em português |
|---|---|
| `constructor` | **Preenche uma ficha** com os dados (título, imagem, descrição, preço) |
| `getProductsFromFile` | **Lê o caderno** e entrega a lista de fichas |
| `save` | **Guarda uma ficha nova**: lê o caderno → junta a ficha → reescreve o caderno |
| `fetchAll` | **Dá a lista toda**: lê o caderno e entrega a lista ao controller |

> 💡 *fetch all* = "ir buscar todos".

### História 1 — alguém adiciona um produto

```javascript
// controller
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;                 // 1. tira os dados do formulário
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);   // 2. preenche uma ficha
  product.save();                               // 3. "guarda-a no caderno"
  res.redirect('/');                            // 4. volta à página inicial
};
```

### História 2 — alguém abre a lista de produtos

```javascript
// controller
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {                // 1. "dá-me todas as fichas"
    res.render('admin/products', {              // 2. quando as tiveres, mostra a página
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
```

### Por dentro do model

**A ficha:**

```javascript
constructor(title, imageUrl, description, price) {
  this.title = title;              // "this" = esta ficha
  this.imageUrl = imageUrl;
  this.description = description;
  this.price = price;
}
```

**Ler o caderno:**

```javascript
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {     // abre o caderno
    if (err) {
      cb([]);                                // não há caderno? → lista vazia
    } else {
      cb(JSON.parse(fileContent));           // há? → a lista de fichas
    }
  });
};
```

O **`cb`** é *"a quem entrego a lista quando acabar de ler"*. Ler o ficheiro demora um bocadinho, por isso não dá para fazer `return` (aula 101).

**Guardar uma ficha nova:**

```javascript
save() {
  getProductsFromFile(products => {          // 1. lê o caderno → recebe a lista
    products.push(this);                     // 2. junta esta ficha à lista
    fs.writeFile(p, JSON.stringify(products), err => {   // 3. reescreve o caderno todo
      console.log(err);
    });
  });
}
```

Não dá para acrescentar só uma linha ao ficheiro, por isso faz-se **ler → juntar → escrever**.

**Dar a lista toda:**

```javascript
static fetchAll(cb) {
  getProductsFromFile(cb);                   // lê e entrega diretamente ao controller
}
```

---

## O que muda nesta aula

### 1. Cada produto ganha um ID — `models/product.js`

```javascript
save() {
  this.id = Math.random().toString();        // ← nova linha: dá um ID à ficha
  getProductsFromFile(products => {
    products.push(this);
    fs.writeFile(p, JSON.stringify(products), err => {
      console.log(err);
    });
  });
}
```

| Parte | O que faz |
|---|---|
| `this.id = ...` | Junta à ficha um campo novo: o **`id`** |
| `Math.random()` | Um número aleatório, por exemplo `0.4827361...` |
| `.toString()` | Transforma-o em **texto**: `"0.4827361..."` |

> ⚠️ O `Math.random()` **não garante** que dois produtos nunca tenham o mesmo ID, mas a hipótese é mínima. Serve para treinar. Mais tarde, a base de dados cria os IDs sozinha.

**Porquê um ID?** Para identificar **cada produto** sem confusão. Dois produtos podem ter o mesmo título ("Book"), mas nunca o mesmo ID.

### 2. Botão "Details" — `views/shop/product-list.ejs`

Nas ações de cada cartão de produto:

```html
<a href="/products/<%= product.id %>" class="btn">Details</a>
```

| Parte | O que faz |
|---|---|
| `<a ... class="btn">` | Um **link** com aspeto de botão |
| `/products/<%= product.id %>` | O caminho leva **o ID do produto**: `/products/0.4827361...` |

Cada produto tem o **seu** link, com o **seu** ID.

### 3. Os produtos antigos não têm ID

Os produtos que já estavam no `products.json` foram guardados **antes** desta aula, por isso **não têm `id`**, e o link deles fica `/products/` sem nada. Duas soluções:

- **apagar** os produtos do `data/products.json`, e adicionar novos;
- ou **acrescentar à mão** um `"id"` a cada um, por exemplo `"id": "123"`.

---

## Testar

1. Adiciona um produto novo.
2. Na loja, passa o rato por cima de **Details**: o link termina em **`/products/<um número>`**.
3. Clica: aparece a **página 404**. É normal, porque ainda nenhuma rota trata deste caminho. Fica para a **aula 118**.

---

## Porquê o ID no URL?

Não dá para pôr **o produto inteiro** no URL. Mas dá para pôr **a informação-chave**: o ID. Com ele, o controller vai ao model e **encontra o produto certo**.

```
/products/123  →  controller: "qual é o 123?"  →  model procura no caderno  →  mostra o produto
```

---

## 💡 Nota sobre o snapshot

O código do professor usa **`process.mainModule.filename`**, que está **desatualizado** (aula 72). Podes trocar por **`require.main.filename`**: faz o mesmo.

---

## ✅ A reter

- **`save`** escreve no caderno, **`fetchAll`** lê o caderno. O controller só **pede**; o model é que **faz**.
- **`this.id = Math.random().toString();`** no `save()` → cada produto ganha um **ID**.
- Link **`/products/<%= product.id %>`** → cada produto tem o seu caminho.
- Os produtos antigos **não têm ID**: apagar ou acrescentar à mão.
- Próxima aula: **ler o ID do URL** na rota.