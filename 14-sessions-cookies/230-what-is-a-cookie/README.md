# 230. What is a Cookie?

**Secção 14 — Sessions & Cookies**

> **Em resumo:** um **cookie** é um pequeno pedaço de informação que o **servidor envia na resposta** e que o **browser guarda**. Depois, o browser **envia-o de volta automaticamente** em **todos os pedidos seguintes** para esse servidor. Serve, por exemplo, para o servidor se lembrar de que o utilizador **já fez login**.

---

## O problema: o servidor "esquece-se" de tudo

Cada pedido (abrir uma página, recarregar, submeter um formulário) é **independente**. O servidor **não se lembra** do pedido anterior.

Por isso, se fazes login e depois **recarregas a página** (um pedido novo), o servidor **já não sabe** que fizeste login. É preciso guardar essa informação **algures**.

---

## A solução: o cookie

```
1. Utilizador → submete o login              → Servidor
2. Servidor   → resposta + COOKIE ("loggedIn=true") → Browser guarda o cookie
3. Utilizador → recarrega a página (pedido novo, já com o COOKIE) → Servidor
4. Servidor   → lê o cookie → "ah, este já fez login"
```

| Quem | Faz o quê |
|---|---|
| **Servidor** | **Cria** o cookie e envia-o **na resposta** |
| **Browser** | **Guarda** o cookie e **envia-o de volta** em **cada pedido** seguinte, sozinho |

> 🎟️ **Analogia:** numa discoteca, à entrada, carimbam-te a mão. Cada vez que sais e voltas a entrar, **mostras o carimbo** e o segurança deixa-te passar sem perguntar nada. O **carimbo é o cookie**: ficas **tu** com ele, e mostra-lo **sempre**.

---

## Onde fica guardado

O cookie fica **do lado do cliente**: no **browser** do utilizador, e não no servidor.

> 💡 Dá para ver os cookies de um site no browser: **F12** (ferramentas de programador) → separador **Application** (Chrome) ou **Storage** (Firefox / Safari) → **Cookies**.

---

## ✅ A reter

- O servidor **esquece-se** de tudo entre pedidos.
- O **cookie** é criado pelo **servidor**, enviado **na resposta**, e **guardado no browser**.
- O browser **envia-o sozinho** em **todos os pedidos seguintes**.
- Serve, por exemplo, para lembrar que o utilizador **fez login**.