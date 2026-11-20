# 263. Fixing the Order Button

**Secção 15 — Authentication**

> **Em resumo:** na versão do curso, o botão **Order Now** falhava com `username is required`, porque a encomenda pedia um nome que o registo não recolhe. A correção do curso troca o nome pelo email. **No teu projeto, o modelo mantém o `name` e as encomendas funcionam**, por isso não é preciso alterar nada.

---

## 1. O erro do curso

Na versão do curso, o `orderModel.js` exigia um `username`, e o `postOrder` não o enviava. Como o registo só recolhe o email, a encomenda falhava.

> 🧥 **Analogia do talão:** a loja pede o nome do cliente no talão. Se o cliente só deu o email, o talão tem de pedir o email.

---

## 2. A correção do curso

Se o teu modelo exigisse `username` e o registo só tivesse o email, a alteração seria:

No `models/orderModel.js`:

```javascript
user: {
  email: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}
```

No `controllers/shopController.js`, na função `postOrder`:

```javascript
const order = new Order({
  items: products,
  user: {
    email: req.user.email,
    userId: req.user
  }
});
```

---

## 3. O teu projeto

O teu modelo de encomenda mantém o `name`, e as encomendas funcionam. Por isso, **não alteras nada** nesta aula.

---

## Testar

1. Faz login.
2. Adiciona um produto ao carrinho.
3. Carrega em **Order Now**. A encomenda deve ser criada e o carrinho deve ficar vazio.
4. Faz logout.

---

## ✅ A reter

- A encomenda precisa de um campo obrigatório que o modelo espera. Se o modelo e o controlador concordarem, não há erro.
- No teu projeto, o nome do utilizador continua a ser guardado, e a encomenda funciona.