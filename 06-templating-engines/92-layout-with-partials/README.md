# 92. Working on the Layout with Partials

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> **Em resumo:** o EJS não tem layouts, mas tem **includes** (ou *partials*): **bocados de HTML** guardados à parte, que cada página **inclui** com **`<%- include('...') %>`**. O link ativo do menu passa a ser marcado com o **`path`** que vem do `res.render`.

---

## Layout vs. includes

| | Layout (Pug, Handlebars) | Includes (EJS) |
|---|---|---|
| A ideia | **Um esqueleto** onde cada página encaixa o seu conteúdo | **Peças soltas** que cada página vai buscar |
| Quem manda | O layout | A página |
| Analogia | O **papel timbrado**, onde só escreves o meio | **Peças de LEGO**: cada página monta-se com as peças comuns |

O resultado é o mesmo: o código comum fica **num só sítio**.

---

## A nova estrutura

```
views/
├── includes/            ← nova
│   ├── head.ejs         ← o início do documento: <!DOCTYPE>, <head>, <title>, main.css
│   ├── navigation.ejs   ← o <header> com o menu
│   └── end.ejs          ← o fim: </body></html>
├── 404.ejs
├── add-product.ejs
└── shop.ejs
```

---

## O código desta aula

### `views/includes/head.ejs`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/main.css">
```

> 💡 O `head.ejs` **não fecha o `</head>`**. Assim, cada página ainda pode juntar o **seu CSS extra** antes de o fechar.

### `views/includes/navigation.ejs`

```html
<header class="main-header">
    <nav class="main-header__nav">
        <ul class="main-header__item-list">
            <li class="main-header__item"><a class="<%= path === '/' ? 'active' : '' %>" href="/">Shop</a></li>
            <li class="main-header__item"><a class="<%= path === '/admin/add-product' ? 'active' : '' %>" href="/admin/add-product">Add Product</a></li>
        </ul>
    </nav>
</header>
```

### `views/includes/end.ejs`

```html
</body>

</html>
```

### `views/add-product.ejs` (como fica)

```html
<%- include('includes/head.ejs') %>
    <link rel="stylesheet" href="/css/forms.css">
    <link rel="stylesheet" href="/css/product.css">
</head>

<body>
    <%- include('includes/navigation.ejs') %>

    <main>
        ... o formulário ...
    </main>
<%- include('includes/end.ejs') %>
```

O **`shop.ejs`** fica igual, mas só com o `product.css` e o `main` dos produtos. O **`404.ejs`** não tem CSS extra, por isso fecha o `</head>` logo a seguir ao include.

---

## `<%- include('...') %>`

| Parte | O que faz |
|---|---|
| `include('includes/head.ejs')` | Vai buscar o ficheiro e **mete-o aqui** |
| O caminho | É contado **a partir do ficheiro onde escreves**. Como as páginas estão em `views/`, o caminho é `includes/...` |
| **`<%-`** (com **menos**) | Mostra o HTML **como HTML** |

### `<%=` vs. `<%-`: a diferença importante

| Tag | O que faz com HTML | Quando usar |
|---|---|---|
| **`<%=`** | Mostra-o **como texto**: vês `<h1>` escrito na página | Para **dados**, sobretudo os que vêm do utilizador |
| **`<%-`** | Mostra-o **como HTML a sério** | Para **includes**, e só para HTML **escrito por ti** |

**Porquê?** Por segurança. Se um utilizador escrever `<script>...</script>` no formulário e mostrares isso com `<%-`, o script **corre** no browser de quem vir a página. É o ataque chamado **XSS** (*cross-site scripting*). O `<%=` impede isso, porque transforma o HTML em texto.

> 💡 O professor experimenta o include com `<%=`, e aparece todo o código do `head.ejs` **escrito na página**, como texto.

---

## O link ativo com o `path`

O menu está agora **num só ficheiro**, por isso a classe `active` já não pode estar escrita à mão. Usa-se o **`path`** que cada rota manda no `res.render` (aula 86):

```html
class="<%= path === '/admin/add-product' ? 'active' : '' %>"
```

É um **if numa linha** (o operador **ternário**): `condição ? se sim : se não`.

```
o path é '/admin/add-product'?
   sim → escreve "active"   → class="active"
   não → escreve ""         → class=""
```

| Rota | Manda | Fica ativo |
|---|---|---|
| `shop.js` | `path: '/'` | **Shop** |
| `admin.js` | `path: '/admin/add-product'` | **Add Product** |

> ⚠️ O valor do `path` no `.js` e no `navigation.ejs` tem de ser **exatamente igual**.
> ⚠️ A **404** também inclui o `navigation.ejs`. Se não mandar nenhum `path`, o EJS dá erro (`path is not defined`). Por isso, a 404 deve mandar um `path` qualquer, por exemplo `path: '/404'`, que não ativa nenhum link.

---

## ⚠️ Erro que me aconteceu

```
Could not find the include file "includes/head.ejs"
```

O EJS não encontra o ficheiro. Confirma que:

- a pasta `includes` está **dentro de `views`**;
- os nomes estão certos (`includes`, `head.ejs`) e o ficheiro está **gravado**.

---

## ✅ A reter

- **Includes** = bocados de HTML partilhados: `head.ejs`, `navigation.ejs`, `end.ejs`.
- **`<%- include('includes/ficheiro.ejs') %>`**, com o caminho a partir do ficheiro atual.
- **`<%=`** → seguro, mostra HTML como texto (para dados). **`<%-`** → mostra HTML a sério (só para código teu).
- Link ativo: **`<%= path === '...' ? 'active' : '' %>`**, com o `path` vindo do `res.render`.