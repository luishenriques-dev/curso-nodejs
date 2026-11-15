# 143. Fetching Products - Time to Practice

**Secção 10 — SQL Introduction**

> **Em resumo:** a tarefa da aula 142: pôr a página **Products** (`/products`) a ir buscar os produtos **ao MySQL**, como o `getIndex`. Fi-la sozinho, usando o `getIndex` como exemplo.

---

## A tarefa

O **`getProducts`** ainda usava o **callback** antigo, mas o `fetchAll` já devolve uma **promise**. Por isso, a página `/products` dava erro.

---

## A minha solução

### `controllers/shopController.js`

```javascript
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};
```

| Parte | O que faz |
|---|---|
| `Product.fetchAll()` | Pede os produtos ao model, e recebe uma **promise** |
| `.then(([rows, fieldData]) => {...})` | Quando chegam, tira as **linhas** (os produtos) com a desestruturação |
| `res.render(...)` | Mostra a página, **dentro** do `.then` |
| `.catch(err => ...)` | Se houver erro, mostra-o no terminal **sem desligar o servidor** |

---

## O que o professor acrescenta

### O `fieldData` pode sair

Como os metadados **não são usados**, não é preciso tirá-los:

```javascript
.then(([rows]) => {
  res.render('shop/product-list', { prods: rows, ... });
})
```

A desestruturação **só tira o que pedes**: aqui, só o primeiro elemento. O `fieldData` estava lá só para mostrar como se tiram **vários** elementos de um array.

### Código repetido

O `getIndex` e o `getProducts` ficaram **quase iguais**: só muda a página e o título. Dava para criar uma **função partilhada**, como o `getProductsFromFile` da aula 102. O professor só o menciona, e não o faz.

---

## O que aprendi

- **Esqueci-me do `.catch`** na primeira versão. Regra: **sempre que há um `.then`, junta-se um `.catch`**. No Node atual, um erro numa *promise* sem `.catch` **desliga o servidor**.
- Usar um exemplo que já funciona (o `getIndex`) e **adaptá-lo** é uma boa forma de resolver problemas: saber **onde procurar** faz parte de saber programar.

---

## ✅ A reter

- Trocar callback por promise: **`fetchAll(cb)`** → **`fetchAll().then(...)`**.
- O `res.render` vai **dentro do `.then`**.
- **`.then`** → sempre com **`.catch`**.