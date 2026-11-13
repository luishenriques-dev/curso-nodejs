# 31. Request & Response Headers

**Secção 3 — Understanding the Basics**

> **Em resumo:** tanto os **requests** como as **responses** levam **headers**, a meta-informação que acompanha os dados de A para B. Não é preciso decorá-los: vais conhecê-los à medida que forem precisos.

---

## O que são headers

São pares **nome: valor** que acompanham o pedido e a resposta e que **descrevem** o que vai lá dentro, ou como deve ser tratado.

> 📦 Lembra-te do **envelope** da aula 25: o body é a carta lá dentro, os headers são o que está escrito por fora.

---

## Headers que já encontraste

| Header | Vai no… | O que diz | Onde o viste |
|---|---|---|---|
| `Host` | request | Para que endereço é o pedido | Aula 29, em `req.headers` |
| `User-Agent` | request | Que browser fez o pedido | Aula 29 |
| `Accept` | request | Que tipos de resposta o browser aceita | Aula 29 |
| `Accept-Language` | request | Em que línguas prefere a resposta | Aula 29 (`pt-PT`) |
| `Content-Type` | response (e request) | Que tipo de conteúdo vai no body | Aula 30, `res.setHeader('Content-Type', 'text/html')` |
| `Location` | response | Para onde o browser deve ir num redirecionamento | Aula 33, com o código `302` |

> 💡 **Maiúsculas ou minúsculas?** Os nomes dos headers não distinguem maiúsculas de minúsculas. É por isso que no Node aparecem em minúsculas (`'user-agent'`), mesmo que escrevas `'Content-Type'`.

---

## Onde ver a lista completa

A MDN (documentação de referência da web) tem a lista de todos os headers e para que servem:

👉 [developer.mozilla.org/en-US/docs/Web/HTTP/Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

Usa-a como **dicionário**: quando aparecer um header que não conheces, vais lá ver. Não é para ler de uma ponta à outra.

---

## ✅ A reter

- Requests e responses levam **headers**: meta-informação em pares **nome: valor**.
- **Não é para decorar.** O professor explica cada header quando for preciso.
- Para consultar: a página de headers da **MDN**.
