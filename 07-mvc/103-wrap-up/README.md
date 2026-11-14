# 103. Wrap Up

**Secção 7 — The Model View Controller (MVC)**

> **Em resumo:** o **MVC** está aplicado ao projeto. **Model** = os dados, **View** = o que se vê, **Controller** = liga os dois. Na próxima secção, o projeto da loja cresce, para praticar tudo o que se aprendeu.

---

## Os três papéis, de novo

| Parte | Responsável por… | No projeto |
|---|---|---|
| **Model** | **Toda a lógica dos dados**: guardar, ir buscar e, mais tarde, atualizar e apagar. Na memória, num ficheiro ou numa base de dados, é sempre o model | `models/product.js` |
| **View** | **O que o utilizador vê**. Deve ter **pouca lógica** | `views/*.ejs` |
| **Controller** | **Levar os dados de A para B**, nos dois sentidos | `controllers/products.js`, `controllers/error.js` |

### O controller nos dois sentidos

```
Formulário (View) → Controller → Model   "guarda este produto"
Model → Controller → Página (View)       "mostra estes produtos"
```

---

## Quanta lógica pode ter uma view?

| Engine | Lógica na view |
|---|---|
| **Handlebars** | **Nenhuma**: obriga a pôr tudo no `.js` (aula 89) |
| **EJS** | **Alguma**: `if`, `for`… |

O professor não se importa com **um pouco** de lógica no template, como um `if` ou um `for`. Mas a lógica a sério deve estar **no model** ou **no controller**. Cada um encontra o seu equilíbrio.

---

## A estrutura final da secção

```
├── app.js
├── controllers/
│   ├── products.js     → getAddProduct, postAddProduct, getProducts
│   └── error.js        → get404
├── data/
│   └── products.json   → os produtos guardados
├── models/
│   └── product.js      → class Product: save(), fetchAll()
├── public/css/
├── routes/
│   ├── admin.js        → só caminhos + controller
│   └── shop.js
└── views/
    ├── includes/
    └── *.ejs
```

---

## O que vem a seguir

Por agora, a loja faz pouco: o produto tem só **um campo** no projeto do professor. A **próxima secção** é toda dedicada a **melhorar o projeto** e a **praticar**. As **bases de dados** vêm mais à frente.

---

## 🧠 Testa-te

**1. Quem é responsável por guardar um produto no ficheiro?**
> O **Model**, com o `save()`.

**2. O que faz o controller no `postAddProduct`?**
> Recebe os dados do formulário (View), cria um `Product` e manda-o guardar (Model). Depois redireciona.

**3. Se amanhã os produtos passarem para uma base de dados, que ficheiros mudam?**
> Só o **Model**. O controller continua a chamar `save()` e `fetchAll()`.

**4. Onde deve ficar a lógica: na view ou no controller/model?**
> No **controller** ou no **model**. A view deve ter só a lógica mínima, como um `if` ou um `for`, para mostrar os dados.

---

## ✅ A reter

- **Model** → dados. **View** → apresentação. **Controller** → liga os dois, nos dois sentidos.
- Mudar **onde** se guardam os dados → **só muda o model**.
- **Pouca lógica nas views**.
- Próxima secção: **melhorar a loja** e praticar.