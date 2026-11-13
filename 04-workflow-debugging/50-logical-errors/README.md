# 50. Logical Errors

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** um erro lógico **não dá mensagem**: a aplicação só faz outra coisa que não a que querias. Para os encontrar usa-se o **debugger** do VS Code. Ele **pára o código numa linha** (um **breakpoint**) e deixa-te ver **o que está dentro de cada variável** nesse momento.

---

## O exemplo da aula: o índice errado

No `routes.js`, o professor troca o `[1]` por `[0]`:

```javascript
const message = parsedBody.split('=')[0];   // devia ser [1]
```

| | `split('=')` | `[0]` | `[1]` |
|---|---|---|---|
| `'message=teste'` | `['message', 'teste']` | `'message'` ❌ | `'teste'` ✅ |

Escreves `teste` no formulário e o ficheiro fica com **`message`**. **Nenhum erro**: o servidor corre, redireciona, grava o ficheiro. Só o conteúdo está errado.

Aqui sabemos onde está o problema porque fomos nós que o estragámos. Mas se te tivesses enganado sem dar por isso, **por onde começavas a procurar?** É para isso que serve o debugger.

---

## A analogia: o comando da televisão ⏸️

O código normal corre como um **vídeo a velocidade normal**: tudo passa num instante e só vês o resultado final.

O debugger é o **comando com pausa**:

- **⏸️ Pausa** numa cena (o **breakpoint**);
- **🔍 Vês tudo** o que está no ecrã nesse momento (as **variáveis**);
- **⏭️ Avanças fotograma a fotograma** (linha a linha) até veres onde a história corre mal.

---

## Usar o debugger, passo a passo

### 1. Parar o servidor normal

Se tens o `npm start` a correr, **pára-o com Ctrl + C**. O debugger vai arrancar o servidor ele próprio, e não podem estar os dois a usar a porta 3000.

### 2. Arrancar em modo debug

1. Abre o **`app.js`** no editor. Tem de ser o ficheiro principal.
2. No menu: **Run → Start Debugging** (ou carrega em **F5**).
3. Se perguntar o ambiente, escolhe **Node.js**.

Sabes que está em modo debug porque:

- aparece uma **barra de botões** no topo do editor;
- a **barra de baixo** do VS Code fica de outra cor (vermelha ou laranja);
- a **Debug Console**, no painel de baixo, diz que o debugger está ligado.

### 3. Pôr um breakpoint

No `routes.js`, clica **à esquerda do número da linha** onde queres parar, por exemplo a do `split`. Aparece um **ponto vermelho** 🔴.

### 4. Provocar o código

Vai ao browser e **submete o formulário**. O código corre até ao breakpoint e **pára**:

- a linha fica **destacada a amarelo**, com uma **seta amarela**;
- o browser fica **à espera**, porque o servidor está em pausa.

> ⚠️ O código pára **antes** de executar a linha amarela. Se estás na linha `const message = ...`, a `message` ainda é **`undefined`**.

### 5. Espreitar as variáveis

- **Passa o rato** por cima de uma variável para ver o valor. Por exemplo, o `parsedBody` mostra `'message=teste'`.
- No painel **Run and Debug** (o ícone do triângulo com o inseto, na barra da esquerda), tens:

| Secção | O que mostra |
|---|---|
| **Variables** | Todas as variáveis disponíveis **neste momento** e os seus valores |
| **Watch** | Variáveis que **escolhes vigiar**: clica no **+** e escreve, por exemplo, `message` |
| **Call Stack** | **Por onde passou o código** até chegar aqui. Muito dele é código interno do Node |
| **Breakpoints** | A lista dos teus breakpoints. Podes desligar um sem o apagar |

### 6. Avançar no código

Com os botões da barra do topo:

| Botão | Tecla | O que faz |
|---|---|---|
| ▶️ **Continue** | F5 | Continua a correr até ao **próximo breakpoint** |
| ⤵️ **Step Over** | F10 | Executa a linha e vai para a **seguinte** |
| ⬇️ **Step Into** | F11 | **Entra dentro** da função chamada nessa linha, mesmo que seja do Node, como o `writeFile` |
| ⬆️ **Step Out** | Shift + F11 | **Sai** da função onde entraste |
| 🔄 **Restart** | | Reinicia o debug |
| ⏹️ **Stop** | Shift + F5 | Termina o debug |

Com o **Step Over** (F10), executas a linha do `split` e vês logo no painel que a `message` ficou com **`'message'`** e não com `'teste'`. **Encontraste o erro.**

> 💡 O **Step Into** pode levar-te para dentro do código do Node, como aconteceu ao professor com o `writeFile`. Se isso acontecer, usa o **Step Out** para voltares ao teu código.

---

## ✅ A reter

- **Erro lógico** = sem mensagem de erro, só o resultado errado.
- **Debugger:** `Run → Start Debugging` (F5), com o `app.js` aberto. Pára primeiro o `npm start`.
- **Breakpoint** = ponto vermelho à esquerda da linha. O código **pára antes** dessa linha.
- Com o código parado: **passa o rato** pelas variáveis, ou usa os painéis **Variables** e **Watch**.
- **F10** avança linha a linha. **F5** continua até ao próximo breakpoint.
- Próxima aula: usar o debugger "a sério" para encontrar o erro.

---

## 🔗 Ligação ao Nexus

O debugger funciona exatamente igual no Nexus, e também no **Codespaces**. Quando uma rota devolver dados errados sem dar erro, põe um breakpoint dentro dela e vê o que está no `req.body`, no resultado da query à base de dados, etc. É muito mais rápido do que encher o código de `console.log`.