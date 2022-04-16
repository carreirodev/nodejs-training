// incluindo biblioteca
const http = require("http");
const url = require("url");
const queryString = require("query-string");

// definicao de endereço e url
const hostname = "127.0.0.1";
const port = 3000;

// implementacao da regra de negocio
const server = http.createServer((req, res) => {
	//pegar pergunta na url
	const param = queryString.parse(url.parse(req.url, true).search);
	// console.log(param);

	// verificar pergunta e escolher resposta
	let resposta;
	if (param.pergunta == "melhor-filme") {
		resposta = "star wars";
	} else if (param.pergunta == "melhor-tech") {
		resposta = "nodejs";
	} else {
		resposta = "nao sei";
	}

	// retornar a resposta escolhida

	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end(resposta);
});

// execucao do server
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
