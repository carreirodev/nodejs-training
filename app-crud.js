// incluindo biblioteca
const http = require("http");
const url = require("url");
const queryString = require("query-string");
const fs = require("fs");

// definicao de endereço e url
const hostname = "127.0.0.1";
const port = 3000;

// implementacao da regra de negocio
const server = http.createServer((req, res) => {
	var resposta;
	const urlparse = url.parse(req.url, true);

	// receber informacoes do usuario
	const param = queryString.parse(urlparse.search);

	// criar um usuario e atualizar usuario
	if (urlparse.pathname == "/criar-atualizar") {
		// salvar as informaçoes
		fs.writeFile(`./users/${param.id}.txt`, JSON.stringify(param), function (err) {
			if (err) throw err;
			console.log("Saved!");
			resposta = "Usuario criado/atualizado com Sucesso!";

			res.statusCode = 200;
			res.setHeader("Content-Type", "text/plain");
			res.end(resposta);
		});

		// selecionar um usuario
	} else if (urlparse.pathname == "/selecionar") {
		fs.readFile(`./users/${param.id}.txt`, function (err, data) {
			resposta = data;

			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.end(resposta);
		});
	}

	// remover um usuario
	else if (urlparse.pathname == "/remover") {
		fs.unlink(`./users/${param.id}.txt`, function (err) {
			resposta = err ? "usuario nao encontrado" : "user deleted";

			res.statusCode = 200;
			res.setHeader("Content-Type", "text/plain");
			res.end(resposta);
		});
	}
});

// execucao do server
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// http://localhost:3000/criar-atualizar?nome=gi&idade=41&id=3
// http://localhost:3000/criar-atualizar?nome=edu&idade=45&id=4
// http://localhost:3000/criar-atualizar?nome=bella&idade=9&id=1
// http://localhost:3000/criar-atualizar?nome=dudu&idade=9&id=2
// http://localhost:3000/selecionar?id=3
// http://localhost:3000/remover?id=3
