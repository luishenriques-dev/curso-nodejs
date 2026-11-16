# 231. The Current Project Status

**Secção 14 — Sessions & Cookies**

> **Em resumo:** o professor deixa nos recursos o **código atual** do projeto, que já usa **MongoDB** (com o Mongoose, das secções 12–13, que saltei). Muda a **navegação**: os links do admin ficam comentados, e aparece um botão **Login** à direita. A partir daqui, este código passa a ser a **base** da secção.

---

## O que mudou no código do professor

### `views/includes/navigation.ejs`

- Os links **Add Product** e **Admin Products** ficam **comentados** (escondidos).
- Uma **segunda lista** (`<ul>`), a seguir à primeira, com um item novo: **Login**, que leva a **`/login`**.

### `public/css/main.css`

O cabeçalho passa a usar **flexbox**:

```css
.main-header__nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
```

- **`display: flex`** → os itens ficam lado a lado.
- **`justify-content: space-between`** → espaço **entre** as duas listas: os links da loja ficam à **esquerda**, e o **Login** fica à **direita**.

---

## Porquê um login "a fingir"?

A **autenticação** a sério tem uma secção própria, mais à frente. Mas o login é o **exemplo perfeito** para perceber os cookies e as sessões: é informação de **um utilizador específico**, que o servidor tem de **lembrar** de pedido em pedido.

Por isso, nesta secção usa-se um **login fictício**: sem password, só para ver os cookies e as sessões a funcionar.

---

## A rota `/login` ainda não existe

O botão **Login** leva a `/login`, mas ainda **não há** nem a rota, nem o controller, nem a view. Isso é a próxima aula (opcional). O professor sugere **tentar fazer sozinho** primeiro, porque é boa prática. Quem não quiser, pode saltá-la e descarregar o código já pronto.

---

## Como montei esta pasta

1. Descarreguei o `.zip` dos recursos desta aula e copiei o conteúdo para esta pasta, **sem** o `node_modules`.
2. A ligação ao MongoDB passou a ser a **minha** (MongoDB Atlas), com a password no **`.env`**, que **não vai para o GitHub**.
3. `npm install` e `npm start`.

> 📁 **Nomes dos ficheiros:** a partir desta secção, ficam os **nomes do professor** (`models/product.js`, `controllers/shop.js`…). Nas secções 1–11, usei `productModel.js`, `shopController.js`… Mudar os nomes obrigava a mudar todos os `require`, e com os nomes iguais aos do vídeo é mais fácil seguir as aulas.

---

## ✅ A reter

- A partir daqui, a base é o **código do professor**, com **MongoDB**.
- Navegação com **flexbox**: loja à esquerda, **Login** à direita.
- O login desta secção é **fictício**, só para estudar **cookies e sessões**.