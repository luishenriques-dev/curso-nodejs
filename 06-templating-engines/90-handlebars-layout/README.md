# 90. Adding the Layout to Handlebars

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> ⏭️ **Aula saltada (Handlebars).** Resumo só para referência.

> **Em resumo:** o Handlebars também tem layouts, mas mais limitados. Tudo o que muda **de página para página** (o CSS extra, o link ativo) tem de ser enviado **pelo `.js`**, como `true`/`false`.

---

## Configurar o layout (`app.js`)

```javascript
app.engine('hbs', expressHbs({
  layoutsDir: 'views/layouts/',
  defaultLayout: 'main-layout',
  extname: 'hbs'
}));
```

| Opção | O que faz |
|---|---|
| `layoutsDir` | A pasta dos layouts (este já é o valor por defeito) |
| `defaultLayout` | O layout que **todas as páginas usam**: `main-layout.hbs` |
| `extname` | A extensão dos ficheiros de layout. Sem isto, ele procura `.handlebars` e dá erro |

No layout, o conteúdo de cada página entra no **`{{{ body }}}`**, com **três** chavetas.

---

## Tudo vem do `.js`

Como não há lógica no template, cada rota diz **o que está ativo** e **que CSS é preciso**:

```javascript
// shop.js
res.render('shop', { ..., activeShop: true, productCSS: true });

// admin.js
res.render('add-product', { ..., activeAddProduct: true, formsCSS: true, productCSS: true });
```

Se não enviares um destes valores, conta como **falso**.

> 💡 Para uma página **não** usar o layout: `res.render('pagina', { layout: false })`.

---

## A comparação final do professor

O Handlebars põe **muita configuração no `.js`**. Os templates ficam limpos, mas o código do servidor cresce. A seguir vem o **EJS**, o favorito do professor e o que se usa no resto do curso.

---

## ✅ A reter

- Layout no Handlebars → **`defaultLayout`** + **`{{{ body }}}`**.
- O que muda por página vai **do `.js`** como `true`/`false` (`activeShop`, `productCSS`…).