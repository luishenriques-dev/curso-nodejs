# 71. Returning a 404 Page

**Secção 5 — Working with Express.js**

> **Em resumo:** a página 404 também passa a ser um **ficheiro HTML** (`views/404.html`), enviado com `res.status(404).sendFile(...)`. Como o `app.js` está na **raiz** do projeto, o caminho **não precisa do `'../'`**.

---

## O código desta aula

### `views/404.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found</title>
</head>
<body>
    <h1>Page Not Found!</h1>
</body>
</html>
```

### `app.js`

```javascript
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
```

---

## A diferença em relação às rotas: sem `'../'`

| Ficheiro | Onde está | `__dirname` aponta para… | Caminho para a `views` |
|---|---|---|---|
| `routes/shop.js` | Dentro de `routes/` | A pasta **`routes/`** | `path.join(__dirname, '../', 'views', ...)` → sobe uma pasta |
| `app.js` | Na **raiz** do projeto | A **raiz** do projeto | `path.join(__dirname, 'views', ...)` → já lá está |

O `__dirname` é sempre **a pasta do ficheiro onde o escreves** (aula 70). Como o `app.js` já está ao lado da pasta `views`, não há nada para subir.

> 💡 Escrever `'./'` também funciona, porque quer dizer "esta pasta" e o `path.join` ignora-o. Mas não faz nada, por isso não é preciso.

---

## Testar

1. Abre um caminho que não existe, por exemplo `localhost:3000/abc`.
2. Deve aparecer a página **Page Not Found!**.
3. No separador **Network** das ferramentas de programador, o código deve ser **404**.

> ⚠️ Confirma que escreveste **`404`**, e não `400`. O 400 quer dizer "pedido mal feito", e não "página não encontrada".

---

## ✅ A reter

- A página 404 é um **ficheiro HTML** em `views/404.html`.
- No middleware "apanha-tudo": **`res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))`**.
- No **`app.js`** não há `'../'`: o `__dirname` já é a raiz do projeto.
- Próximas aulas: dar **estilo** (CSS) às páginas.