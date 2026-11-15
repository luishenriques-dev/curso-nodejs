# 137. Comparing SQL and NoSQL

**Secção 10 — SQL Introduction**

> **Em resumo:** quando uma app cresce, a base de dados tem de **aguentar mais** (*scaling*). Há duas formas: **vertical** (um servidor mais forte) e **horizontal** (mais servidores). O **SQL** cresce bem na **vertical**, e o **NoSQL** cresce mais facilmente na **horizontal**. Nenhum é "melhor": depende dos dados.

---

## Escalar: vertical vs horizontal

| | Vertical ⬆️ | Horizontal ➡️ |
|---|---|---|
| O que é | Um servidor **mais forte**: mais CPU, mais memória | **Mais servidores**, e os dados divididos entre eles |
| Facilidade | **Fácil**: na nuvem, escolhes um plano maior e pagas mais | **Difícil**: é preciso juntar resultados de vários servidores |
| Limite | **Tem**: uma máquina não fica infinitamente forte | Quase **não tem**: podes sempre juntar mais |

> 🏪 **Analogia:** a loja tem muitos clientes. **Vertical** = contratar um funcionário **mais rápido**. **Horizontal** = abrir **mais caixas**.

---

## SQL vs NoSQL

| | SQL | NoSQL |
|---|---|---|
| Esquema | **Fixo** | **Flexível** |
| Relações | **Sim**: dados divididos por tabelas ligadas | **Pouco**: dados juntos no mesmo documento |
| Escalar **vertical** | ✅ Fácil | ✅ Fácil |
| Escalar **horizontal** | ⚠️ **Difícil ou impossível** | ✅ **Mais fácil** (os serviços na nuvem tratam disso) |
| Muitas leituras e escritas por segundo | Pode chegar ao **limite**, sobretudo com *joins* complexos | **Muito eficiente** |

---

## Quando usar cada um

| Usa **SQL** quando… | Usa **NoSQL** quando… |
|---|---|
| As **relações** entre os dados são importantes | Os dados **mudam muito** e há **muitos acessos** |
| Queres um **esquema forte**: dados sempre organizados | Cada "coisa" pode ficar **num só documento** |
| Os dados **não mudam a toda a hora** | As relações **não são essenciais** |
| Ex.: **utilizadores**, produtos | Ex.: **encomendas**, **carrinhos** |

> 💡 Na mesma app, podes até usar **os dois**, cada um para a parte onde é mais forte.

---

## No curso

O professor faz o projeto **com os dois**:

1. **SQL** (MySQL), nesta secção e na seguinte (Sequelize);
2. **NoSQL** (MongoDB), mais à frente.

O objetivo é saber usar **os dois**, porque num emprego muitas vezes **não és tu** que escolhes a base de dados.

---

## ✅ A reter

- **Vertical** = servidor mais forte, fácil mas com limite. **Horizontal** = mais servidores, difícil mas quase sem limite.
- **SQL**: esquema e relações, e escala bem na **vertical**.
- **NoSQL**: flexível e rápido, e escala melhor na **horizontal**.
- A escolha depende **dos dados** e de **como são usados**.