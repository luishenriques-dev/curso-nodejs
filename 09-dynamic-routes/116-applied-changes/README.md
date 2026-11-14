# 116. Applied Changes

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** o que mudou nos ficheiros da aula anterior. Sobretudo, uma **navegação para telemóvel** (ecrãs pequenos). O resto são **pequenas correções**.

---

## O que mudou

| Mudança | Onde |
|---|---|
| **Menu para telemóvel** | Nas views (o cabeçalho) e no CSS. O `public/js/main.js` abre e fecha o menu |
| Pequenas correções | Estilos e views |

> 💡 O **`main.js`** em `public/js/` é **JavaScript do browser**, e não do servidor. É servido pelo `express.static` (aula 75), tal como o CSS.

---

## ✅ A reter

- Novidade principal: **menu para telemóvel**, com o `public/js/main.js`.
- Não muda nada no **servidor**: as rotas, os controllers e os models são os da secção 8.