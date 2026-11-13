# 42. Understanding NPM Scripts
 
**Secção 4 — Improved Development Workflow and Debugging**
 
> **Em resumo:** o **npm** cria o ficheiro **`package.json`**, onde podes guardar **scripts**: atalhos para comandos. Com um script `start`, passas a arrancar o servidor com `npm start` em vez de `node app.js`.
 
---
 
## O que é o npm
 
**npm** = *Node Package Manager*, o gestor de pacotes do Node. **Já vem instalado com o Node**, não precisas de fazer nada.
 
Serve para duas coisas:
 
1. **Configurar o projeto**, através do ficheiro `package.json`. É o tema desta aula.
2. **Instalar pacotes de outras pessoas** (*third-party*), como o Express. Vem nas próximas aulas.
---
 
## Passo 1: `npm init`
 
No terminal, **dentro da pasta do projeto**:
 
```bash
npm init
```
 
O npm faz-te algumas perguntas. O que está entre parênteses é a resposta por defeito: se carregares só em Enter, fica essa.
 
| Pergunta | O que pôr |
|---|---|
| `package name` | O nome do projeto (Enter aceita o nome da pasta) |
| `description` | Uma frase, por exemplo `Complete Node.js Guide` |
| `entry point` | O ficheiro principal: `app.js` |
| `test command`, `git repository`, `keywords` | Podes deixar vazio |
| `author` | O teu nome (opcional) |
| `license` | Enter |
 
> 💡 **Atalho:** `npm init -y` responde a tudo com o valor por defeito. Depois podes editar o `package.json` à mão.
 
> 💡 O `npm init` **não apaga nem altera o teu código**. Só cria um ficheiro novo.
 
---
 
## Passo 2: o `package.json`
 
O `npm init` cria este ficheiro, mais ou menos assim:
 
```json
{
  "name": "nodejs-complete-guide",
  "version": "1.0.0",
  "description": "Complete Node.js Guide",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
 
É a **ficha de identificação do projeto**: nome, versão, ficheiro principal e, mais à frente, a lista dos pacotes que o projeto usa.
 
Está em formato **JSON**, que é parecido com um objeto JavaScript, mas mais rígido:
 
- **Os nomes (chaves) levam sempre aspas duplas**: `"name"`, não `name`.
- **Os textos também levam aspas duplas**: `"app.js"`. Aspas simples dão erro.
- Números, `true`, `false` e listas não levam aspas.
- **Entre cada par há uma vírgula**, mas **não depois do último**.
---
 
## Passo 3: acrescentar o script `start`
 
Na secção `"scripts"`, acrescenta uma vírgula a seguir ao `"test"` e uma linha nova:
 
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node app.js"
}
```
 
- À esquerda está o **nome** do script: `"start"`.
- À direita está o **comando** que corre: `"node app.js"`.
Agora arrancas o servidor com:
 
```bash
npm start
```
 
Faz exatamente o mesmo que `node app.js`. Paras com **Ctrl + C**, como sempre.
 
---
 
## Scripts com nome à tua escolha
 
Podes criar quantos scripts quiseres, com qualquer nome **sem espaços**:
 
```json
"scripts": {
  "start": "node app.js",
  "start-server": "node app.js"
}
```
 
Mas atenção à forma de os correr:
 
| Script | Como se corre |
|---|---|
| `start` (nome especial) | `npm start` |
| Qualquer outro nome | `npm run nome-do-script`, por exemplo `npm run start-server` |
 
Se escreveres `npm start-server` sem o `run`, dá erro: *"Unknown command"*. Só alguns nomes especiais, como o `start`, dispensam o `run`.
 
---
 
## Para que serve, se poupa poucas letras?
 
- **Convenção:** quem pega num projeto Node sabe que corre `npm start`. Não tem de adivinhar qual é o ficheiro principal.
- **Comandos longos:** mais à frente, os scripts vão ter comandos maiores, como o `nodemon` na próxima aula. Escreves-los uma vez e a seguir é só `npm start`.
---
 
## ✅ A reter
 
- **npm** = gestor de pacotes do Node. Já vem instalado.
- **`npm init`** cria o **`package.json`**, a ficha do projeto.
- **JSON:** aspas **duplas** nas chaves e nos textos, vírgulas entre pares, mas não no fim.
- **Scripts** = atalhos para comandos, na secção `"scripts"`.
- `start` corre com **`npm start`**. Os outros nomes correm com **`npm run nome`**.
---
 
## 🔗 Ligação ao Nexus
 
O Nexus tem um `package.json` com vários scripts. É por isso que lá corres comandos como **`npm run dev`** (arrancar em modo de desenvolvimento) ou **`npm run build`** (preparar a versão final), em vez de comandos longos. Agora já sabes onde estão definidos: abre o `package.json` e procura a secção `"scripts"`.
 