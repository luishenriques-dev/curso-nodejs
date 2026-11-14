# 82. Outputting Dynamic Content

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> ⏭️ **Aula saltada (Pug).** Resumo só para referência. O que interessa para o EJS está na secção **🔧 O que muda no servidor**.

> **Em resumo:** o `res.render` recebe um **segundo argumento**: um **objeto com os dados** que a página pode usar. É assim que os produtos chegam ao template.

---

## 🔧 O que muda no servidor (precisas disto para o EJS)

### `shop.js`

```javascript
router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', { prods: products, docTitle: 'Shop' });
});
```

| Parte | O que faz |
|---|---|
| `adminData.products` | O array de produtos da aula 79 |
| `{ prods: products, ... }` | O **objeto com os dados** que vão para a página |
| `prods` | O **nome** com que a página vai conhecer os produtos |
| `docTitle: 'Shop'` | Um segundo dado: o título da página |

> ⚠️ Na aula 86, o `docTitle` muda de nome para **`pageTitle`**. É esse que vais usar no EJS.

### A ideia mais importante

**O nome da esquerda** (a chave do objeto) é o nome que **a página conhece**:

```
no .js:      res.render('shop', { prods: products })
                                   ↑
na página:   usa-se "prods", e não "products"
```

É como uma **etiqueta numa caixa**: o servidor põe os produtos numa caixa com a etiqueta `prods`, e a página só vê a etiqueta.

---

## O que se faz com os dados na página

Nesta aula aparecem as **três coisas** que qualquer templating engine faz. No EJS (aula 91) é a mesma ideia, com outra sintaxe:

| O quê | Para quê | No Pug |
|---|---|---|
| **Mostrar um valor** | O título da página | `#{docTitle}` |
| **Repetir para cada item** (ciclo) | Um cartão por produto | `each product in prods` |
| **Condição** (if/else) | Mostrar "No Products" se a lista estiver vazia | `if prods.length > 0` … `else` |

Dentro do ciclo, cada produto é um objeto `{ title: 'Book' }` (aula 79), por isso o título é **`product.title`**.

---

## Dois pormenores úteis

- Se só mudares um **template**, o nodemon **não reinicia** e não é preciso: o template é lido de novo a cada pedido.
- Se o servidor reiniciar, o array de produtos **fica vazio** (aula 79).

---

## ✅ A reter

- **`res.render('shop', { prods: products, ... })`** → os dados vão no **segundo argumento**.
- Na página usa-se o **nome da chave** (`prods`), e não o nome da variável no `.js`.
- As três coisas que um template faz: **mostrar um valor**, **repetir** e **condição**.