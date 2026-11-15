# 118. Extracting Dynamic Params

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** uma **só rota**, **`/products/:productId`**, apanha o link de **qualquer** produto. Os **dois pontos `:`** marcam um **espaço em branco** no caminho. No controller, o que veio nesse espaço lê-se com **`req.params.productId`**.

---

## Passo 1 — O problema e a solução

Na aula 117, cada produto ficou com um link diferente:

```
/products/0.123
/products/0.456
/products/0.789
```

Seria preciso **uma rota por produto**, o que é impossível, porque os IDs são aleatórios. A solução é **uma rota com um espaço em branco**:

```javascript
router.get('/products/:productId', ...)
```

Os **dois pontos `:`** querem dizer: *"esta parte do caminho pode ser **qualquer coisa**"*.

> 🏠 É como uma morada: **"Rua dos Produtos, nº ___"**. A rota apanha **qualquer número da porta**.

O nome depois do `:` (`productId`) é **escolha tua**, mas tens de o **lembrar**: é com ele que vais ler o valor.

---

## Passo 2 — Ler o que está no espaço em branco

O Express guarda os valores do caminho em **`req.params`**.

### `controllers/shop.js`

```javascript
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  res.redirect('/');
};
```

### `routes/shop.js`

```javascript
router.get('/products/:productId', shopController.getProduct);
```

O nome tem de ser **igual** nos dois sítios:

```
rota:        '/products/:productId'
                         ↓ mesmo nome
controller:  req.params.productId
```

Se alguém abrir `/products/0.456`:

```
req.params.productId  →  "0.456"
```

> 💡 Por agora, o controller só **mostra o ID no terminal** e volta à página inicial, para provar que funciona. Na próxima aula, o ID serve para **ir buscar o produto**.

---

## Passo 3 — Cuidado com a ordem das rotas

Como `/products/:productId` aceita **qualquer coisa**, pode **"roubar"** pedidos que eram para outra rota.

```javascript
// ❌ errado
router.get('/products/:productId', ...)   // apanha tudo, incluindo "delete"
router.get('/products/delete', ...)       // nunca chega aqui

// ✅ certo
router.get('/products/delete', ...)       // específica: primeiro
router.get('/products/:productId', ...)   // "qualquer coisa": depois
```

O Express lê as rotas **de cima para baixo** (aula 61). Para ele, `delete` seria só mais um "número da porta".

> 💡 Agora não há nenhuma rota assim. O professor só avisa para o futuro.

---

## Testar

1. Clica em **Details** num produto.
2. Já **não aparece a 404**: és redirecionado para a página inicial.
3. No **terminal**, aparece o **ID** do produto em que clicaste.

---

## ✅ A reter

- **`/products/:productId`** → uma rota para **todos** os produtos. O **`:`** é o espaço em branco.
- **`req.params.productId`** → o valor que veio no caminho. **Mesmo nome** que na rota.
- **Rotas específicas antes** das rotas com `:`.