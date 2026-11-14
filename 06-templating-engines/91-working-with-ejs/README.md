# 91. Working with EJS

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> **Em resumo:** o **EJS** é o engine que se usa no resto do curso. Escreve-se **HTML normal**, e os dados entram com **`<%= %>`**. Dentro do **`<% %>`** escreve-se **JavaScript a sério**, como `if` e `for`, para condições e ciclos.

---

## Porque é que o professor prefere o EJS

| | Pug | Handlebars | EJS |
|---|---|---|---|
| HTML normal | ❌ | ✅ | ✅ |
| JavaScript no template (`if (prods.length > 0)`) | ✅ | ❌ | ✅ |

O EJS junta o melhor dos dois: **HTML normal**, como o Handlebars, e **lógica no template**, como o Pug.

---

## 🔧 O que muda no servidor

### `app.js`

```javascript
app.set('view engine', 'ejs');
app.set('views', 'views');
```

O EJS, tal como o Pug, já vem preparado para o Express, por isso **não precisa do `app.engine`**. O professor apaga as linhas do Handlebars (o `require` e o `app.engine`).

### As rotas **não mudam**

O `res.render` continua **exatamente igual** ao das aulas do Pug:

| Rota | Dados que manda | Onde são usados no `.ejs` |
|---|---|---|
| `shop.js` | `{ prods: products, pageTitle: 'Shop', path: '/' }` | `prods` → o `if` e o `for`; `pageTitle` → o `<title>` |
| `admin.js` | `{ pageTitle: 'Add Product', path: '/admin/add-product' }` | `pageTitle` → o `<title>` |
| `app.js` (404) | `{ pageTitle: 'Page Not Found' }` | `pageTitle` → o `<title>` |

> 💡 O **`path`** ainda não é usado: o link ativo continua escrito à mão em cada `.ejs`. Entra na aula 92, com o cabeçalho partilhado.

---

## As duas tags do EJS

| Tag | Para quê | Exemplo |
|---|---|---|
| **`<%= %>`** (com `=`) | **Mostrar** um valor na página | `<title><%= pageTitle %></title>` |
| **`<% %>`** (sem `=`) | **Correr JavaScript**, sem mostrar nada: `if`, `for`, `else`… | `<% if (prods.length > 0) { %>` |

Regra simples: **com `=` aparece na página, sem `=` só corre**.

---

## O código desta aula

### `views/404.ejs` (o essencial)

```html
<title><%= pageTitle %></title>
...
<h1>Page Not Found!</h1>
```

### `views/add-product.ejs`

O HTML do `add-product.html`, com o título dinâmico:

```html
<title><%= pageTitle %></title>
```

### `views/shop.ejs` (a parte do `main`)

```html
<main>
    <% if (prods.length > 0) { %>
        <div class="grid">
            <% for (let product of prods) { %>
                <article class="card product-item">
                    <header class="card__header">
                        <h1 class="product__title"><%= product.title %></h1>
                    </header>
                    ...
                </article>
            <% } %>
        </div>
    <% } else { %>
        <h1>No Products Found!</h1>
    <% } %>
</main>
```

---

## Como ler o `if` e o `for` no EJS

É um **`if` normal de JavaScript**, mas partido em bocados. O que fica **entre os bocados** é HTML:

```
<% if (prods.length > 0) { %>     ← abre o if
    ... HTML com os produtos ...   ← só aparece se houver produtos
<% } else { %>                     ← fecha o if e abre o else
    <h1>No Products Found!</h1>    ← só aparece se não houver
<% } %>                            ← fecha o else
```

O **`for`** funciona igual: o HTML entre o `{` e o `}` **repete-se uma vez por produto**.

Dentro do ciclo, **`product`** é o produto da volta atual: um objeto `{ title: 'Book' }` (aula 79). Por isso o título é **`product.title`**.

---

## ⚠️ Erros comuns (alguns aconteceram-me)

| Erro | Causa | Correção |
|---|---|---|
| `Unexpected token 'else'` | O **`{` ficou fora** da tag: `<% for (...) %> {` | O `{` vai **dentro**: `<% for (...) { %>` |
| `Unexpected token 'else'` | O `}` e o `else` em tags separadas: `<% } %>` `<% else { %>` | Na **mesma** tag: `<% } else { %>` |
| `product is not defined` | O nome no `for` é diferente do usado lá dentro (`products` vs `product`) | Usar **o mesmo nome** |
| Aparece `[object Object]` | Mostraste o objeto inteiro: `<%= product %>` | Mostrar a **propriedade**: `<%= product.title %>` |
| O valor não aparece, mas não há erro | A propriedade não existe, por exemplo `product.price` quando o produto só tem `title` | Guardar essa propriedade no `push` da rota POST |

> 💡 Os erros do EJS aparecem **quando abres a página**, e não quando o servidor arranca, porque o template só é lido nesse momento. O erro diz **em que ficheiro** está: `in .../views/shop.ejs`.

---

## A analogia: o formulário com espaços 📝

O `.ejs` é o **formulário com espaços em branco** da aula 78:

- **`<%= %>`** é um **espaço para escrever** um valor;
- **`<% if %>`** é uma **instrução para quem preenche**: *"se houver produtos, preenche esta parte; senão, escreve 'No Products'"*;
- **`<% for %>`** é *"repete esta parte para cada produto"*.

---

## ✅ A reter

- **`app.set('view engine', 'ejs')`**, sem `app.engine`.
- As rotas e o **`res.render`** **não mudam** em relação ao Pug.
- **`<%= valor %>`** → mostra. **`<% código %>`** → corre JavaScript.
- `if` e `for` são **JavaScript normal**, partido em tags, com **HTML no meio**.
- O **`{`** e o **`}`** têm de ficar **dentro** das tags.