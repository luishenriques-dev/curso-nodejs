# 89. Converting our Project to Handlebars

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> ⏭️ **Aula saltada (Handlebars).** Resumo só para referência.

> **Em resumo:** a grande diferença do Handlebars é a **filosofia**: **não aceita lógica** nos templates. As contas fazem-se **no `.js`**, e o template só recebe o resultado (`true`/`false`).

---

## A diferença principal

No Pug (e no EJS) podes escrever **condições** no template:

```
if prods.length > 0
```

No Handlebars **não podes**: o `if` só aceita **um valor** que seja verdadeiro ou falso. Por isso, a conta faz-se no `shop.js`:

```javascript
res.render('shop', {
  prods: products,
  pageTitle: 'Shop',
  path: '/',
  hasProducts: products.length > 0
});
```

E o template só pergunta:

```html
{{#if hasProducts}}
  ... os produtos ...
{{else}}
  <h1>No Products Found!</h1>
{{/if}}
```

### Duas filosofias

| | Pug / EJS | Handlebars |
|---|---|---|
| Lógica no template | ✅ Pode | ❌ Não pode |
| Onde fica a lógica | Onde quiseres | **Sempre no `.js`** |
| Vantagem | Mais flexível | Templates **simples**: só mostram coisas |

Nenhuma é melhor que a outra. É uma questão de gosto.

> 💡 O **`hasProducts`** aparece mais vezes no curso, até com o EJS. Agora sabes de onde vem.

---

## O ciclo

```html
{{#each prods}}
  <h1>{{ this.title }}</h1>
{{/each}}
```

O **`this`** é o produto da volta atual do ciclo.

---

## ✅ A reter

- Handlebars → **sem lógica** no template, que só recebe valores prontos.
- **`hasProducts: products.length > 0`** → a conta faz-se no `.js`.
- `{{#if}}…{{else}}…{{/if}}` e `{{#each}}…{{/each}}`, com o **`this`** para o item atual.