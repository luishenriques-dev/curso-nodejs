# 85. Adding a Layout

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> ⏭️ **Aula saltada (Pug).** Resumo só para referência. Esta aula **não muda o servidor**.

> **Em resumo:** as três páginas repetiam a mesma estrutura (o `<head>`, o CSS principal e o cabeçalho). Cria-se um **layout**: um esqueleto comum com **espaços** onde cada página mete o seu conteúdo.

---

## A ideia (vale para todos os engines)

```
views/layouts/main-layout.pug   ← o esqueleto comum
        ├── espaço "styles"     ← cada página junta o seu CSS extra
        └── espaço "content"    ← cada página mete o seu conteúdo
```

As páginas (`shop`, `add-product`, `404`) passam a dizer: *"usa o layout, e no espaço `content` mete isto"*.

**Vantagem:** se mudares o cabeçalho, mudas **num só sítio**, e todas as páginas ficam atualizadas.

---

## A analogia: o papel timbrado 📄

O layout é o **papel timbrado** da empresa: o logótipo e a morada já vêm impressos. Cada carta só escreve **o texto do meio**.

---

## No Pug (só referência)

| No layout | Nas páginas |
|---|---|
| `block styles` e `block content` → cria os espaços | `extends layouts/main-layout.pug` → usa o layout |
| | `block content` → o que vai para o espaço |

> 💡 **No EJS é diferente:** não há layouts como estes. Usa-se o **`include`** (*partials*): bocados de HTML, como o cabeçalho, que cada página "inclui". É isso que se vê na aula 92.

---

## O problema que fica para a aula 86

Com o cabeçalho no layout, a classe **`active`** já não pode estar escrita à mão, porque o layout é **o mesmo para todas as páginas**. Tem de ser definida **conforme a página**.

---

## ✅ A reter

- **Layout** = esqueleto comum, com espaços para o conteúdo de cada página.
- Muda-se o cabeçalho **num só sítio**.
- No EJS, a mesma ideia faz-se com **`include`** (aula 92).