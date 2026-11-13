# 47. Understanding different Error Types

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** há **três tipos de erros**. Os de **sintaxe** (o código está mal escrito), os de **execução** (está bem escrito mas rebenta a correr) e os **lógicos** (corre sem erros, mas não faz o que querias).

Nunca vais escrever um programa sem erros. O importante é **saber de que tipo é cada erro**, porque cada tipo encontra-se e resolve-se de forma diferente.

---

## Os três tipos

| Tipo | O que é | Há mensagem de erro? | Dificuldade |
|---|---|---|---|
| **Sintaxe** (*syntax*) | O código está **mal escrito**: falta uma chaveta, há uma gralha | ✅ Sim, logo ao arrancar | 🟢 Fácil |
| **Execução** (*runtime*) | O código está bem escrito, mas **rebenta quando corre** uma certa linha | ✅ Sim, quando essa linha corre | 🟡 Média |
| **Lógico** (*logical*) | O código **corre sem erros**, mas faz **outra coisa** que não a que querias | ❌ Não | 🔴 Difícil |

---

## A analogia: uma receita 📖

- **Sintaxe**: a receita tem uma **palavra impossível de ler**. Nem começas a cozinhar.
- **Execução**: a receita está bem escrita, mas a meio diz *"junta os ovos"* e **não há ovos**. Paras a meio.
- **Lógico**: a receita corre do princípio ao fim, sem problemas, mas puseste **sal em vez de açúcar**. O bolo sai, mas não é o que querias.

---

## Exemplos que já te aconteceram

Já encontraste os três tipos neste curso.

### Sintaxe

Se te esqueceres de fechar uma chaveta, ou escreveres `const` como `cosnt`, o Node **nem arranca**. Mostra logo um `SyntaxError`, com o ficheiro e a linha.

### Execução

- **`Cannot set headers after they are sent`** (aulas 35 e 36): o código estava bem escrito, mas tentava responder duas vezes.
- **`The argument 'encoding' is invalid`** (aula 34, com os dois campos do formulário): o `writeFileSync` recebeu um valor que não esperava.
- **As aspas dentro do `<title>`** (tarefa 1): `'...URL '/' ...'` é JavaScript válido, porque o Node lê-o como **texto ÷ texto**. Não é um erro de sintaxe. Só rebentou **quando a linha correu**: o `write` recebeu `NaN` em vez de texto.

### Lógico

- **`Context-Type` em vez de `Content-Type`** (aula 30 e seguintes): nenhum erro. O servidor arrancava e respondia, mas o browser recebia um header que não conhecia. No Codespaces, a página aparecia como texto.
- **`action="/form"` em vez de `"/message"`** (aula 32): nenhum erro. O formulário enviava o pedido para outro sítio e aparecia a página por defeito.

Estes são os mais difíceis, porque **nada te avisa**: só reparas que o resultado não é o esperado.

---

## ✅ A reter

- **Sintaxe** → código mal escrito. O Node **não arranca** e diz-te onde está o erro.
- **Execução** → código bem escrito que **rebenta a correr**. A mensagem diz-te a linha.
- **Lógico** → **sem mensagem**: o resultado é que está errado. Encontra-se a investigar, e é para isso que serve o **debugger** que vem nas próximas aulas.
- Próximas aulas: como encontrar e corrigir cada tipo, a começar pelos de sintaxe.
