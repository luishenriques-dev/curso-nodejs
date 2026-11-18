# 235. Manipulating Cookies

**Secção 14 — Sessions & Cookies**

> **Em resumo:** o grande defeito dos cookies: **o utilizador pode alterá-los** no browser. Se o login dependesse só do cookie `LoggedIn=true`, qualquer pessoa podia **fingir que fez login**, escrevendo `true` à mão. Por isso, **dados sensíveis nunca vão para cookies**. A solução são as **sessões**, que guardam os dados **no servidor**.

---

## O problema: o cookie está nas mãos do utilizador

O cookie fica **no browser**, e o browser é **do utilizador**. Qualquer pessoa pode abri-lo e mudá-lo:

**F12** → **Application** → **Cookies** → `http://localhost:3000` → **duplo clique** no valor → escreve outro valor → recarrega a página.

> 🎟️ **Analogia:** é como um **carimbo na mão** que qualquer pessoa consegue desenhar com uma caneta. O segurança deixa entrar quem o desenhar.

---

## O que o professor mostra

### 1. `'false'` também conta como login

Muda o valor para `false` → **continua com login**!

O cookie chega como **texto**: `'false'`, e não `false`. Num `if`, **qualquer texto não vazio** conta como **verdadeiro**.

```javascript
if ('false') { ... }   // ✅ entra! É texto, e não o valor false
```

A correção é comparar com o texto `'true'`:

```javascript
isAuthenticated: isLoggedIn === 'true'
```

> 💡 A minha versão (aula 234), com o **`.includes('LoggedIn=true')`**, já não tem este problema: devolve um `true` ou `false` "a sério".

### 2. Escrever `true` à mão → login sem password

Volta a pôr `true` no cookie e recarrega → **tem login**, sem ter passado pela página de Login ❌

**Este é o problema a sério.** Não há forma de o servidor saber se o cookie foi criado por ele ou escrito à mão.

---

## A conclusão

| Serve para cookies | **Não** serve para cookies |
|---|---|
| Preferências (tema escuro, idioma) | **Login** / se o utilizador está autenticado |
| Rastreio de publicidade | Permissões (se é admin) |
| Coisas que não fazem mal se forem alteradas | Qualquer **dado sensível** |

**A solução:** as **sessões**. Os dados ficam **no servidor**, onde o utilizador **não lhes toca**, e o cookie só guarda um **número** que diz *"esta é a sessão X"*.

> 💡 O professor também refere que há **pacotes** para ler cookies sem o `split` complicado (por exemplo, o `cookie-parser`). Mas com as sessões nem é preciso.

---

## ✅ A reter

- O **utilizador pode alterar os cookies** (F12 → Application → Cookies).
- Um cookie chega sempre como **texto**: `'false'` conta como verdadeiro num `if`.
- **Nunca** guardar dados sensíveis (como o login) **só** num cookie.
- A solução são as **sessões**: os dados ficam **no servidor**.