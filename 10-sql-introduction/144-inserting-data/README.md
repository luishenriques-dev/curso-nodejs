# 144. Inserting Data Into the Database

**Secção 10 — SQL Introduction**

> **Em resumo:** o **`save()`** do model passa a guardar o produto **no MySQL**, com um **`INSERT INTO`**. Os valores **não se escrevem diretamente** na query: usam-se **`?`**, e os valores vão à parte, para evitar a **injeção de SQL**. No controller, o **`redirect`** passa para dentro do **`.then`**, para só acontecer **depois** de o produto estar guardado.

---

## O código desta aula

### `models/productModel.js` — o `save()`

```javascript
save() {
  return db.execute(
    'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
    [this.title, this.price, this.imageUrl, this.description]
  );
}
```

### `controllers/adminController.js` — o `postAddProduct`

```javascript
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
};
```

---

## O `INSERT INTO`, por partes

```sql
INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)
```

| Parte | Quer dizer |
|---|---|
| `INSERT INTO products` | "Junta uma linha à tabela `products`…" |
| `(title, price, imageUrl, description)` | "…preenchendo estas colunas…" |
| `VALUES (?, ?, ?, ?)` | "…com estes valores", **um `?` por coluna** |

- Os nomes das colunas têm de ser **iguais** aos da tabela (aula 140).
- O **`id` não aparece**: o **Auto Increment** dá-o sozinho.

### Os `?` e o segundo argumento

```javascript
db.execute(
  '... VALUES (?, ?, ?, ?)',
  [this.title, this.price, this.imageUrl, this.description]
)
```

Cada **`?`** é trocado por um valor do array, **pela ordem**:

```
1.º ?  ←  this.title
2.º ?  ←  this.price
3.º ?  ←  this.imageUrl
4.º ?  ←  this.description
```

> ⚠️ A **ordem** do array tem de ser **igual** à das colunas na query.

---

## 🔐 Porquê os `?`: a injeção de SQL

**Porque não juntar os valores diretamente ao texto da query?**

```javascript
// ❌ PERIGOSO
db.execute("INSERT INTO products (title) VALUES ('" + this.title + "')");
```

Se alguém escrevesse no formulário um título como este:

```
'); DROP TABLE products; --
```

o texto passava a fazer parte **do comando SQL**, e o MySQL podia **apagar a tabela** inteira. Isto chama-se **injeção de SQL** (*SQL injection*), e é um dos ataques mais conhecidos na web.

Com os **`?`**, o `mysql2` trata cada valor **só como dados**, e **nunca como um comando**. Mesmo que alguém escreva SQL no formulário, fica guardado **como texto**, e não é executado.

> ✉️ **Analogia:** juntar o texto à query é como deixar o cliente **escrever no teu livro de ordens**. Com os `?`, o que o cliente escreve vai num **envelope fechado**, que só pode ser guardado, e nunca lido como uma ordem.

> 💡 **Regra:** dados que vêm do utilizador **nunca** se juntam diretamente ao SQL. Usa-se **sempre** `?`. Isto vale para o MySQL, o SQL Server e qualquer outra base de dados.

---

## O `redirect` dentro do `.then`

```javascript
product.save()
  .then(() => res.redirect('/'))
  .catch(err => console.log(err));
```

Guardar na base de dados **demora**. Com o `redirect` dentro do `.then`, a pessoa só é levada para a loja **depois** de o produto estar guardado. Antes, com o ficheiro, o `redirect` vinha logo a seguir ao `save()`, e às vezes a página aparecia **antes** de o produto estar lá.

O `.then(() => ...)` tem os parênteses **vazios**, porque aqui o resultado do `INSERT` não interessa: só interessa saber **que acabou**.

---

## Testar

1. Vai a **Add Product**, preenche e guarda.
2. És levado para a loja, já com o produto novo.
3. Na base de dados (`SELECT * FROM products;`), o produto está lá, com um **`id` gerado automaticamente**.

---

## ✅ A reter

- **`INSERT INTO tabela (colunas) VALUES (?, ?, ...)`** → junta uma linha.
- **`?`** + **array de valores**, pela **mesma ordem** → protege contra a **injeção de SQL**.
- **Nunca** juntar dados do utilizador diretamente ao texto SQL.
- O `save()` faz **`return db.execute(...)`**, e o controller faz o **`redirect` dentro do `.then`**.