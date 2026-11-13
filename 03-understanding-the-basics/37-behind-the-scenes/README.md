# 37. Node.js - Looking Behind the Scenes

**Secção 3 — Understanding the Basics**

> **Em resumo:** o Node corre o teu JavaScript **numa só thread**, mas não faz o trabalho pesado nela. Passa-o a um **worker pool** (várias threads, geridas pelo sistema operativo). O **event loop** só corre os **callbacks**, que são rápidos.

Esta aula é **teoria**. Não tem código e não é para decorar: o objetivo é ficares com a imagem geral.

---

## A pergunta desta aula

O Node usa **uma só thread** para o teu JavaScript. Então:

1. **Desempenho:** se o pedido A está a gravar um ficheiro enorme, o pedido B fica à espera?
2. **Segurança:** se todos os pedidos correm na mesma thread, o pedido A consegue ver os dados do pedido B?

A resposta às duas é **não**. Esta aula explica porquê.

---

## A imagem geral

```
          O teu código JavaScript
                    │
                    ▼
     ┌──────────────────────────────┐
     │  EVENT LOOP  (uma só thread)  │  ← corre os callbacks (código rápido)
     └──────────────────────────────┘
          │ envia            ▲ "acabei!" → corre o callback
          ▼                  │
     ┌──────────────────────────────┐
     │  WORKER POOL (várias threads) │  ← faz o trabalho pesado
     │  ficheiros, rede, ...         │    (ligado ao sistema operativo)
     └──────────────────────────────┘
```

| Peça | O que faz | Quem a gere |
|---|---|---|
| **Event loop** | Corre os **callbacks** quando os eventos acontecem. Código rápido | O Node, automaticamente, quando o programa arranca |
| **Worker pool** | Faz o **trabalho pesado**: ler e gravar ficheiros, operações de rede | O Node e o sistema operativo, em várias threads |

Não escreves código nenhum para isto funcionar. Se usares as funções sem `Sync` (aula 36), o Node trata do resto.

---

## A analogia: o restaurante 🍽️

- **O empregado de mesa** é o **event loop**. Só há um. Anota os pedidos, entrega os pratos, leva a conta. Tudo coisas rápidas.
- **A cozinha** é o **worker pool**. Vários cozinheiros a trabalhar ao mesmo tempo nos pratos que demoram.
- O empregado **nunca vai para a cozinha cozinhar**. Entrega o pedido e volta à sala.
- Quando um prato fica pronto, a cozinha **toca a campainha** (o evento). O empregado vai buscá-lo e leva-o à mesa (corre o **callback**).

Com o `writeFileSync`, era como se o empregado fosse ele próprio cozinhar: a sala inteira ficava à espera.

---

## As fases do event loop (só para teres uma ideia)

O event loop é um ciclo que se repete sem parar. Em cada volta, passa por estas fases, por esta ordem:

| Fase | O que corre |
|---|---|
| 1. **Timers** | Callbacks de `setTimeout` e `setInterval` cujo tempo já passou |
| 2. **Pending callbacks** | Callbacks de **I/O** (input/output: ficheiros, rede) que ficaram para trás |
| 3. **Poll** | Procura **novos eventos de I/O** e corre os callbacks deles, se puder |
| 4. **Check** | Callbacks de `setImmediate` |
| 5. **Close callbacks** | Callbacks de eventos de "fecho" |
| → **Sair?** | Só se **não houver mais listeners** registados |

> 💡 **Não precisas de saber isto de cor.** O próprio professor diz que estas fases normalmente não importam. Fica com a imagem geral da secção anterior.

---

## Quando é que o programa termina? (o contador `refs`)

O Node tem um **contador** de trabalho pendente, chamado **refs**:

- cada listener ou callback registado → **+1**;
- cada um que já não é preciso → **−1**;
- quando o contador chega a **0**, não há mais nada para fazer e **o programa termina**.

Num servidor, o `server.listen()` regista um listener que **nunca acaba**. O contador nunca chega a 0, e é por isso que o servidor fica sempre a correr. É o mesmo que vimos na aula 27, agora com o nome do mecanismo.

---

## E a segurança entre pedidos?

A função do `createServer` corre **uma vez para cada pedido**, e cada execução tem as **suas próprias variáveis**. O `req`, o `res` e o `body` do pedido A vivem dentro da execução do pedido A, e o pedido B **não lhes consegue aceder**. É assim que o JavaScript funciona: cada função tem o seu **âmbito** (*scope*).

> ⚠️ Esta separação **não existe** para variáveis criadas **fora** da função (por exemplo, no topo do ficheiro). Essas são partilhadas por todos os pedidos. O professor volta a este tema mais à frente.

---

## ✅ A reter

- O teu JavaScript corre numa **só thread**, no **event loop**.
- O trabalho pesado (ficheiros, rede) vai para o **worker pool**, que usa **várias threads**.
- Quando o trabalho acaba, o **callback** volta ao event loop e é executado.
- O programa só termina quando já **não há listeners registados** (`refs` = 0). Num servidor, isso nunca acontece.
- Cada pedido tem as **suas próprias variáveis**, dentro da função do `createServer`.

---

## 🔗 Ligação ao Nexus

Isto explica duas regras que vais seguir no Nexus:

1. **Nada de `...Sync` nas rotas.** Bloqueia o event loop, ou seja, o "empregado de mesa" de todos os utilizadores.
2. **Cuidado com variáveis no topo dos ficheiros.** Uma variável como `let utilizadorAtual` fora das rotas seria partilhada por **todos** os pedidos, e o utilizador A podia ver dados do utilizador B. O que pertence a um pedido vive **dentro** da rota (`req`, `res` ou variáveis locais).
