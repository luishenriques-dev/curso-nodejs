# 132. Wrap Up

**Secção 9 — Dynamic Routes & Advanced Models**

> **Em resumo:** nesta secção aprendeu-se a **passar dados pelo URL** (route params e query params) e a fazer **mais coisas com os models**. Guardar em ficheiros tem limites, e na próxima secção entram as **bases de dados**.

---

## 1. Route params — `/products/:productId`

| O quê | Como |
|---|---|
| Definir na rota | **`:`** + um nome → `router.get('/products/:productId', ...)` |
| Ler no controller | **`req.params.productId`**, com o **mesmo nome** |
| Vários numa rota | Possível → `/products/:productId/:outro` |
| Cuidado | **Rotas específicas antes** das que têm `:` (aula 118) |

---

## 2. Query params — `?edit=true`

| O quê | Como |
|---|---|
| No URL | Depois de um **`?`** → `/edit-product/123?edit=true` |
| Vários | Separados por **`&`** → `?edit=true&modo=x` |
| Ler no controller | **`req.query.edit`** |
| Registar na rota? | **Não**: lêem-se diretamente |
| Cuidado | São **opcionais**: se dependeres de um, **verifica se veio** |

> ⚠️ Os valores chegam **sempre como texto**: `req.query.edit` é `"true"`, e não `true`.

### Route params vs query params

| | Route params | Query params |
|---|---|---|
| Exemplo | `/products/123` | `?edit=true` |
| Faz parte do caminho? | **Sim** | Não, é um **extra** |
| Obrigatório? | Sim: sem ele, a rota não corresponde | **Não**: é opcional |
| Para quê | **Qual** coisa (o ID) | **Opções** ou modos |

---

## 3. Models

| O quê | Exemplo |
|---|---|
| Métodos novos no `Product` | **`findById`** (aula 119) e **`deleteById`** (aula 127) |
| Um model **só com `static`** | O **`Cart`**: há **um só** carrinho, por isso não se usa `new` |
| Models que **falam entre si** | Apagar um produto → tira-o também do carrinho |

---

## 4. Técnicas que ficam

| Técnica | Para quê |
|---|---|
| **`<input type="hidden">`** | Mandar o **ID** num formulário POST (para editar e apagar) |
| **`find` / `findIndex` / `filter`** | Procurar, saber a posição, ou apagar de um array |
| Mandar **só o ID** | E ir buscar o resto **no servidor** |

---

## O que vem a seguir

Ficheiros **não são uma boa forma** de guardar dados: o acesso é **lento** e há limites. A próxima secção é sobre **bases de dados** com Node e Express.

---

## 🧠 Testa-te

**1. Como se lê o `123` em `/products/123`, se a rota for `/products/:productId`?**
> **`req.params.productId`**

**2. E o `true` em `/edit-product/5?edit=true`?**
> **`req.query.edit`**, e chega como **texto**: `"true"`.

**3. É preciso pôr o `?edit` na definição da rota?**
> **Não.** Os query params não se registam na rota.

**4. Porque é que `/products/delete` tem de vir antes de `/products/:productId`?**
> Porque o Express lê **de cima para baixo**, e o `:productId` apanharia o `delete` como se fosse um ID.

**5. Para que serve o `<input type="hidden">`?**
> Para mandar o **ID** num formulário POST, **sem aparecer** na página.

---

## ✅ A reter

- **`:nome`** na rota → **`req.params.nome`**.
- **`?nome=valor`** no URL → **`req.query.nome`**: opcional, e sempre texto.
- Models: **`findById`**, **`deleteById`**, e o **`Cart`** só com `static`.
- **Input escondido** para mandar o ID nos formulários.
- Próxima secção: **bases de dados**.