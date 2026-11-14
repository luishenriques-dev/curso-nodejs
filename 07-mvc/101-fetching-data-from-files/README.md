# 101. Fetching Data from Files Via the Model

**Secção 7 — The Model View Controller (MVC)**

> **Em resumo:** o erro da aula 100 vinha de o **`readFile` ser assíncrono**: o `fetchAll` acabava **antes** de o ficheiro ser lido, e devolvia `undefined`. A solução é um **callback**: o controller entrega ao `fetchAll` uma função que diz *"quando tiveres os produtos, corre isto"*.

---

## O problema (aula 100)

```javascript
static fetchAll() {
  fs.readFile(p, (err, fileContent) => {
    return JSON.parse(fileContent);   // ← devolve à função do readFile, e não ao fetchAll
  });
  // o fetchAll acaba aqui, sem return → undefined
}
```

```
1. fetchAll começa
2. readFile: "vai lendo, avisa quando acabares"
3. fetchAll ACABA logo → devolve undefined
4. a página recebe undefined → "Cannot read properties of undefined (reading 'length')"
5. ... só agora o ficheiro acabou de ser lido. Tarde demais
```

O `readFile` não espera: regista a função para depois e segue em frente. É o **event loop** da aula 34.

---

## A solução: um callback

Em vez de **devolver** os produtos (`return`), o `fetchAll` **recebe uma função** e **chama-a** quando os produtos estiverem prontos.

### `models/product.js` (o `fetchAll`)

```javascript
static fetchAll(cb) {
  const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}
```

| Parte | O que faz |
|---|---|
| `fetchAll(cb)` | Recebe uma **função** (`cb`, de *callback*) |
| `cb([])` | Se der erro (ainda não há ficheiro), chama a função com **um array vazio** |
| `cb(JSON.parse(...))` | Se correr bem, chama a função com **os produtos** |

> ⚠️ No vídeo, o professor escreve `if (err) { cb([]); }` **sem `else`**. Assim, quando dá erro, o código continua e também corre o `JSON.parse` de um ficheiro que não existe. Com o **`else`**, só corre um dos dois.

### `controllers/products.js` (o `getProducts`)

```javascript
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
  });
};
```

```
// antes
const products = Product.fetchAll();
res.render('shop', { prods: products, ... });

// agora
Product.fetchAll((products) => {
  res.render('shop', { prods: products, ... });   // só corre quando os produtos chegam
});
```

O `res.render` passa para **dentro** da função, porque só lá dentro é que os produtos já existem.

---

## Como a função viaja

```
controller:  Product.fetchAll( (products) => { res.render(...) } )
                                └────────────┬────────────┘
                                             ↓ entra como "cb"
model:       fetchAll(cb) → lê o ficheiro → cb(produtosLidos)
                                             ↓
controller:  (products) => { res.render(...) }   ← products = produtosLidos
```

O que passas ao **`cb(...)`** no model é o que chega como **`products`** no controller.

---

## Já conheces isto: é o que o `readFile` faz

| | Quem recebe a função | Quem a chama |
|---|---|---|
| `fs.readFile(p, (err, data) => {...})` | O `readFile`, que é do Node | O Node, quando acaba de ler |
| `Product.fetchAll((products) => {...})` | O `fetchAll`, que **escreveste tu** | O teu `fetchAll`, quando acaba de ler |

A diferença é que agora **escreves os dois lados**.

---

## A analogia: "liga-me quando estiver pronto" 📞

Lembra-te da aula 97: passar uma função **sem `()`** é como dar **o teu número de telefone**.

- **Antes:** pedias o caderno e ficavas de mãos estendidas, mas a pessoa ainda ia a caminho da gaveta. Recebias **nada**.
- **Agora:** dizes *"vai buscar o caderno e **liga-me** quando o tiveres"*, e deixas o número (o callback). Quando a pessoa volta, liga-te e entrega-to. Só **nessa altura** mostras a página.

---

## ✅ A reter

- **`readFile` é assíncrono**: um `return` dentro dele **não** devolve à função de fora.
- Solução: **callback**. O `fetchAll(cb)` chama **`cb(produtos)`** quando os tem.
- No controller, o **`res.render` vai para dentro** da função passada ao `fetchAll`.
- Usar **`if/else`** para não correr o `JSON.parse` quando há erro.
- Os produtos já **sobrevivem** a um reinício do servidor, porque vêm do ficheiro.