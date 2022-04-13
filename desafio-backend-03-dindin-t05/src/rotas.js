const express = require("express");

const cadastrarUsuario = require("./controladores/usuario/cadastrarUsuario");
const loginUsuario = require("./controladores/usuario/loginUsuario");
const detalharUsuario = require("./controladores/usuario/detalharUsuario");
const atualizarUsuario = require("./controladores/usuario/atualizarUsuario");
const listarCategorias = require("./controladores/transacao/listarCategorias");
const cadastrarTransacao = require("./controladores/transacao/cadastrarTransacao");
const editarTransacao = require("./controladores/transacao/editarTransacao");
const excluirTransacao = require("./controladores/transacao/excluirTransacao");
const obterExtrato = require("./controladores/transacao/obterExtrato");
const listarTransacoes = require("./controladores/transacao/listarTransacoes");
const detalharTransacao = require("./controladores/transacao/detalharTransacao");
const filtrarTransacoes = require("./controladores/transacao/filtrarTransacoes");


const verificarNome = require("./intermediarios/verificarNome");
const { verificarEmail, verificarDuplicidadeEmail } = require("./intermediarios/verificarEmail");
const verificarSenha = require("./intermediarios/verificarSenha");
const verificarLogin = require("./intermediarios/verificarLogin");
const verificarDescricao = require("./intermediarios/verificarDescricao");
const verificarValor = require("./intermediarios/verificarValor");
const verificarData = require("./intermediarios/verificarData");
const verificarCategoria = require("./intermediarios/verificarCategoria");
const verificarTipoTransacao = require("./intermediarios/verificarTipo");
const verificarIdTransacao = require("./intermediarios/verificarIdTransacao");

const rotas = express();

rotas.post("/usuario", verificarNome, verificarEmail, verificarDuplicidadeEmail, verificarSenha, cadastrarUsuario);
rotas.post("/login", verificarEmail, verificarSenha, loginUsuario);


rotas.use(verificarLogin);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", verificarNome, verificarEmail, verificarDuplicidadeEmail, verificarSenha, atualizarUsuario);
rotas.get("/categoria", listarCategorias);
rotas.get("/transacao", listarTransacoes);
rotas.get("/transacao/extrato", obterExtrato);
rotas.get("/transacao/:id", detalharTransacao);
rotas.post("/transacao", verificarDescricao, verificarValor, verificarData,
    verificarCategoria, verificarTipoTransacao, cadastrarTransacao);
rotas.put("/transacao/:id", verificarIdTransacao, verificarDescricao, verificarValor, verificarData,
    verificarCategoria, verificarTipoTransacao, editarTransacao);
rotas.delete("/transacao/:id", verificarIdTransacao, excluirTransacao);
rotas.get("/transacao", filtrarTransacoes);


module.exports = rotas;