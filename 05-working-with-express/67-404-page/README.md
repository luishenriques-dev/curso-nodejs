# 67. Adding a 404 Error Page

**Secção 5 — Working with Express.js**

> **Em resumo:** para mostrar uma página **"não encontrado"**, acrescenta-se um **middleware no fim** do `app.js`, que apanha todos os pedidos que nenhuma rota tratou. Responde com **`res.status(404).send(...)`**.

---

## O problema

Na aula 66, se escrevesses um caminho que não existe (`localhost:3000/abc`), aparecia a mensagem do Express **`Cannot GET /abc`**. Normalmente queremos uma **página 404** nossa.

---

## O código desta aula

No `app.js`, **depois** das rotas:

```javascript
app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);
```

| Abres | Resultado |
|---|---|
| `localhost:3000/add-product` | O formulário (continua a funcionar) |
| `localhost:3000/` | Hello from Express! |
| `localhost:3000/abc` | **Page not found**, com o código **404** |

---

## Porque é que funciona: o middleware "apanha-tudo"

O pedido percorre os middlewares **de cima para baixo** e **pára no primeiro que responde** (aulas 61 e 63):

```
pedido /abc
   │
   ▼
adminRoutes  → nenhuma rota é /abc → segue
shopRoutes   → nenhuma rota é /abc → segue
404          → apanha TUDO o que chegou aqui → responde "Page not found"
```

- **Não tem caminho**, por isso aceita qualquer um. Um `'/'` seria igual (é o valor por defeito).
- Usa **`app.use`**, por isso aceita **qualquer método**: GET, POST…
- Só chegam cá os pedidos que **nenhuma rota tratou**, porque os outros já responderam antes.

> ⚠️ **Tem de ficar no fim.** Se o pusesses no topo, apanhava **todos** os pedidos, e nenhuma página funcionava.

### A analogia: o balcão de "perdidos e achados" 🧳

No fim do corredor de uma loja há um balcão que diz *"não encontrou o que procurava? Venha cá."* Só lá chegam as pessoas que **não encontraram nada** nos balcões anteriores.

---

## `res.status(404)`

```javascript
res.status(404).send('<h1>Page not found</h1>');
```

- **`res.status(404)`** define o **código de estado** da resposta. Sem ele, seria **200** ("correu bem"), o que não é verdade.
- **404** é o código universal para **"não encontrado"** (aula 33).

### Encadear métodos

O `status()` devolve o próprio `res`, por isso podes **encadear** chamadas:

```javascript
res.status(404).setHeader('X-Exemplo', 'algo').send('...');
```

A regra é que o **`send()` fica sempre no fim**, porque é ele que envia.

> 💡 O `status()` pode usar-se em **qualquer** rota, não só na 404. Por exemplo, num erro de dados de um formulário.

---

## ✅ A reter

- **Página 404** = um middleware **sem caminho**, **no fim** de todas as rotas.
- Só lá chegam os pedidos que **ninguém tratou**.
- **`res.status(404)`** → o código de estado certo.
- Os métodos **encadeiam-se**: `res.status(...).send(...)`, com o `send` no fim.

---

## 🔗 Ligação ao Nexus

No Nexus, o "apanha-tudo" do fim costuma devolver JSON, porque quem o recebe é o frontend:

```javascript
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});
```

O frontend vê o código **404** e mostra a mensagem certa ao utilizador.