# 48. Finding & Fixing Syntax Errors

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** um erro de sintaxe dá **sempre** mensagem de erro, com o **ficheiro e a linha**. Mas a linha indicada nem sempre é a do erro verdadeiro. A mensagem diz-te **onde procurar**, não necessariamente **o que está mal**.

---

## Exemplo 1: uma letra a menos

```javascript
cons server = http.createServer(routes);   // falta o t em const
```

**O que diz o VS Code:** sublinha a linha a vermelho. Se passares o rato por cima, diz *"';' expected"*: está à espera de um ponto e vírgula. A mensagem engana, porque o VS Code pensa que `cons` é uma variável e não percebe o que vem a seguir.

**O que diz o Node** (ao fazer `npm start`):

```
SyntaxError: Unexpected identifier 'server'
```

Nenhum dos dois diz *"falta um t"*. Mas os dois **apontam para a linha certa**. O que tens a fazer é **olhar com atenção para essa linha**, letra a letra. Parece óbvio, mas é mesmo assim que se encontram.

---

## Exemplo 2: uma chaveta por fechar

Se te esqueceres de fechar a chaveta de um `if` no `routes.js`:

**O que diz o VS Code:** *"'}' expected"*, mas **no fim do ficheiro**, e não no `if` onde ela falta.

**O que diz o Node:**

```
SyntaxError: Unexpected token ...
    at routes.js:52
```

Também aponta para o fim do ficheiro (linha 52), **longe do erro verdadeiro**. O JavaScript só percebe que falta uma chaveta quando chega ao fim e **as contas não batem certo**. Não sabe qual delas ficou por fechar.

**Como encontrar:** percorre os **blocos** do ficheiro (`if`, funções, `req.on(...)`) e confirma que cada `{` tem o seu `}`.

> 💡 **Ajuda do VS Code:** clica ao lado de uma chaveta. O VS Code destaca **o par** dela, a chaveta que ele acha que a fecha. Se o par estiver no sítio errado, encontraste o problema.

---

## A analogia: o corretor ortográfico 📝

O VS Code e o Node são como o **corretor de um processador de texto**: sublinham a frase onde **algo não bate certo**, mas nem sempre adivinham **qual é a palavra errada**. Às vezes o erro está uma ou duas frases antes.

---

## Como procurar um erro de sintaxe

1. **Lê a mensagem** e vê o **ficheiro e a linha** (`routes.js:52`).
2. **Vai a essa linha** e lê-a com calma, letra a letra.
3. **Se não estiver lá**, procura **para trás**: o erro verdadeiro costuma estar antes da linha indicada, nunca depois.
4. **Com chavetas e parênteses**, usa o destaque de pares do VS Code.

Os erros mais comuns são:

- uma **gralha** numa palavra (`cons`, `fucntion`, `requrie`);
- uma **chaveta ou um parêntese** a mais ou a menos;
- **aspas** abertas e não fechadas.

---

## ✅ A reter

- Os erros de sintaxe dão **sempre mensagem de erro**, e o Node **não arranca**.
- A mensagem mostra o **ficheiro e a linha**, mas o erro pode estar **antes** dessa linha.
- O **sublinhado vermelho** do VS Code avisa-te ainda antes de correres o código.
- Com chavetas, clica ao lado de uma para ver **o seu par**.