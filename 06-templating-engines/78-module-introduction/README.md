# 78. Module Introduction

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> **Em resumo:** até agora, as páginas HTML eram **fixas**: o servidor enviava sempre o mesmo. Nesta secção, as páginas passam a ser **dinâmicas**: o servidor guarda dados (por agora, sem base de dados) e **mete-os dentro do HTML** antes de o enviar. Para isso usa-se um **templating engine**.

---

## O problema

O formulário de `/admin/add-product` já envia o título do produto, mas o servidor **não faz nada com ele**: mostra-o no terminal e mais nada.

Numa app a sério, queremos:

1. **Guardar** o produto no servidor.
2. **Mostrá-lo** noutra página, por exemplo numa **lista de produtos** na loja.

Com HTML fixo isto não dá, porque o ficheiro é sempre igual, tenha o servidor 0 ou 100 produtos.

---

## O que vem nesta secção

| Tema | O que é |
|---|---|
| **Gerir dados no servidor** | Guardar os produtos numa variável, por agora **sem base de dados** (essa vem mais à frente, numa secção própria) |
| **Templating engines** | Ferramentas que pegam num "molde" de HTML e **preenchem-no com dados** antes de o enviar |
| **Várias alternativas** | O professor mostra três: **Pug**, **Handlebars** e **EJS** |

---

## A analogia: o carimbo vs. o formulário em branco 📝

O **HTML fixo** é um **cartaz impresso**: todos os clientes veem exatamente o mesmo.

Um **template** é um **formulário com espaços em branco**: *"Produtos: ____"*. Antes de entregar a página, o servidor **preenche os espaços** com os dados que tem nesse momento. Se tiver mais produtos, a página sai diferente.

---

## ✅ A reter

- Até aqui: **HTML estático**, sempre igual.
- Agora: **conteúdo dinâmico**, com dados do servidor dentro do HTML.
- Os dados ficam, por agora, **numa variável no servidor**. A base de dados vem mais tarde.
- A ferramenta para isto é um **templating engine**: Pug, Handlebars ou EJS.