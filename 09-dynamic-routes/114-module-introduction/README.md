# 114. Module Introduction

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** nesta secção aprende-se a **enviar dados pelo URL**, por exemplo o **ID de um produto** em `/products/123`, e a usá-los para fazer **mais coisas com os models**: ver o detalhe de um produto, editar, apagar e um **carrinho de compras** (um model novo).

---

## Duas formas de passar dados pelo URL

| Forma | Exemplo | Para quê |
|---|---|---|
| **Route params** (parâmetros de rota) | `/products/123` | Faz **parte do caminho**. Ex.: **qual** produto mostrar |
| **Query params** (parâmetros de consulta) | `/edit-product/123?edit=true` | **Extras** depois do `?`. Ex.: **opções** ou modos |

O Express (o seu **router**) sabe ler os dois.

> 💡 Também se vai ver **quando não** usar o URL e pôr os dados no **corpo do pedido** (`req.body`), como num formulário POST (aula 64).

---

## O que vem nesta secção

- Passar e ler o **ID** de um produto no URL.
- Uma página de **detalhe** para cada produto.
- **Editar** e **apagar** produtos.
- Um model novo: o **carrinho** (*Cart*).

---

## ⚠️ Nota para mim

Saltei a **secção 8**. O código do professor no início desta secção tem muito mais do que o meu: páginas novas, mais campos no produto, mais controllers. Nas aulas **"Preparations"** e **"Applied Changes"**, uso o **código anexado pelo professor** como ponto de partida.

---

## ✅ A reter

- **Route params** → `/products/123`: o dado faz parte do caminho.
- **Query params** → `?edit=true`: extras depois do `?`.
- Nesta secção: **detalhe**, **editar**, **apagar** e o model do **carrinho**.