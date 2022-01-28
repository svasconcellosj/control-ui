/*
  Simples servidor Node para testar o build da aplicação fora do VSCode

  para executar no terminal:   node server.js

  para gerar o build da aplicação:   ng build --configuration=production
*/
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/control-ui') );

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/control-ui/index.html');
});

app.listen(4200);
