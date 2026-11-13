# 26. Creating a Node Server

**Secção 3 — Understanding the Basics**

> **Em resumo:** importas a ferramenta, crias o servidor com as instruções e abres a porta.

---

## O código completo

```javascript
// app.js
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(3000);
```

Para correr, no terminal e dentro da pasta do projeto:

```bash
node app.js
```

Depois abre **http://localhost:3000** no navegador e olha para o terminal.

---

## A analogia: a receção de um hotel 🏨

Montar um servidor é como montar a receção de um hotel:

1. Vais buscar o **material** para montar a receção → `require('http')`
2. Montas a receção e deixas **instruções** sobre o que fazer quando chega alguém → `createServer(...)`
3. **Abres a porta** do hotel e ficas à espera de clientes → `listen(3000)`

---

## Core modules: as ferramentas que já vêm com o Node 🧰

Em JavaScript, só um punhado de funções e objetos está disponível **globalmente**, ou seja, em qualquer ficheiro, sem importar nada. Quase tudo o resto tem de ser importado. Há duas razões para isto:

- **Não encher o espaço global** com centenas de nomes que talvez nunca uses.
- **Deixar claro, em cada ficheiro, de que é que ele depende.** Basta olhar para os `require` no topo.

Os **core modules** são os módulos que vêm instalados com o Node. Não precisas de instalar nada, só de os importar. Alguns dos mais usados:

| Módulo | Para que serve |
|---|---|
| `fs` | Trabalhar com ficheiros: ler, escrever, apagar (*file system*) |
| `path` | Construir caminhos de ficheiros que funcionam em Windows, Mac e Linux, que escrevem os caminhos de forma diferente |
| `os` | Obter informações sobre o sistema operativo |
| `http` | Criar um servidor e lidar com `requests` e `responses`. Também serve para **enviar** `requests` a outros servidores |
| `https` | O mesmo que o `http`, mas com SSL, ou seja, com os dados encriptados (fica para o fim do curso) |

> 💡 **Enviar `requests` a outros servidores?** Sim, um servidor Node também pode fazer pedidos. Por exemplo, enviar coordenadas à API do Google Maps e receber de volta uma morada. Ou seja, vários servidores podem falar entre si.

> 💡 **E os módulos que não vêm com o Node?** Chamam-se **third-party modules** (módulos de terceiros). Instalam-se à parte e vais aprender a fazê-lo mais à frente no curso. Por agora, só core modules.

---

## Linha a linha

### 1. `const http = require('http');`

O Node traz várias "caixas de ferramentas", chamadas **módulos**. Não vêm abertas por defeito: tens de pedir a que precisas.

`require('http')` é dizer *"dá-me a caixa de ferramentas para trabalhar com a web"*. Guardas essa caixa numa variável chamada `http`, para a usares a seguir.

> 💡 **`'http'` ou `'./http'`?**
> - `require('http')` (sem `./`) → vai buscar um **módulo do Node**.
> - `require('./http')` (com `./`) → vai buscar um **ficheiro teu**, chamado `http.js`, na mesma pasta.

> 💡 **Porquê `const`?** Porque a caixa de ferramentas nunca vai ser trocada por outra. `const` deixa isso claro.

---

### 2. `http.createServer((req, res) => { ... })`

Da caixa de ferramentas tiras uma ferramenta: `createServer`, que cria o servidor (a receção).

Mas uma receção precisa de **instruções**: *o que faço quando chega alguém?* Essas instruções são a função que lhe passas:

```javascript
(req, res) => {
  console.log(req);
}
```

Sempre que chega um pedido, o Node **executa esta função** e entrega-te duas coisas:

| | O que é | Na analogia |
|---|---|---|
| `req` (request) | Toda a informação sobre o pedido que chegou | O cliente que entrou, com tudo o que se sabe dele |
| `res` (response) | O objeto que usas para responder | O balcão onde preparas a resposta para lhe dar |

Por agora a instrução é só `console.log(req)`, ou seja, *"escreve no terminal tudo sobre quem chegou"*.

> ⚠️ Ainda **não respondemos** nada ao cliente, por isso o navegador fica à espera, a carregar. Isso fica para as próximas aulas.

---

### 3. `const server = ...`

O `createServer` devolve-te a receção já montada. Guardas numa variável `server` para lhe poderes dar ordens a seguir.

---

### 4. `server.listen(3000);`

A receção existe, mas a porta do hotel ainda está fechada. `listen(3000)` **abre a porta 3000** e fica à espera de clientes.

É por isso que o terminal fica "preso" depois de correres `node app.js`: o servidor está ligado, à escuta. Não é um erro.

> 🛑 Para desligar o servidor: **`Ctrl + C`** no terminal.

> 💡 **Porquê 3000?** No teu computador usa-se uma porta qualquer livre, e a 3000 é a mais comum. Quando a aplicação estiver online, usa normalmente a porta 80.

---

## O que acontece quando abres `localhost:3000`

1. O navegador bate à porta **3000** do teu computador (`localhost` = o teu próprio computador).
2. O servidor recebe o pedido e **executa a função**.
3. O `console.log(req)` despeja no terminal aquele monte de texto, que é toda a informação do pedido.

---

## Três formas de escrever a mesma função

O professor mostra três maneiras. **Fazem exatamente o mesmo**:

```javascript
// 1. Função com nome, passada pelo nome (SEM parênteses!)
function rqListener(req, res) {
  console.log(req);
}
http.createServer(rqListener);

// 2. Função anónima (sem nome)
http.createServer(function (req, res) {
  console.log(req);
});

// 3. Função seta (arrow function) — a mais usada hoje em dia
http.createServer((req, res) => {
  console.log(req);
});
```

> 💡 **Porque é que na forma 1 não se escreve `rqListener()`?**
> Com parênteses, a função era executada **logo ali**, uma vez. Sem parênteses, estás só a **entregá-la** ao Node, para ele a executar mais tarde, a cada pedido.

---

## ✅ A reter

- **Importar → criar → abrir a porta.** É sempre esta a base de um servidor Node.
- A função dentro do `createServer` corre **uma vez por cada pedido** que chega.
- Isto é a **arquitetura orientada a eventos** do Node: *"quando X acontecer, faz Y"*. Aqui: *quando chegar um pedido, executa esta função*.
- Próximas aulas: perceber o que vem dentro do `req` e **responder** com o `res`.
