# 234. Setting a Cookie

**Secção 14 — Sessions & Cookies**

> **Em resumo:** para lembrar o login **entre pedidos**, o servidor cria um **cookie** com **`res.setHeader('Set-Cookie', 'loggedIn=true')`**. O browser **guarda-o** e **envia-o sozinho** em **todos os pedidos** seguintes. O servidor lê-o com **`req.get('Cookie')`**. Agora, os links do admin **aparecem** depois do login ✅

---

## Porque não uma variável global?

O `req` morre a cada pedido (aula 233). Uma alternativa seria uma **variável global**, que sobrevive entre pedidos. Mas seria **partilhada por todos os utilizadores**: se **um** fizesse login, ficavam **todos** com login ❌

O **cookie** fica no browser de **cada** utilizador. É **pessoal**, e não afeta os outros ✅

| | Dura entre pedidos? | É de cada utilizador? |
|---|---|---|
| `req.isLoggedIn` (aula 233) | ❌ | ✅ |
| Variável global | ✅ | ❌ |
| **Cookie** | ✅ | ✅ |

---

## 1. Criar o cookie — `postLogin`

```javascript
exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true');
  res.redirect('/');
};
```

- **`res.setHeader`** junta um **cabeçalho** (*header*) à resposta.
- **`Set-Cookie`** é um nome **reservado**: diz ao browser *"guarda este cookie"*.
- O valor é um par **`nome=valor`**. O nome e o valor escolhem-se à vontade. No meu código, o nome ficou **`LoggedIn`** (com L maiúsculo).

### Ver o cookie no browser (Chrome)

**F12** → separador **Application** → **Cookies** → `http://localhost:3000` → aparece **`loggedIn`** com o valor **`true`**.

| Coluna | Significado |
|---|---|
| Domain | O site a que o cookie pertence (`localhost`) |
| Path | Em que páginas é enviado (`/` = todas) |
| Expires | **Session** = apaga-se quando se **fecha o browser** |

### O browser envia-o sozinho

**F12** → separador **Network** → clica num pedido (por exemplo, `products`) → **Headers** → **Request Headers** → aparece **`Cookie: loggedIn=true`**.

---

## 2. Ler o cookie — `getLogin` (e as outras páginas)

### ⚠️ A versão do vídeo (frágil)

```javascript
const isLoggedIn = req
  .get('Cookie')
  .split(';')[1]
  .trim()
  .split('=')[1];
```

- **`req.get('Cookie')`** → a linha com **todos** os cookies, separados por `;`. Por exemplo: `outro=abc; loggedIn=true`.
- **`.split(';')[1]`** → vai buscar o **segundo** cookie, e o `[0]` seria o primeiro.

**Só funciona no browser do professor**, que tinha **outro cookie antes**. O próprio professor avisa: *"se só tiveres um cookie, usa o `[0]`"*.

No meu browser, rebentou de duas formas:
- **Sem nenhum cookie** (antes do primeiro login): `req.get('Cookie')` é **`undefined`** → *Cannot read properties of undefined (reading 'split')*.
- **Com um só cookie**: o `[1]` não existe → *Cannot read properties of undefined (reading 'trim')*.

Com **um** cookie só, o professor sugere o **`[0]`** (o primeiro). Experimentei, e funcionou, mas continuava a rebentar quando o browser **não tinha nenhum cookie**.

### ✅ A versão que usei (segura)

```javascript
exports.getLogin = (req, res, next) => {
  const cookie = req.get('Cookie');
  const isLoggedIn = cookie ? cookie.includes('LoggedIn=true') : false;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn
  });
};
```

- **`cookie ? ... : false`** → se **não houver** cookies, é `false` (sem login), em vez de rebentar.
- **`.includes('LoggedIn=true')`** → procura o cookie **em qualquer posição**, sem contar com `[0]` ou `[1]`. Funciona em qualquer browser.
- O nome tem de ser **igual** ao do `Set-Cookie`, com o L **maiúsculo**.

> 💡 O professor diz que ler cookies "à mão" assim é **complicado**. Nas próximas aulas deixa de se fazer assim: com as **sessões**, é um pacote que trata disto.

---

## Testar

1. **Login** → botão **Login** → vai para a página inicial.
2. Volta a clicar em **Login**: os links **Add Product** e **Admin Products** aparecem ✅
3. Muda de página e volta ao Login: continuam lá. O cookie **dura entre pedidos**.

> 💡 Nesta aula, o cookie só é lido no **`getLogin`**. Nas outras páginas, os links ainda não aparecem.

---

## ⚠️ Mas há um grande problema…

O professor acaba a aula com uma pergunta: *"há uma grande desvantagem, sabes qual é?"* A resposta vem na próxima aula.

---

## ✅ A reter

- **Cookie** = dados guardados no **browser de cada utilizador**, enviados **sozinhos** em **todos os pedidos**.
- **Criar:** `res.setHeader('Set-Cookie', 'nome=valor')`.
- **Ler:** `req.get('Cookie')` → todos os cookies numa linha, separados por `;`.
- Ver no Chrome: **F12** → **Application** → **Cookies**.
- Um cookie **sem data de validade** é um **cookie de sessão**: apaga-se quando se fecha o browser.
- Ler cookies "à mão" é frágil, e é melhor usar `.includes` do que contar posições.