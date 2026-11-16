# 162. Creating & Managing a Dummy User

**Secção 11 — Understanding Sequelize**

> **Em resumo:** ainda não há login, por isso cria-se um **utilizador de teste** ao arrancar, **só se ainda não existir**. Depois, um **middleware** vai buscá-lo a cada pedido e guarda-o em **`req.user`**, para ficar disponível em toda a app. Sai também o **`force: true`**.

---

## Parte 1 — Criar o utilizador ao arrancar

> 📇 **Analogia:** chegas ao escritório e vais ver se já há a ficha do "Max" no arquivo. Se houver, usas essa. Se não houver, crias uma. **Nunca crias duas.**

### `app.js` — o `sync`

```javascript
sequelize
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    console.log(user);
    app.listen(3000, () => console.log('Pode abrir a app em http://localhost:3000'));
  })
  .catch(err => console.log(err));
```

| O que mudou | Porquê |
|---|---|
| Saiu o **`{ force: true }`** | As tabelas já estão certas (aula 161). Assim, os dados **deixam de ser apagados** a cada arranque |
| **`User.findByPk(1)`** | Procura o utilizador com o id 1 |
| **`if (!user)` → `User.create(...)`** | Se não existir, cria-o. Tem de preencher **todos os campos** do model |
| **`return user`** | Se já existir, passa-o para o `.then` seguinte |
| O **`app.listen`** foi para o **último `.then`** | O servidor só arranca **depois** de haver utilizador |

São *promises* **em fila** com `return`, como na aula 158.

### O `Promise.resolve(user)` do professor

O professor escreve `return Promise.resolve(user)` em vez de `return user`. A ideia é que o `.then` devolva **sempre o mesmo tipo de coisa**: no `if` devolve uma *promise* (o `create`), e no outro caso também. Mas ele próprio diz que **não é preciso**: um valor devolvido dentro de um `.then` é **automaticamente embrulhado** numa *promise*. Por isso, `return user` chega.

### O que se vê no terminal

- **1.º arranque:** aparece um **`INSERT INTO users`**, e no objeto aparece `isNewRecord: true`. O utilizador foi **criado**.
- **Arranques seguintes:** **não** há `INSERT`. O utilizador foi só **encontrado**.

> 💡 Se mudares o nome no `create` (ex.: para "Candeias") depois do 1.º arranque, continua a aparecer "Max". É normal: o utilizador 1 **já existe**, por isso o `create` **nunca corre**.

---

## Parte 2 — Guardar o utilizador em `req.user`

> 🎫 **Analogia:** à entrada do edifício, a receção põe-te um **crachá** com o teu nome. Depois disso, qualquer sala por onde passes já sabe quem és, sem perguntar outra vez.

### `app.js` — um middleware novo

Fica **depois** do `bodyParser` e do `express.static`, e **antes** das rotas:

```javascript
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
```

- **`req.user = user`** → o crachá. A partir daqui, **qualquer controller** pode usar **`req.user`**.
- Pode-se juntar campos novos ao `req`, desde que **não se estrague um que já existe** (como o `req.body`).
- **`next()`** fica **dentro do `.then`**: o pedido só segue para as rotas **depois** de o utilizador ter chegado.

### "Como é que já existe utilizador aqui, se só é criado lá em baixo?"

| Quando corre? | O quê |
|---|---|
| No **`npm start`** | O `sequelize.sync()` e a fila de `.then`, até ao `app.listen` |
| A **cada pedido** (abrir uma página) | A função do `app.use` |

O `app.use` **só regista** a função, que **não corre** ao arrancar. E só chegam pedidos **depois** do `app.listen`, que está no fim da fila. Nessa altura, o utilizador **já existe**, garantidamente.

### O `req.user` é um objeto Sequelize

Não é só `{ name, email }`: traz também os **métodos** do Sequelize, como o **`save()`** e o **`destroy()`**. Isto vai ser útil já na próxima aula.

---

## ✅ A reter

- Sem login, usa-se um **utilizador de teste**: `findByPk(1)` → se não existir, `create`.
- **Tirar o `force: true`** depois de as tabelas estarem certas.
- O **`app.listen`** fica no **fim da fila**, para o servidor só arrancar quando tudo está pronto.
- Um **middleware** guarda o utilizador em **`req.user`**: fica disponível em toda a app.
- O **`next()`** vai **dentro do `.then`**.
- O `req.user` é um **objeto Sequelize**, com métodos.