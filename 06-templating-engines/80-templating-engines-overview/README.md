# 80. Templating Engines - An Overview

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> **Em resumo:** um **templating engine** pega num ficheiro "quase HTML" com **espaços em branco**, preenche-os com **dados do servidor** e gera **HTML normal**, que depois é enviado ao browser. Os três mais conhecidos são o **EJS**, o **Pug** e o **Handlebars**.

---

## Como funciona

```
Template (HTML com espaços em branco)
            +
Dados do servidor (ex.: o array products)
            ↓
     Templating engine
            ↓
   HTML normal → browser
```

1. Escreves um **template**: HTML, estilos, imports, tudo normal, mas com alguns **espaços em branco** (*placeholders*).
2. O servidor tem os **dados**, por exemplo o array `products` da aula 79.
3. O **templating engine** lê o template e **troca os espaços pelos dados**. Por exemplo, cria um `<li>` para cada produto.
4. O resultado é **HTML normal**, gerado **na hora** (*on the fly*), que vai para o browser.

> 💡 **O utilizador nunca vê o template** nem os espaços em branco. Tudo acontece **no servidor**, e o browser recebe só HTML.

---

## Os três mais populares

Imagina que tens uma variável `name` com o valor `"Luís"`, e queres mostrá-la num parágrafo:

| Engine | Como se escreve | Estilo |
|---|---|---|
| **EJS** | `<p><%= name %></p>` | **HTML normal**, com `<% %>` para os dados |
| **Pug** (antes chamava-se Jade) | `p #{name}` | HTML **encurtado**: sem `< >` nem tags de fecho |
| **Handlebars** | `<p>{{ name }}</p>` | **HTML normal**, com `{{ }}` para os dados |

Os três dão o mesmo resultado no browser: `<p>Luís</p>`.

---

## As diferenças

| | EJS | Pug | Handlebars |
|---|---|---|---|
| Escreve-se em… | HTML normal | Uma versão **mínima** de HTML | HTML normal |
| Dentro dos espaços… | **JavaScript a sério**: `if`, ciclos `for`, etc. | Uma linguagem própria: tem `if` e listas | Uma linguagem própria, **mais limitada**: tem `if` e listas |
| Parece-se com… | Handlebars | — (é o mais diferente) | EJS |

---

## A analogia: o formulário com espaços em branco 📝

Lembra-te da aula 78. O **template** é um formulário com espaços: *"Olá, ____"*.

O **templating engine** é o **funcionário que o preenche** antes de o entregar. O cliente só recebe a folha **já preenchida**: *"Olá, Luís"*. Nunca vê os espaços em branco.

Os três engines são **três modelos de formulário diferentes**: uns com linhas `____`, outros com caixinhas `[ ]`. O resultado final é o mesmo.

---

## O que vem a seguir

O professor mostra **como se instala e usa** cada um, e depois **escolhe um** para o resto do curso: o **EJS**.

---

## ✅ A reter

- **Templating engine** = template + dados → **HTML gerado no servidor**.
- O browser recebe **só HTML**: nunca vê o template.
- **EJS** → HTML + `<%= %>`, com **JavaScript a sério** lá dentro.
- **Pug** → HTML encurtado + `#{ }`.
- **Handlebars** → HTML + `{{ }}`, mais limitado.