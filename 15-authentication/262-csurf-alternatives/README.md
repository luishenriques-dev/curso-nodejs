# 262. csurf() Alternatives

**Secção 15 — Authentication**

> **Em resumo:** o pacote **csurf** está **descontinuado** (deprecated). Continua a servir para aprender, porque os ataques são simulados localmente. Para uma aplicação real, deves usar outro pacote, por exemplo o **csrf-csrf**. O princípio do token CSRF é o mesmo, independentemente do pacote.

---

## 1. Porque é que o csurf deixou de ser recomendado

A equipa do Express marcou o `csurf` como **deprecated** e recomenda não o usar em projetos novos. Mantém-se no curso porque as aulas explicam o **princípio** do CSRF, e não o pacote em si.

---

## 2. Alternativas

| Pacote | Notas |
|---|---|
| `csurf` | Usado nas aulas. Descontinuado. Bom para aprender |
| `csrf-csrf` | Alternativa mantida. API diferente do `csurf()` |

> 💡 Procura outras opções em `npmjs.com` com a pesquisa `express csrf`.

---

## 3. O que muda e o que não muda

- **Muda:** o nome das funções que se chamam no `app.js` e a forma de gerar o token.
- **Não muda:** o princípio. O token é gerado por página, vai no campo `_csrf` dos formulários `POST` e o servidor valida-o.

> ⚠️ Não é preciso mudar nada no teu projeto para continuar o curso. Mantém o `csurf`.

---

## ✅ A reter

- O `csurf` está descontinuado, mas serve para aprender o princípio.
- Em projetos reais, usa uma alternativa mantida, como o `csrf-csrf`.
- O princípio do token CSRF é independente do pacote.