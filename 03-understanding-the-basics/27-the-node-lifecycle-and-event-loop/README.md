# 27. The Node Lifecycle & Event Loop

**Secção 3 — Understanding the Basics**

> **Em resumo:** o Node não termina o programa enquanto houver *listeners* registados. É o **event loop** que o mantém vivo, e é por isso que o servidor da aula 26 nunca "acaba".

---

## A pergunta desta aula

Na aula 26, corremos `node app.js` e o terminal ficou "preso". Num script normal, o Node lê o ficheiro, executa-o e termina. **Porque é que este não terminou?**

A resposta é o **event loop**.

---

## O ciclo de vida de um programa Node

```
node app.js
     │
     ▼
1. Lê o ficheiro todo e executa-o de cima a baixo
   (regista variáveis, funções e listeners)
     │
     ▼
2. Event loop: ainda há listeners registados?
     │
     ├── Sim ──▶ fica à espera de eventos
     │            │
     │            ▼
     │         chega um evento (ex.: um request)
     │            │
     │            ▼
     │         executa a função associada
     │            │
     │            └──▶ volta ao passo 2
     │
     └── Não ──▶ o programa termina e o terminal fica livre
```

No servidor da aula 26, a função que passámos ao `createServer` é um **event listener**: *"quando chegar um request, executa isto"*. Esse listener nunca é removido, por isso o event loop continua a correr para sempre. É exatamente isso que queremos de um servidor.

---

## A analogia: o empregado de mesa 🍽️

Imagina um restaurante com **um só empregado de mesa**.

- Ele **não fica parado à espera** que a cozinha prepare o prato da mesa 1.
- Leva o pedido à cozinha, e enquanto o prato é preparado, vai atender a mesa 2, a mesa 3...
- Quando a cozinha avisa *"prato da mesa 1 pronto!"* (um **evento**), ele vai buscá-lo e entrega-o.
- Enquanto houver clientes no restaurante (**listeners registados**), ele continua a trabalhar. Quando o restaurante fecha e não há mais ninguém, vai para casa (**o programa termina**).

O empregado é o Node. O "só um empregado" é o facto de o Node ser **single-threaded**.

---

## Single-threaded: o que quer dizer

Uma **thread** é uma linha de execução do processador. O Node corre o teu código JavaScript **numa só thread**.

À primeira vista parece um problema: como é que um servidor com uma só thread aguenta milhares de requests ao mesmo tempo?

- O Node **nunca fica bloqueado à espera**. Regista o que tem de fazer e passa ao seguinte.
- Só executa código **quando acontece um evento**, e executa-o muito depressa. Por isso está quase sempre disponível.
- Por trás, nas tarefas pesadas (ler ficheiros, falar com a rede), o Node usa **multi-threading do sistema operativo**. Tu não vês isso, mas acontece.

> 💡 **Vais ver este padrão em todo o lado.** Por exemplo, mais à frente, ao guardar dados numa base de dados: envias o pedido e registas uma função para correr **quando estiver concluído**. É sempre *"quando X acontecer, faz Y"*.

---

## A experiência: `process.exit()`

Para provar que é o event loop que mantém o programa vivo, o professor força a saída:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  process.exit();   // termina o processo Node
});

server.listen(3000);
```

O que acontece:

1. `node app.js` → o terminal fica preso, como antes. O `process.exit()` está **dentro** da função, por isso ainda não correu.
2. Abres `localhost:3000` → chega um request, a função é executada.
3. O `console.log(req)` mostra o request no terminal e logo a seguir o `process.exit()` termina o programa.
4. O terminal volta a uma linha nova. O event loop acabou.

> ⚠️ **Num servidor real, nunca uses `process.exit()` assim.** Se o servidor termina, ninguém consegue aceder ao site. Isto serve só para perceber como funciona.

---

## ✅ A reter

- **Event loop:** o ciclo que mantém o Node a correr **enquanto houver listeners registados**.
- O `createServer` regista um listener que **nunca é removido**, por isso o servidor nunca termina sozinho.
- O Node é **single-threaded**, mas não fica parado à espera: só executa código quando há um evento.
- `process.exit()` força o fim do programa. Útil para perceber o event loop, **nunca** para usar num servidor.
- Próxima aula: trabalhar com o `req` e o `res`.

