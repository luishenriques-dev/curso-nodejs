# 69. Creating HTML Pages

**Secção 5 — Working with Express.js**

> **Em resumo:** em vez de HTML escrito dentro do JavaScript, criam-se **ficheiros HTML a sério** numa pasta **`views/`**: o `shop.html` (a página inicial) e o `add-product.html` (o formulário). Nesta aula só se criam os ficheiros. Enviá-los ao browser fica para a próxima.

---

## A nova estrutura

```
69-creating-html-pages/
├── app.js
├── routes/
│   ├── admin.js
│   └── shop.js
├── views/                ← nova
│   ├── shop.html         ← o que os clientes veem em /
│   └── add-product.html  ← o formulário de /admin/add-product
├── package.json
└── README.md
```

**Porquê `views`?** O nome é uma escolha, mas faz parte da estrutura **MVC** (*Model, View, Controller*) para onde o curso vai caminhando. As **views** são **o que se mostra ao utilizador**. O professor explica o MVC mais à frente.

---

## O código desta aula

### `views/add-product.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">Shop</a></li>
                <li><a href="/admin/add-product">Add Product</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <form action="/admin/add-product" method="POST">
            <input type="text" name="title">
            <button type="submit">Add Product</button>
        </form>
    </main>
</body>
</html>
```

### `views/shop.html`

Igual, mas:

- o `<title>` é **Shop**;
- o `<main>` tem um **`<h1>My Products</h1>`** em vez do formulário. Mais à frente vai mostrar a lista de produtos.

> ⚠️ **Os links e o `action` levam o `/admin`** (aula 68). O caminho do formulário é `/admin/add-product`, e não `/add-product`.

---

## As partes do HTML

| Elemento | Para quê |
|---|---|
| `<header>` | O **cabeçalho** da página, no topo |
| `<nav>` | A **barra de navegação**, os links entre páginas |
| `<ul>` e `<li>` | Uma **lista** de links: `ul` é a lista, e cada `li` um item |
| `<a href="/">` | Um **link** para outra página |
| `<main>` | O **conteúdo principal** da página |
| `<form>` | O formulário (aulas 32 e 64) |

As duas páginas têm o **mesmo `<header>`**, para se poder navegar entre elas. Mais à frente, com o EJS, este bocado repetido passa a estar num só sítio (o `include` da secção 6).

---

## Atalho do VS Code: o esqueleto HTML

Num ficheiro `.html` vazio, escreve **`!`** e carrega em **Enter** (ou Tab). O VS Code cria o esqueleto completo: `<!DOCTYPE>`, `<html>`, `<head>` e `<body>`.

> 💡 No vídeo, o professor escreve `html5`. No VS Code atual, o atalho é o `!`. Se a sugestão não aparecer, carrega em **Ctrl + Espaço**.

---

## Ainda não funciona no browser

Nesta aula **só se criam os ficheiros**. As rotas continuam a usar o `res.send('...')` com o HTML escrito no código. Na próxima aula (70), as rotas passam a **enviar estes ficheiros**.

> 💡 O professor anexa o HTML pronto a esta aula, para quem não quiser escrevê-lo.

---

## ✅ A reter

- **Pasta `views/`** = as páginas que se mostram ao utilizador (o "V" do MVC).
- **`shop.html`** → a página inicial. **`add-product.html`** → o formulário.
- As duas têm a mesma **barra de navegação**, com links para `/` e `/admin/add-product`.
- **`!` + Enter** no VS Code → esqueleto HTML.
- Próxima aula: **enviar** estes ficheiros a partir das rotas.