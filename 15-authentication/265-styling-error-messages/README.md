# 265. Styling Error Messages

**Secção 15 — Authentication**

> **Em resumo:** a mensagem de erro do login passa a ter aspeto próprio. Usamos duas classes CSS, uma geral (`user-message`) e uma para erros (`user-message--error`), seguindo a convenção **BEM**. A classe geral dá a forma, e a de erro dá as cores. Assim, mais tarde, podemos criar mensagens de sucesso com a mesma base.

---

## 1. A convenção BEM

BEM significa **Bloco, Elemento, Modificador**. Em `user-message--error`:

| Parte | Exemplo | O que é |
|---|---|---|
| Bloco | `user-message` | A mensagem em si |
| Modificador | `--error` | Uma variante do bloco |

> 💡 O nome não é obrigatório. O importante é usar nomes claros e consistentes.

---

## 2. A vista

No `views/auth/login.ejs`, a `div` tem as duas classes:

```html
<% if (errorMessage) { %>
  <div class="user-message user-message--error"><%= errorMessage %></div>
<% } %>
```

---

## 3. O CSS

No ficheiro CSS principal (`public/css/main.css`), antes da secção de media queries, acrescenta:

```css
.user-message {
  margin: 1rem auto;
  width: 90%;
  padding: 1rem;
  border: 1px solid #2f5fa7;
  border-radius: 8px;
  background-color: #dbe7f7;
  text-align: center;
}

@media (min-width: 768px) {
  .user-message {
    width: 30rem;
  }
}

.user-message--error {
  border-color: #c0392b;
  background-color: #fbe3e1;
  color: #c0392b;
}
```

| Propriedade | O que faz |
|---|---|
| `margin: 1rem auto` | Centra a caixa horizontalmente |
| `width: 90%` | Ocupa quase toda a largura no telemóvel |
| `width: 30rem` (ecrã a partir de 768px) | Largura fixa em ecrãs maiores |
| `padding: 1rem` | Espaço interior |
| `border-radius: 8px` | Cantos arredondados |
| `.user-message--error` | Borda e fundo vermelhos, texto vermelho |

> 💡 Quando a classe de erro aparece depois da classe geral no CSS, as suas propriedades sobrepõem-se às da classe geral.

> ⚠️ No vídeo, o professor escreve `30 mm`. Para um ecrã, a unidade certa é `rem` (ou `px`), por isso usa `30rem`.

---

## Testar

1. Abre **`/login`** e tenta um email inválido. Deves ver a caixa **vermelha**, centrada e com cantos arredondados.
2. Redimensiona a janela para mais de 768px. A caixa deve ficar com 30rem de largura.

> ⚠️ Se, ao voltar à página de login, a mensagem continuar a aparecer sem ter sido gerada de novo, é o problema que fica para a próxima aula.

---

## ✅ A reter

- BEM: `bloco` e `bloco--modificador`.
- A classe geral define a forma, e a de modificador define as cores.
- Usa `rem` nas medidas para o layout se adaptar melhor.