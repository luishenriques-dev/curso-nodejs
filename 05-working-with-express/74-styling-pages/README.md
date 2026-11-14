# 74. Styling our Pages

**Secção 5 — Working with Express.js**

> **Em resumo:** as páginas ganham **CSS**, escrito por agora numa tag **`<style>`** dentro do `<head>` de cada HTML. Não é uma aula de CSS: o importante é perceber que **as apps Node também servem CSS**. A forma correta, com ficheiros `.css` à parte, vem na próxima aula.

---

## O que muda nesta aula

| Ficheiro | O que muda |
|---|---|
| `views/shop.html` | Ganha um `<style>` e **classes** no `<header>` |
| `views/add-product.html` | O mesmo `<style>`, mais estilo para o **formulário** e o **botão** |
| `views/404.html` | O mesmo `<style>` e o **mesmo `<header>`**, para se poder sair da página de erro |

O **JavaScript não muda**: as rotas e o `app.js` ficam iguais à aula 73.

> 💡 O professor anexa o HTML com o estilo pronto à **próxima aula**. Se não quiseres escrever o CSS, podes usar esse.

---

## O `<header>` com classes

```html
<header class="main-header">
    <nav class="main-header__nav">
        <ul class="main-header__item-list">
            <li class="main-header__item"><a class="active" href="/">Shop</a></li>
            <li class="main-header__item"><a href="/admin/add-product">Add Product</a></li>
        </ul>
    </nav>
</header>
```

### Porquê nomes tão estranhos? (BEM)

O `main-header__item` segue uma convenção chamada **BEM**: o nome do **bloco** (`main-header`), dois underscores, e a **parte** (`item`). Serve para as classes terem **nomes únicos** e não chocarem umas com as outras. Podes dar os nomes que quiseres. O BEM é só uma forma organizada de o fazer.

---

## O CSS (as partes principais)

```html
<style>
    body {
        padding: 0;
        margin: 0;
        font-family: sans-serif;
    }

    main {
        padding: 1rem;
    }

    .main-header {
        width: 100%;
        height: 3.5rem;
        background-color: #dbc441;
        padding: 0 1.5rem;
    }

    .main-header__nav {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .main-header__item-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    .main-header__item {
        margin: 0 1rem;
    }

    .main-header__item a {
        text-decoration: none;
        color: black;
    }

    .main-header__item a:hover,
    .main-header__item a:active,
    .main-header__item a.active {
        color: #3e00a1;
    }
</style>
```

As cores são escolha tua: o professor usa um amarelo dourado no cabeçalho e um roxo escuro nos links ativos.

### O que faz cada coisa

| CSS | Para quê |
|---|---|
| `margin: 0; padding: 0` no `body` | Tira o espaço que o browser põe à volta da página |
| `height: 3.5rem` | A altura do cabeçalho. `rem` é uma medida relativa ao tamanho da letra (3.5rem ≈ 56px) |
| `list-style: none` | Tira as bolinhas da lista |
| `display: flex` | Põe os itens **lado a lado** (flexbox) |
| `align-items: center` | Centra os itens **na vertical** |
| `text-decoration: none` | Tira o sublinhado dos links |
| `:hover` | Quando o rato passa por cima |
| `a.active` | O link com a classe `active`, para mostrar **em que página estás** |

> 💡 A classe **`active`** é posta **à mão**: no `shop.html` vai no link **Shop**, e no `add-product.html` vai no link **Add Product**. Mais à frente no curso aprende-se a defini-la **automaticamente**.

---

## O formulário (só no `add-product.html`)

```html
<form class="product-form" action="/admin/add-product" method="POST">
    <div class="form-control">
        <label for="title">Title</label>
        <input type="text" name="title" id="title">
    </div>
    <button type="submit">Add Product</button>
</form>
```

| Novidade | Para quê |
|---|---|
| `<div class="form-control">` | Agrupa a etiqueta e o campo, para os estilizar juntos |
| `<label for="title">` | O texto "Title" por cima do campo |
| `id="title"` no input | Liga o campo à `label` (acessibilidade: clicar na etiqueta põe o cursor no campo) |

> ⚠️ O **`name="title"`** continua lá. É ele que dá o nome ao dado no **`req.body`** (aula 64). O `id` é só para a `label`.

### O CSS do formulário

```css
.form-control {
    margin: 1rem 0;
}

.form-control label,
.form-control input {
    display: block;
    width: 100%;
}

.form-control input {
    border: 1px solid #dbc441;
    font: inherit;
    border-radius: 2px;
}

button {
    font: inherit;
    border: 1px solid #3e00a1;
    color: #3e00a1;
    background: white;
    border-radius: 3px;
    cursor: pointer;
}

button:hover,
button:active {
    background-color: #3e00a1;
    color: white;
}

.product-form {
    width: 20rem;
    max-width: 90%;
    margin: auto;
}
```

| CSS | Para quê |
|---|---|
| `display: block` | A etiqueta e o campo ocupam **a linha toda**, um por baixo do outro |
| `font: inherit` | Usa a mesma letra do resto da página (os inputs e botões não a herdam sozinhos) |
| `cursor: pointer` | A **mãozinha** quando passas por cima do botão |
| `max-width: 90%` | No telemóvel, o formulário não sai do ecrã |
| `margin: auto` | **Centra** o formulário na horizontal |

---

## A página 404 com cabeçalho

O professor copia o `<style>` e o `<header>` para o **`404.html`**. Assim, quem cai numa página que não existe **pode voltar** para a loja pelo menu.

> 💡 No vídeo, o professor ainda tinha links sem o **`/admin`** e corrige-os no fim. Tu já tinhas isso certo desde a aula 73.

---

## O problema que fica para a próxima aula

O **mesmo CSS está copiado em três ficheiros**. Se quiseres mudar uma cor, tens de a mudar três vezes.

O ideal é ter um ficheiro **`.css` à parte**, que todas as páginas usam. Mas o Express ainda **não deixa o browser ir buscar ficheiros** sozinho, por isso um `<link href="...css">` não funcionaria. É isso que se resolve na aula 75.

---

## A analogia: pintar a loja 🎨

Até aqui, a loja tinha as paredes, as portas e os corredores (o HTML e as rotas), mas estava em **tijolo à vista**. Nesta aula **pintou-se**.

O problema é que se pintou **cada sala à mão**, com a lata de tinta lá dentro. Na próxima aula passa a haver **um armazém de tintas** (os ficheiros estáticos), de onde todas as salas vão buscar a mesma cor.

---

## ✅ A reter

- O CSS fica, por agora, numa tag **`<style>`** no `<head>` de cada HTML.
- **Classes BEM** (`bloco__parte`) → nomes organizados e sem repetições.
- **`display: flex`** → itens lado a lado. **`align-items: center`** → centrados na vertical.
- A classe **`active`** marca o link da página atual, por agora posta à mão.
- No formulário: **`<label for>`** + **`id`** para acessibilidade. O **`name`** continua a ser o que chega ao `req.body`.
- O **404** também tem o cabeçalho, para se poder navegar.
- Problema: **CSS repetido** em três ficheiros → resolvido na próxima aula com **ficheiros estáticos**.