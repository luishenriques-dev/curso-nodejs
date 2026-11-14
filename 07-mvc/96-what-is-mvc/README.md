# 96. What is the MVC?

**Secção 7 — The Model View Controller (MVC)**

> **Em resumo:** **MVC** = **Model, View, Controller**. É uma forma de **separar responsabilidades** (*separation of concerns*): cada parte do código faz **uma coisa**, e sabe-se sempre quem é responsável por quê.

---

## Os três papéis

| Parte | Responsável por… | No teu projeto |
|---|---|---|
| **Model** | Os **dados**: representá-los, guardá-los, ir buscá-los (à memória, a um ficheiro ou a uma base de dados) | Hoje: o array `products` no `admin.js`. Vai passar para uma pasta **`models`** |
| **View** | **O que o utilizador vê**: o HTML que vai para o browser | A pasta **`views`**, com os `.ejs`. Já existe! |
| **Controller** | **Ligar os dois**: pede os dados ao Model e escolhe que View mostrar, com que dados | Hoje: as funções `(req, res, next) => {...}` dentro das rotas. Vão passar para uma pasta **`controllers`** |

### E as rotas?

As **rotas** dizem **quando** cada controller corre: *"para um **GET** em **`/admin/add-product`**, corre este controller"*. Ficam só com o **caminho**, o **método** e **que controller chamar**.

---

## Como funciona um pedido

```
browser → ROTA        "GET /? Isso é com o controller da loja"
            ↓
          CONTROLLER  "Model, dá-me os produtos"
            ↓    ↑
          MODEL       "Aqui estão"
            ↓
          CONTROLLER  "View 'shop', mostra estes produtos"
            ↓
          VIEW        → HTML → browser
```

---

## A analogia: um restaurante 🍽️

| MVC | No restaurante |
|---|---|
| **Rota** | A **porta** e o **balcão de entrada**: encaminha o cliente para o empregado certo |
| **Controller** | O **empregado de mesa**: recebe o pedido, vai à cozinha, traz o prato |
| **Model** | A **cozinha e a despensa**: onde estão e se preparam os ingredientes (os dados) |
| **View** | O **prato servido**: o que o cliente vê |

O empregado **não cozinha**, e a cozinha **não fala com o cliente**. Cada um faz o seu papel. É isso o *separation of concerns*.

---

## No Express

Como o Express é todo feito de **middleware**, os controllers são **funções de middleware** `(req, res, next)`. Mais à frente, alguma lógica pode até ser dividida por **vários middlewares**.

---

## ✅ A reter

- **Model** → dados. **View** → o que se vê. **Controller** → liga os dois.
- **Rotas** → *quando* (caminho + método) cada controller corre.
- Objetivo: **cada parte do código tem um só papel**.
- A pasta `views` já existe. Nas próximas aulas criam-se as pastas **`controllers`** e **`models`**.