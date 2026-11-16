# 174. Useful Resources & Links

**Secção 11 — Understanding Sequelize**

> O professor deixa o **código-fonte** da secção (para usar, corre-se **`npm install`** na pasta extraída) e um link útil.

---

## Links

- **Documentação oficial do Sequelize:** https://sequelize.org/docs/v6/
  - O link do curso (`docs.sequelizejs.com`) é antigo e redireciona para aqui.

### Partes mais úteis da documentação

| Tema | O que tem |
|---|---|
| **Model Basics** | `sequelize.define`, tipos de dados (`INTEGER`, `STRING`, `DOUBLE`…) |
| **Model Querying – Basics** | `findAll`, `where`, `Op.or`, `Op.like`… |
| **Associations** | `hasOne`, `hasMany`, `belongsTo`, `belongsToMany` e **todos os métodos "mágicos"** |
| **Eager Loading** | O `include` (aula 172) |
| **Migrations** | Mudar tabelas **sem perder dados** (a alternativa ao `force: true`) |
| **Dialect-Specific Things** | Configurar o **SQL Server** (`dialect: 'mssql'`) |

---

## ✅ Fim da secção 11

Próximo passo: **secção 14 (Sessions & Cookies)**. As secções 12–13 (MongoDB / Mongoose) ficam saltadas.