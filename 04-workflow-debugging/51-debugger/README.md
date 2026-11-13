# 51. Using the Debugger

**Secção 4 — Improved Development Workflow and Debugging**

> **Em resumo:** com o código parado num breakpoint, olha para as variáveis **uma a uma**, a partir do resultado errado. A primeira variável com um valor inesperado mostra-te **onde está o erro**.

---

## O exemplo da aula: encontrar o `[0]`

O professor continua o erro da aula 50 (`split('=')[0]` em vez de `[1]`). Com o breakpoint na linha do `split`:

| O que vê | Valor | Conclusão |
|---|---|---|
| `parsedBody` | `'message=tist'` | ✅ O texto escrito **chegou bem** |
| `parsedBody.split('=')` | `['message', 'tist']` | ✅ O `split` **funciona** |
| `message` | `'message'` | ❌ Está a tirar o elemento **errado** do array |

Se o texto chegou bem e o `split` funciona, só sobra **o índice**: `[0]` em vez de `[1]`. Erro encontrado.

---

## Experimentar código na Debug Console

Com o código parado, podes **escrever código** na **Debug Console** (no painel de baixo) e carregar Enter. Por exemplo:

```javascript
parsedBody.split('=')
```

A consola mostra o resultado: `['message', 'tist']`.

- Serve para **testar uma ideia** antes de a pores no código.
- **Não altera** o código que está a correr.

---

## Cuidado: o Node não corre linha a linha

O código dentro de um **callback** (como o `req.on('end', ...)` ou o callback do `writeFile`) corre **mais tarde** (aula 35). Para o analisares, o breakpoint tem de estar **dentro do callback**, e não na linha antes dele.

---

## ✅ A reter

- Começa pelo **resultado errado** e verifica as variáveis **para trás**, até encontrares a primeira com um valor inesperado.
- Na **Debug Console** podes **testar código** com o programa parado, sem o alterar.
- Para analisar um **callback**, põe o breakpoint **lá dentro**.