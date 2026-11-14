# 100. Storing Data in Files Via the Model

**Secção 7 — The Model View Controller (MVC)**

> **Em resumo:** o `save()` do model deixa de usar o array e passa a guardar os produtos num **ficheiro**: `data/products.json`. Assim, os produtos **não se perdem** quando o servidor reinicia. O **controller não muda nada**: é a vantagem do model (aula 99).

---

## Porquê um ficheiro?

| | Array (aula 99) | Ficheiro (esta aula) |
|---|---|---|
| Onde ficam os dados | Na **memória** do servidor | No **disco**, num ficheiro |
| Quando o servidor reinicia | **Perdem-se** | **Ficam** |

É a diferença entre decorar uma lista **de cabeça** e escrevê-la **num caderno guardado na gaveta**.

> 💡 Ainda não é uma base de dados, mas já é um passo nessa direção.

---

## A estrutura

```
99-.../
├── data/                 ← nova; cria-a à mão, antes de testar
│   └── products.json     ← criado sozinho no primeiro save
├── models/
│   └── product.js
└── ...
```

---

## O que é JSON

Um ficheiro **`.json`** guarda dados num formato **parecido com objetos e arrays de JavaScript**, mas **em texto**:

```json
[{"title":"Book","price":"10"},{"title":"Pen","price":"2"}]
```

O Node tem um objeto **`JSON`** que já vem incluído, sem `require`:

| Método | Converte… | Usa-se… |
|---|---|---|
| **`JSON.parse(texto)`** | **texto** → array/objeto JS | Depois de **ler** o ficheiro |
| **`JSON.stringify(array)`** | array/objeto JS → **texto** | Antes de **escrever** no ficheiro |

---

## O código desta aula

### `models/product.js`

```javascript
const fs = require('fs');
const path = require('path');

module.exports = class Product {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  save() {
    const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll() {
    const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return [];
      }
      return JSON.parse(fileContent);
    });
  }
};
```

> ⚠️ **No fim desta aula, o `fetchAll` ainda não funciona**: a loja dá erro. É de propósito: o professor explica e corrige na aula seguinte (101).

---

## O `save()`, passo a passo

Para guardar um produto novo **sem apagar os antigos**:

```
1. Ler o ficheiro (readFile)
      ├── deu erro?  → o ficheiro ainda não existe → começa com []
      └── não deu    → JSON.parse → array com os produtos antigos
2. Juntar o produto novo (push)
3. Escrever o array todo de volta no ficheiro (writeFile + JSON.stringify)
```

| Parte | O que faz |
|---|---|
| `path.join(..., 'data', 'products.json')` | O caminho do ficheiro (aula 70). `path.dirname(require.main.filename)` é a **raiz do projeto** (aula 73) |
| `fs.readFile(p, (err, fileContent) => {...})` | Lê o ficheiro **todo**. Quando acaba, corre a função com o **erro** (ou `null`) e o **conteúdo** |
| `if (!err)` | "Se **não** houve erro". O **`!`** quer dizer "não" |
| `products.push(this)` | Junta **este** produto ao array |
| `fs.writeFile(p, ...)` | Escreve o ficheiro, **substituindo** o conteúdo antigo |

### ⚠️ Porquê a função seta `=>`?

Dentro do `readFile` usa-se o **`this`** (este produto). Com uma **função seta**, o `this` continua a ser o produto. Com uma `function` normal, o `this` **perdia-se** e o `push` guardava outra coisa.

---

## Os módulos usados

| Módulo | Para quê | Já visto em |
|---|---|---|
| **`fs`** (file system) | Ler e escrever ficheiros | Aulas 33–34 (`writeFile`) |
| **`path`** | Construir caminhos que funcionem em qualquer sistema | Aula 70 |

São **core modules**: só precisam de `require`, sem instalar.

> 💡 Para ficheiros **muito grandes**, ler tudo de uma vez gasta muita memória. Aí usa-se um **stream** (`fs.createReadStream`), como os *chunks* da aula 33. Aqui o ficheiro é pequeno, por isso o `readFile` serve.

---

## Testar

1. Cria a pasta **`data`** na raiz do projeto.
2. Adiciona um produto. Aparece o ficheiro **`data/products.json`** com esse produto.
3. Adiciona outro. O ficheiro passa a ter **os dois**.

> 💡 O nodemon também vigia os ficheiros **`.json`**, por isso **reinicia** o servidor cada vez que um produto é guardado. É normal, e agora os produtos já não se perdem com isso.

---

## ✅ A reter

- Os produtos passam a ficar em **`data/products.json`**, e **sobrevivem** a um reinício do servidor.
- **`fs.readFile`** → lê. **`fs.writeFile`** → escreve, substituindo o conteúdo.
- **`JSON.parse`** → texto → JS. **`JSON.stringify`** → JS → texto.
- Para guardar: **ler → juntar → escrever**.
- **Função seta** dentro do `readFile` para o **`this`** não se perder.
- Só o **model** mudou. O controller ficou igual.
- O `fetchAll` ainda tem um problema, resolvido na aula 101.