const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> Tarefa 1 - URL - / </title> </head>');
        res.write('<body><form action="/create-user" method="POST"><input name="username" type="text"><button type="submit">Create </button></form></body>');
        res.write('</html>')
        return res.end(); 
    };

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> Tarefa 1 - URL - /users </title> </head>');
        res.write('<body><ul><li> User 1</li> <li> User 2 </li> </ul></body>');
        res.write('</html>')
        return res.end(); 
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];                       // caixa vazia para os bocados

        req.on('data', (chunk) => {            // sempre que chega um bocado...
            body.push(chunk);                  // ...mete-o na caixa
        });

        return req.on('end', () => {           // quando chegaram todos:
            const parsedBody = Buffer.concat(body).toString();  // junta e transforma em texto: 'username=Luis'
            const username = parsedBody.split('=')[1];          // fica com o que está depois do '=': 'Luis'
            console.log(username);                              // mostra no terminal

            res.statusCode = 302;              // redireciona...
            res.setHeader('Location', '/');    // ...de volta para o formulário
            return res.end();
        });
    }
});

server.listen(3000);
