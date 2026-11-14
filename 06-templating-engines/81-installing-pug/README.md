# 81. Installing & Implementing Pug

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> ⏭️ **Aula saltada (Pug).** Resumo só para referência. O que interessa para o EJS está na secção **🔧 O que muda no servidor**.

> **Em resumo:** instalam-se os templating engines, diz-se ao Express **qual usar** e **onde estão os templates** (`app.set`), e troca-se o **`res.sendFile`** pelo **`res.render`**.

---

## 🔧 O que muda no servidor (precisas disto para o EJS)

### 1. Instalar o engine

O professor instala os três de uma vez:

```bash
npm install --save ejs pug express-handlebars
```

> 💡 Para ti chega **`npm install --save ejs`**. Instalam-se com `--save` (e não `--save-dev`) porque fazem parte da app quando está a funcionar.
> Também dá para instalar **vários pacotes de uma vez**, escrevendo os nomes seguidos.

### 2. `app.js`: dizer ao Express qual engine usar

Logo **depois** do `const app = express();`:

```javascript
app.set('view engine', 'pug');   // no teu caso vai ser 'ejs' (aula 91)
app.set('views', 'views');
```

| Linha | O que faz |
|---|---|
| `app.set(...)` | Guarda uma **configuração global** na app |
| `'view engine'` | **Que engine** usar para gerar as páginas |
| `'views'` | **Em que pasta** estão os templates. `views` já é o valor por defeito, por isso esta linha é opcional. O professor põe-na para mostrar como seria com outra pasta |

### 3. `shop.js`: `res.render` em vez de `res.sendFile`

```javascript
// antes
res.sendFile(path.join(rootDir, 'views', 'shop.html'));

// agora
res.render('shop');
```

O **`res.render('shop')`**:

- usa o engine que definiste no `app.set`;
- procura na pasta **`views`**, por isso **não precisas de `path.join`**;
- procura **`shop.pug`** (ou `shop.ejs`), por isso **não escreves a extensão**.

---

## O resto da aula: a sintaxe do Pug (só referência)

- O Pug não usa `< >` nem tags de fecho. O **aninhamento** faz-se com a **indentação**.
- `header.main-header` → `<header class="main-header">`
- `a(href="/") Shop` → `<a href="/">Shop</a>`
- O browser recebe **HTML normal**: o Pug converte tudo no servidor.

---

## ✅ A reter

- **`npm install --save ejs`**.
- **`app.set('view engine', ...)`** + **`app.set('views', 'views')`** no `app.js`.
- **`res.render('shop')`** em vez do `res.sendFile`: sem caminho e sem extensão.