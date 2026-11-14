# 68. Filtering Paths

**Secção 5 — Working with Express.js**

> **Em resumo:** quando todas as rotas de um ficheiro começam pelo mesmo segmento (por exemplo, `/admin`), esse segmento pode ir para o `app.use('/admin', adminRoutes)`. Dentro do ficheiro, as rotas escrevem-se **sem** o `/admin`. E o **mesmo caminho** pode ter rotas diferentes para **métodos** diferentes.

---

## O código desta aula

### `app.js`

```javascript
app.use('/admin', adminRoutes);   // só pedidos que começam por /admin
app.use(shopRoutes);
```

### `routes/admin.js`

```javascript
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});
```

> 💡 Os comentários `// /admin/add-product => GET` são do professor. Como o caminho dentro do ficheiro já não mostra o `/admin`, ajudam a lembrar **o caminho completo** de cada rota.

---

## Duas ideias novas

### 1. O mesmo caminho, métodos diferentes

O `GET` e o `POST` usam **o mesmo caminho**, `/add-product`:

| Pedido | Rota | O que faz |
|---|---|---|
| **GET** `/admin/add-product` | `router.get('/add-product')` | Mostra o formulário |
| **POST** `/admin/add-product` | `router.post('/add-product')` | Recebe os dados do formulário |

Como os métodos são diferentes, são **duas rotas diferentes**. Antes o POST ia para `/product`, e agora fica tudo no mesmo endereço.

### 2. Um caminho comum no `app.use`

```javascript
app.use('/admin', adminRoutes);
```

Funciona como um **filtro**:

1. Só os pedidos cujo caminho **começa por** `/admin` entram no `adminRoutes`.
2. O Express **tira o `/admin` da frente** antes de comparar com as rotas de dentro do ficheiro.

```
browser pede:          /admin/add-product
app.use('/admin')      começa por /admin? sim → tira o /admin
dentro do admin.js:    procura /add-product → router.get('/add-product') ✅
```

---

## ⚠️ O `/admin` não é automático

O filtro **não redireciona nem acrescenta nada** ao endereço. O caminho completo tem de ser **pedido**:

- **na barra do browser**: `localhost:3000/admin/add-product`;
- **no `action` do formulário**: `action="/admin/add-product"`.

O browser não sabe nada sobre o teu `app.use`, e envia o pedido exatamente para onde lhe disseres. Com `action="/add-product"`, o pedido **não começa por `/admin`**, não entra no `adminRoutes` e acaba na página **404**. Foi o que aconteceu ao professor na aula.

E o endereço antigo, `localhost:3000/add-product`, passa a dar **404**: essa página agora está em `/admin/add-product`.

### A analogia: a morada de um prédio 🏢

`Rua X, n.º 10, 3.º Esq.`

- O carteiro escreve a **morada completa** no envelope: é o browser a pedir `/admin/add-product`.
- Ao chegar ao prédio, o **porteiro** só olha para o **3.º Esq.**, porque já sabe que está no n.º 10: é o `admin.js` a ver só o `/add-product`.

O `/admin` é o **número do prédio**, e o `/add-product` é o **andar**.

---

## ✅ A reter

- **O mesmo caminho** pode ter **rotas diferentes** para `GET` e `POST`.
- **`app.use('/admin', adminRoutes)`** → só entram pedidos que **começam por** `/admin`, e o Express **tira** o `/admin` antes de comparar.
- Dentro do ficheiro, as rotas escrevem-se **sem** o segmento comum.
- O browser e os formulários usam **sempre o caminho completo**: `/admin/add-product`.

---

## 🔗 Ligação ao Nexus

É exatamente assim que as rotas do Nexus estão agrupadas:

```javascript
app.use('/api/tarefas', tarefasRouter);
```

```javascript
// dentro do tarefasRouter
router.get('/', listar);        // GET  /api/tarefas
router.post('/', criar);        // POST /api/tarefas
router.delete('/:id', apagar);  // DELETE /api/tarefas/5
```

O mesmo caminho para métodos diferentes, e o prefixo comum (`/api/tarefas`) no `app.use`.