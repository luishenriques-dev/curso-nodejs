# 154. MUST READ: findById() in Sequelize 5

**Secção 11 — Understanding Sequelize**

> **Em resumo:** a partir do **Sequelize 5**, o método **`findById()`** passou a chamar-se **`findByPk()`**. Funciona **exatamente igual**: sempre que o professor escrever `findById`, escreve-se **`findByPk`**.

---

## A mudança

```javascript
Product.findById(prodId)   // ❌ não existe nas versões atuais
Product.findByPk(prodId)   // ✅
```

**`Pk`** = ***Primary Key***, a **chave primária** (aula 140). Procura o registo pela chave primária: no nosso caso, o **`id`**.

> ⚠️ Com o `findById`, o Node dá o erro **`Product.findById is not a function`**.

---

## Porque é que o vídeo usa o nome antigo?

O curso foi gravado com uma versão **mais antiga** do Sequelize. O `npm install sequelize` instala a **mais recente**. Pode haver mais **pequenas diferenças** como esta: se um método do vídeo der *"is not a function"*, vale a pena procurar **o nome atual** na documentação, em **sequelize.org**.

> 💡 Não confundir com o **`findById` do meu model antigo** (aulas 119 e 145): esse fui eu que o escrevi. Este é um método **do Sequelize**.

---

## ✅ A reter

- **`findById()`** → **`findByPk()`**.
- **Pk** = *Primary Key*, o `id`.
- O curso usa uma versão antiga do Sequelize: se algo der *"is not a function"*, procurar o nome atual.