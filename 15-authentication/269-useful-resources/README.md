# 269. Useful Resources & Links

**Secção 15 — Authentication**

> **Em resumo:** esta aula reúne os links de referência do módulo de autenticação, e o código final da secção, que pode ser usado em alternativa ao teu projeto.

---

## 1. Código da secção

O professor disponibilizou o código final da secção. Se quiseres usá-lo:

1. Extrai o ficheiro numa pasta nova.
2. Corre `npm install` dentro dessa pasta, antes de arrancar.
3. Cria o ficheiro `.env` com `MONGODB_URI` e `SESSION_SECRET`, como nas outras aulas.

> ⚠️ Não copies o `.env` para o GitHub. Ele deve continuar no `.gitignore`.

---

## 2. Links úteis

- **Bcrypt (bcryptjs)**: documentação oficial do pacote usado para o hash das passwords. https://github.com/dcodeIO/bcrypt.js
- **Ataques CSRF**: explicação geral dos ataques CSRF e formas de os evitar. https://www.acunetix.com/websitesecurity/csrf-attacks/

---

## ✅ A reter

- O código final serve de referência. Usa-o para comparar com o teu projeto, se algo não estiver a funcionar.
- A documentação do `bcryptjs` é a fonte certa para confirmar como funciona o `hash` e o `compare`.