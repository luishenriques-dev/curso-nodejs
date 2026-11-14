# Tarefa 4 — Templating Engines

**Secção 6 — Working with Dynamic Content & Adding Templating Engines**

> ⏸️ **Por fazer.** Ficou para mais tarde.

> **Em resumo:** uma app com um **formulário** para escrever um nome, e uma página que **mostra a lista** de todos os nomes enviados. As páginas são **templates** (EJS).

---

## 📋 Enunciado

1. Cria um projeto **npm** e instala o **Express.js** (e o **nodemon**, se quiseres).
2. Adiciona duas rotas:
   - **`/`** → mostra um **`<form>`** onde o utilizador escreve o **nome**;
   - **`/users`** → mostra uma **`<ul>`** com os **nomes dos utilizadores** (ou uma mensagem, se não houver nenhum).

---

## 🧪 Como testar

| Teste | Resultado esperado |
|---|---|
| Abrir `localhost:3000` | Aparece o formulário |
| Abrir `/users` sem ter enviado nada | Aparece a mensagem de "não há utilizadores" |
| Enviar um nome no formulário | O nome é guardado |
| Abrir `/users` depois de enviar 2 ou 3 nomes | Aparece uma lista com todos |

---

## 📚 Aulas que ajudam

| Parte | Aulas |
|---|---|
| `npm init`, instalar pacotes, script `start` | 41–43, 59 |
| Receber dados do formulário (`req.body`) | 64 |
| Rotas GET e POST, `redirect` | 65, 66 |
| Guardar dados num array | 79 |
| `app.set('view engine', 'ejs')` e `res.render` | 81, 82, 91 |
| `if` e `for` no EJS | 91 |
| Includes (cabeçalho partilhado) | 92 |

---

## 💻 A minha solução

*(por fazer)*

---

## 🧠 O que aprendi

*(por fazer)*