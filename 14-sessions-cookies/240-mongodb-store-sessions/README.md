# 240. Using MongoDB to Store Sessions

**Secção 14 — Sessions & Cookies**

> **Em resumo:** guardar as sessões **na memória** não serve para uma app a sério: a memória é **limitada**, e perde-se tudo quando o servidor reinicia. Por isso, instala-se o **`connect-mongodb-session`** e as sessões passam a ficar **no MongoDB**, numa coleção **`sessions`**. Basta criar um **`store`** e passá-lo ao `session({...})`.

---

## O problema das sessões na memória

| | Na memória (aula 239) | **Na base de dados** (aula 240) |
|---|---|---|
| Muitos utilizadores | ❌ A memória **enche** | ✅ |
| Servidor reinicia | ❌ Perdem-se **todas** | ✅ Continuam lá |
| Segurança | Pior | Melhor |
| Uso | Só em **desenvolvimento** | **Produção** (app a sério) |

O `express-session` aceita muitos sítios para guardar as sessões (a lista está no fim da página do pacote no GitHub): MongoDB, MySQL, Redis, ficheiros… Usa-se o **MongoDB** porque o projeto já o usa.

> 💡 Para **MySQL** existe o `express-mysql-session`, e para o **Sequelize** o `connect-session-sequelize`. A ideia é a mesma.

---

## 1. Instalar

```bash
npm install --save connect-mongodb-session
```

---

## 2. `app.js`

```javascript
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// ...

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

// ...

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// ...

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  // ...
```

| Linha | O que faz |
|---|---|
| `require('connect-mongodb-session')(session)` | O pacote devolve uma **função**. Chama-se logo com o `session` (do `express-session`) e devolve o **"molde"** do armazém: `MongoDBStore` |
| `new MongoDBStore({...})` | Cria o **armazém** das sessões |
| `uri` | **Onde** fica a base de dados: o mesmo endereço do `mongoose.connect` |
| `collection: 'sessions'` | O nome da **coleção** onde ficam as sessões (escolhe-se à vontade) |
| `store: store` | Diz ao `express-session`: *"guarda as sessões **neste** armazém"* |

> 🧥 **Analogia do bengaleiro:** até agora, os casacos ficavam **pendurados nos braços do funcionário** (a memória): poucos casacos cabem, e se ele se cansar e os largar (o servidor reiniciar), perdem-se todos. Agora há um **armazém a sério** (o MongoDB).

### O endereço no `.env`

O professor guarda o endereço numa constante `MONGODB_URI` no próprio `app.js`. No meu projeto, já está no **`.env`**, por isso uso **`process.env.MONGODB_URI`** nos dois sítios.

> ⚠️ No vídeo, dá erro por causa do **`?retryWrites=true`** no fim do endereço, e o professor tira-o. Se acontecer, tira-se do `.env`: o endereço acaba em **`/shop`**.

> 💡 As sessões ficam na mesma base de dados (`shop`) que os produtos e os utilizadores. Podia-se usar outra base de dados, com outro endereço.

---

## Testar

1. **Login** → botão **Login**.
2. No **Atlas** → **Data Explorer** → base de dados **`shop`** → coleção **`sessions`** → aparece a sessão:

```javascript
{
  _id: "...",                       // o número da sessão
  expires: 2026-12-03T...,          // quando expira (por defeito, daqui a 2 semanas)
  session: {
    cookie: { ... },
    isLoggedIn: true                // ← o que guardámos no postLogin
  }
}
```

3. Guarda um ficheiro qualquer (o nodemon reinicia) → **continuas com login** ✅ Na aula 239, perdia-se.

---

## Para que mais servem as sessões?

Para **qualquer dado** que:
- pertence a **um** utilizador,
- não se quer perder entre **pedidos**,
- e **não deve ser visto** pelos outros utilizadores.

Por exemplo: o **login**, e também o **carrinho de compras** (em vez de o guardar numa tabela).

---

## ✅ A reter

- Sessões **na memória** → só para desenvolvimento.
- Em produção → guardar as sessões **numa base de dados** (aqui, MongoDB).
- **`connect-mongodb-session`** → `new MongoDBStore({ uri, collection })` → **`store`** no `session({...})`.
- As sessões ficam numa coleção **`sessions`**, e **sobrevivem** a reinícios do servidor.