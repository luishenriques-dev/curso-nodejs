# 138. Setting Up MySQL

**Secção 10 — SQL Introduction**

> **Em resumo:** instala-se o **MySQL Server** (a base de dados) e o **MySQL Workbench** (um programa visual para ver o que está lá dentro). No fim, cria-se uma base de dados chamada **`node-complete`**.

---

## As duas peças

| Programa | O que é | Analogia |
|---|---|---|
| **MySQL Community Server** | A **base de dados** em si, que fica a correr no Mac | O **arquivo** onde estão as gavetas |
| **MySQL Workbench** | Um programa **visual** para ver e mexer na base de dados | A **janela** para espreitar o arquivo |

A app Node fala com o **Server**. O Workbench é só para **nós** vermos o que lá está, e ajuda muito a encontrar erros.

> 💡 A versão **Community** é **gratuita** e chega para o curso.

---

## Instalar no Mac

### 1. MySQL Community Server

1. Vai a **mysql.com** → **Downloads** → **MySQL Community (GPL) Downloads** → **MySQL Community Server**.
2. Escolhe **macOS** e o ficheiro **DMG Archive**:
   - Mac com chip **M1/M2/M3/M4** → **ARM, 64-bit**;
   - Mac com **Intel** → **x86, 64-bit**.
3. Se pedir para iniciar sessão: **"No thanks, just start my download"**.
4. Abre o `.dmg` e segue o instalador.
5. Na configuração, define a **password do utilizador `root`**. **Guarda-a bem**: vais precisar dela.
6. Deixa marcado **"Start MySQL Server once the installation is complete"**.

> ⚠️ **A encriptação da password.** No vídeo, o professor escolhe a **"Legacy Password Encryption"**, porque a biblioteca antiga não suportava a nova. As versões **atuais** do MySQL podem já não ter essa opção, e não faz mal: o pacote que o curso usa (**`mysql2`**) funciona com a encriptação **nova**, a que vem por defeito.

### 2. MySQL Workbench

No Mac, **não vem junto**: é preciso instalar à parte.

1. Volta a **MySQL Community Downloads** → **MySQL Workbench**.
2. Escolhe **macOS** e a versão certa para o teu chip, descarrega e instala.

### 3. Confirmar que funciona

1. Abre o **MySQL Workbench**.
2. Deve aparecer a tua ligação local (**Local instance**). Clica nela e escreve a **password do `root`**.
3. Se ligar, está tudo bem.

> 💡 No Mac, em **Definições do Sistema**, aparece um painel **MySQL**, onde podes **ligar e desligar** o servidor. Se o Workbench não conseguir ligar, vê primeiro se o servidor está a correr.

---

## Criar a base de dados do curso

No Workbench:

1. No painel da esquerda, vai a **Schemas**. *Schema* é, aqui, o mesmo que **base de dados**.
2. Clique direito → **Create Schema**.
3. Nome: **`node-complete`**.
4. Deixa o resto por defeito e carrega em **Apply** (canto inferior direito), e depois outra vez **Apply** e **Finish**.

A base de dados `node-complete` aparece na lista, **ainda sem tabelas**. As tabelas criam-se nas próximas aulas.

---

## ⚠️ Cuidado com a password e o GitHub

Na próxima aula, a password do `root` vai aparecer **no código** da ligação à base de dados. O repositório do curso é **público**: **não faças commit da password verdadeira**. Na aula 139 vemos como evitar isso.

---

## ✅ A reter

- **MySQL Server** = a base de dados. **Workbench** = a janela visual para a ver.
- No Mac, instalam-se **os dois, à parte**.
- **Password do `root`** → guarda-a, e **não** a ponhas no GitHub.
- Criar a base de dados: Workbench → **Schemas** → **Create Schema** → `node-complete`.