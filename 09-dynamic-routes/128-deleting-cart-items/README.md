# 128. Deleting Cart Items

**Secção 9 — Dynamic Routes & Advanced Models**

> ⏭️ **Aula saltada (carrinho).** Resumo só para referência.

> **Em resumo:** quando um produto é **apagado da loja**, também tem de **sair do carrinho**, para o carrinho não ficar com um produto que já não existe. O `Cart` ganha um **`deleteProduct`**, e o `deleteById` do `Product` chama-o.

---

## ⚠️ No meu projeto

Como **saltei o carrinho**, o meu `Product.deleteById` (aula 127) **não chama o `Cart.deleteProduct`**. Só apaga o produto do `products.json`.

---

## A lógica

Ao apagar um produto do carrinho:

1. Ler o `cart.json`. Se não existir, **não há nada a apagar**: `return`.
2. Ver **quantas vezes** o produto está no carrinho (`qty`).
3. Tirar ao total **o preço × a quantidade**: se estava 3 vezes, tira-se 3 vezes o preço.
4. **Tirar o produto** da lista, com o `filter`.
5. Guardar o carrinho.

---

## O código (referência)

### `models/cart.js`

```javascript
static deleteProduct(id, productPrice) {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return;                                          // 1. não há carrinho → nada a fazer
    }
    const updatedCart = { ...JSON.parse(fileContent) };
    const product = updatedCart.products.find(prod => prod.id === id);
    const productQty = product.qty;                    // 2. quantas vezes está no carrinho
    updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);   // 4.
    updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;  // 3.
    fs.writeFile(p, JSON.stringify(updatedCart), err => {                          // 5.
      console.log(err);
    });
  });
}
```

### `models/product.js` (o `deleteById`, com o carrinho)

```javascript
static deleteById(id) {
  getProductsFromFile(products => {
    const product = products.find(prod => prod.id === id);         // guarda-o antes, para saber o preço
    const updatedProducts = products.filter(prod => prod.id !== id);
    fs.writeFile(p, JSON.stringify(updatedProducts), err => {
      if (!err) {
        Cart.deleteProduct(id, product.price);                     // ← só com o carrinho
      }
    });
  });
}
```

---

## O `filter`

```javascript
lista.filter(prod => prod.id !== id)
```

**Passa por todos** os elementos e **fica só com os que dão `true`**. Com o `!==` (diferente), ficam **todos menos** o que tem aquele ID. É assim que se "apaga" de um array: cria-se uma lista nova **sem** esse elemento.

| Método | Devolve |
|---|---|
| `find` (aula 119) | **Um** elemento: o primeiro que dá `true` |
| `findIndex` (aula 122) | A **posição** desse elemento |
| **`filter`** | **Uma lista nova** com **todos** os que dão `true` |

---

## Erros que o professor teve

| Erro | Causa |
|---|---|
| `cart is not defined` | Usou `cart` em vez do conteúdo do ficheiro |
| `Cannot read property of undefined` | Esqueceu-se do **`JSON.parse`**: o conteúdo do ficheiro é **texto** |

> 💡 Nota do professor: o ideal seria o `deleteById` ter um **callback**, para o controller só redirecionar **depois** de o produto ser apagado. Fica para mais tarde.

---

## ✅ A reter

- Apagar um produto da loja → também sai do **carrinho**. No meu projeto, sem carrinho, **não se aplica**.
- **`filter(x => x.id !== id)`** → lista nova **sem** aquele elemento.
- Total do carrinho → menos **preço × quantidade**.