# 236. Configuring Cookies

**Secção 14 — Sessions & Cookies**

> **Em resumo:** além do `nome=valor`, um cookie pode ter **opções**, separadas por `;`: **quanto tempo dura** (`Max-Age` / `Expires`), **para que site é enviado** (`Domain`), **só com https** (`Secure`) e **escondido do JavaScript** (`HttpOnly`). O professor explica também porque é que os cookies são tão usados no **rastreio** de utilizadores.

---

## Porque é que os cookies servem para rastrear

Um cookie **não tem de ser da página em que estás**. Muitos sites têm um **pixel de rastreio**: uma "imagem" invisível que vem, por exemplo, dos servidores da Google. Ao carregar essa imagem, o browser envia **o cookie da Google**.

Assim, a Google sabe **por que sites andas**, mesmo que não estejas nos sites dela. Só funciona porque o cookie fica **no teu computador**, e vai contigo para todo o lado.

> 💡 É por isso que os browsers permitem **bloquear cookies de terceiros**, e que os sites mostram aqueles avisos de "aceitar cookies".

---

## As opções de um cookie

```javascript
res.setHeader('Set-Cookie', 'LoggedIn=true; Max-Age=10; HttpOnly');
//                           └─ nome=valor ┘  └──── opções, separadas por ; ────┘
```

| Opção | Faz o quê | Exemplo |
|---|---|---|
| **`Expires=<data>`** | O cookie apaga-se **nessa data** (formato de data HTTP) | `Expires=Wed, 21 Oct 2026 07:28:00 GMT` |
| **`Max-Age=<segundos>`** | O cookie apaga-se **ao fim de X segundos** | `Max-Age=10` |
| `Domain=<site>` | **Para que site** é enviado | `Domain=exemplo.com` |
| **`Secure`** | Só é criado se a página usar **https** | `Secure` |
| **`HttpOnly`** | O **JavaScript do browser não o consegue ler** | `HttpOnly` |

### Sem `Expires` nem `Max-Age`

É um **cookie de sessão**: apaga-se quando se **fecha o browser**.

### `Max-Age` — o "Lembrar-me"

Com **`Max-Age=10`**: faz-se login, espera-se 10 segundos, recarrega-se a página, e **o login desapareceu**. O cookie expirou.

O **"Lembrar-me"** dos sites é isto, com um valor **grande**, por exemplo `Max-Age=2592000` (30 dias).

> 💡 Mais tarde, com a autenticação, serve para controlar **quanto tempo dura o login**.

### `Secure` — só com https

O `localhost` usa **http**, e não https. Por isso, com `Secure`, **o cookie nem é criado**. O professor mostra isto, e volta a usar https mais à frente no curso.

### `HttpOnly` — proteção contra código malicioso

No Chrome (**F12** → **Application** → **Cookies**), aparece um **visto** na coluna **HttpOnly**.

- O cookie **continua a ser enviado** ao servidor em todos os pedidos.
- Mas o **JavaScript que corre no browser não o consegue ler**.
- Protege contra ataques **XSS** (*cross-site scripting*): se alguém conseguir meter código malicioso na página, esse código **não consegue roubar** o cookie.

> ⚠️ O `HttpOnly` **não impede** o utilizador de mudar o cookie nas ferramentas do browser (aula 235). Por isso, continua a não se guardar *"estou com login"* num cookie.

---

## O código no fim da aula

```javascript
exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'LoggedIn=true; HttpOnly');
  res.redirect('/');
};
```

> 💡 Na prática, raramente se configura um cookie à mão: os **pacotes** (de sessões, de autenticação) fazem isso por nós. É o que vem nas próximas aulas.

---

## ✅ A reter

- As opções vêm **a seguir** ao `nome=valor`, separadas por **`;`**.
- **`Max-Age`** / **`Expires`** → quanto tempo dura. Sem nenhum → apaga-se ao **fechar o browser**.
- **`Secure`** → só com **https**.
- **`HttpOnly`** → o **JavaScript do browser não o lê** (proteção contra XSS).
- Os cookies são muito usados para **rastrear** utilizadores entre sites.