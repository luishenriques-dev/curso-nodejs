# 88. Working with Handlebars

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> ⏭️ **Aula saltada (Handlebars).** Resumo só para referência. Não muda nada que precises para o EJS.

> **Em resumo:** o Handlebars usa **HTML normal**, com **`{{ }}`** para os dados. Ao contrário do Pug e do EJS, **não vem ligado ao Express**: tem de ser **registado à mão** com o `app.engine`.

---

## Registar o engine (`app.js`)

```javascript
const expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs());
app.set('view engine', 'hbs');
```

| Linha | O que faz |
|---|---|
| `app.engine('hbs', ...)` | Regista um engine **com o nome `hbs`**. É também a extensão dos ficheiros: `404.hbs` |
| `app.set('view engine', 'hbs')` | Diz ao Express para o usar. O nome tem de ser **igual** ao do `app.engine` |

> 💡 Para saber se um engine precisa do `app.engine`, vê a documentação dele. O Pug e o EJS não precisam.

---

## Mostrar um valor

```html
<title>{{ pageTitle }}</title>
```

O `res.render` é **igual** em todos os engines: **só a sintaxe dentro da página muda**.

---

## ✅ A reter

- Handlebars = **HTML + `{{ }}`**.
- Precisa do **`app.engine`** para ser registado.
- Os dados passam-se da mesma forma: **`res.render('pagina', { ... })`**.