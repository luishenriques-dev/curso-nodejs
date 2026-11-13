# 43. Installing 3rd Party Packages

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** com o `npm install` instalas **pacotes de terceiros**: código feito por outras pessoas, que não vem com o Node. Nesta aula instala-se o **nodemon** como dependência de **desenvolvimento**.

---

## O que são pacotes de terceiros

Até agora só usaste **core modules** (`http`, `fs`), que vêm com o Node. Mas muitas vezes precisas de funcionalidades que o Node não traz, como validar o que o utilizador escreve, facilitar as rotas (o **Express**) ou ler o body dos pedidos (o **body-parser**).

Em vez de escreveres isso tudo de raiz, **instalas um pacote** que alguém já fez. Há milhares deles, todos guardados no **npm registry**, um repositório na internet.

---

## A analogia: as compras 🛒

| No npm | Nas compras |
|---|---|
| **npm registry** (npmjs.com) | O armazém com milhares de produtos |
| **`npm install nome`** | Encomendar um produto |
| **`package.json`** | A **lista de compras**: o que o projeto precisa |
| **`package-lock.json`** | O **talão**: as marcas e versões exatas que vieram |
| **`node_modules/`** | A **despensa**, onde ficam os produtos |

---

## O problema que esta aula resolve

Sempre que alteras o código, tens de **parar o servidor** (Ctrl + C) e **voltar a arrancá-lo** (`npm start`) para ver as mudanças. Dá trabalho.

O pacote **nodemon** resolve isso: **reinicia o servidor sozinho** sempre que guardas um ficheiro. Nesta aula só o instalas. O uso vem na aula 45.

---

## Como descobrir pacotes

- Pela experiência, por cursos como este, ou pesquisando no Google o problema que queres resolver.
- No site **[npmjs.com](https://www.npmjs.com)**, cada pacote tem uma página com a descrição, as instruções de instalação e de uso, a popularidade e a versão mais recente.

---

## Instalar: três formas

```bash
npm install nodemon --save-dev   # dependência de DESENVOLVIMENTO (é o que se usa nesta aula)
npm install express              # dependência de PRODUÇÃO
npm install -g nodemon           # GLOBAL, para o computador inteiro
```

| Tipo | Para quê | Onde fica registado |
|---|---|---|
| **`--save-dev`** | Pacotes que **só ajudam enquanto programas**. O nodemon é um deles: no servidor real, o código não muda, por isso não é preciso reiniciar | `devDependencies` no `package.json` |
| **(sem nada)** | Pacotes que o **teu código usa a correr**, também no servidor real. O Express, por exemplo | `dependencies` no `package.json` |
| **`-g`** | Instala no **computador**, não no projeto. Fica disponível em qualquer pasta | Não fica no `package.json` |

> 💡 A diferença entre `--save-dev` e o normal não muda o funcionamento. Serve para **saberes para que é cada pacote**.

---

## O que aparece depois do `npm install`

Na pasta da aula:

```bash
cd 04-workflow-debugging/43-third-party-packages
npm install nodemon --save-dev
```

Aparecem três mudanças:

### 1. O `package.json` ganha uma secção nova

```json
"devDependencies": {
  "nodemon": "^3.1.0"
}
```

O número é a **versão** instalada. O **`^`** à frente quer dizer: *"se alguém correr `npm install` mais tarde, pode instalar uma versão mais recente, desde que seja compatível"*.

### 2. A pasta `node_modules/`

É onde fica **o código do pacote**. É **enorme**, porque o nodemon precisa de outros pacotes para funcionar, e esses também são instalados.

- **Não vai para o Git**: o `.gitignore` ignora-a.
- **Podes apagá-la** se precisares de espaço. Para a recriar, corres **`npm install`** sem nome de pacote: o npm lê o `package.json` e instala tudo o que lá está.

### 3. O ficheiro `package-lock.json`

Regista as **versões exatas** de cada pacote instalado, incluindo os pacotes de que eles dependem. Assim, quem fizer `npm install` mais tarde, como tu no Mac, recebe **exatamente as mesmas versões**.

- **Vai para o Git**: faz commit dele.

---

## ✅ A reter

- **Pacotes de terceiros** = código de outras pessoas, que vem do **npm registry**.
- **`npm install nome --save-dev`** → só para desenvolvimento (`devDependencies`).
- **`npm install nome`** → usado pela aplicação (`dependencies`).
- **`npm install -g nome`** → global, no computador.
- **`npm install`** sozinho → instala tudo o que está no `package.json`.
- **`node_modules`** não vai para o Git. **`package.json`** e **`package-lock.json`** vão.

---

## 🔗 Ligação ao Nexus

Abre o `package.json` do Nexus e vais ver as duas secções:

- em **`dependencies`**, o que a aplicação usa a correr: o Express, o pacote do MySQL…
- em **`devDependencies`**, as ferramentas para quem programa: o TypeScript, os tipos (`@types/...`), o nodemon ou equivalente…

É por isso que, quando clonas o Nexus num computador novo, o primeiro comando é sempre `npm install`.
