# 247. Code Adjustments

**Secção 14 — Sessions & Cookies**

> **Em resumo:** uma correção pequena de **estilo** (CSS) na navegação do **telemóvel**. Não mexe no código Node.js.

---

## O problema

A navegação mobile (o menu que aparece em ecrãs pequenos) estava mal apresentada. Os links e os botões não ficavam como deviam.

---

## A correção

Foi corrigida a parte de **CSS**, que é a aparência da página, e não a lógica:

- Ficheiros de estilo na pasta `public/css/`.
- Nenhuma alteração em `app.js`, controllers, rotas ou modelos.

> 💡 Para confirmar, abre a página no **modo mobile** (F12 → ícone de telemóvel) e vê o menu.

---

## ✅ A reter

- Nem todas as alterações são de código Node: há também **CSS**, que afeta só a aparência.
- Uma alteração só de estilo **não muda o comportamento** da aplicação.