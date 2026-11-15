# 136. NoSQL Introduction

**Secção 10 — SQL Introduction**

> **Em resumo:** numa base de dados **NoSQL** (como o **MongoDB**), as tabelas chamam-se **coleções** e os registos chamam-se **documentos**, que são parecidos com **objetos JavaScript**. **Não há esquema fixo** (cada documento pode ter campos diferentes), e em vez de ligar tabelas, **copiam-se os dados** para onde são precisos.

---

## Os nomes: SQL vs NoSQL

| SQL | NoSQL |
|---|---|
| Base de dados | Base de dados |
| **Tabela** | **Coleção** |
| **Registo** (linha) | **Documento** |

---

## Como é um documento

```javascript
{ name: 'Max', age: 29 }
{ name: 'Manuel' }            // ← sem "age", e não faz mal
```

Parece um **objeto JavaScript**. Lembra-te dos produtos no `products.json` (aula 100): é muito parecido.

---

## As características do NoSQL

### 1. Sem esquema fixo

Os documentos da **mesma coleção** podem ter **campos diferentes**. No exemplo, o "Manuel" não tem idade.

> 💡 No **SQL** isto não acontecia: todas as linhas seguem as mesmas colunas (aula 135).

### 2. Poucas (ou nenhumas) relações: copiam-se os dados

Em SQL, uma encomenda **liga-se** ao utilizador pelo ID, e para ver os dois juntos é preciso **juntar as tabelas**.

Em NoSQL, a encomenda **guarda uma cópia** dos dados do utilizador que precisa:

```javascript
// coleção "orders"
{
  id: 'o1',
  user: { id: 'u1', name: 'Max' },        // ← cópia dos dados do utilizador
  product: { id: 'p1', title: 'Book' }
}
```

| | Vantagem | Desvantagem |
|---|---|---|
| **Copiar os dados** | Para mostrar uma encomenda, lês **só a coleção das encomendas**: é **rápido** | Se o nome do utilizador mudar, tens de o atualizar **em vários sítios** |

> 💡 No NoSQL dá para relacionar documentos, mas faz-se **pouco**: prefere-se que cada documento tenha **tudo o que precisa**.

---

## SQL vs NoSQL (até agora)

| | SQL | NoSQL |
|---|---|---|
| Organização | Tabelas e registos | Coleções e documentos |
| Esquema | **Fixo** | **Flexível** |
| Relações | **Sim**: liga-se pelo ID | **Pouco**: copiam-se os dados |
| Ponto forte | Dados **organizados e consistentes** | **Rapidez** e flexibilidade |

> 💡 Na próxima aula, o professor compara os dois em mais detalhe, incluindo como **crescem** quando há muitos dados (*scaling*).

---

## ✅ A reter

- NoSQL: **coleções** de **documentos** (parecidos com objetos JS).
- **Sem esquema fixo**: documentos diferentes na mesma coleção.
- **Copiam-se os dados** em vez de os relacionar → leituras **rápidas**, mas atualizações em vários sítios.
- Exemplo de NoSQL: **MongoDB**. Exemplo de SQL: **MySQL**.