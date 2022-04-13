const jwt = require("jsonwebtoken");
const segredo = require("../segredo");
const conexao = require("../bancoDeDados/conexao");

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json("Para acessar este recurso um token de autenticação válido deve ser enviado.");
    }

    try {
        const token = authorization.replace("Bearer", "").trim();

        const { id } = jwt.verify(token, segredo);

        const consulta = "select * from usuarios where id = $1";
        const { rows, rowCount } = await conexao.query(consulta, [id]);

        if (rowCount === 0) {
            return res.status(404).json("O usuário não foi encontrado.");
        }

        const { senha, ...usuario } = rows[0];

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = verificarLogin;