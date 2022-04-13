const conexao = require("../bancoDeDados/conexao");

const verificarEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json("O campo email é obrigatório.");
    }

    next();
}

const verificarDuplicidadeEmail = async (req, res, next) => {
    const { email } = req.body;
    const consultaEmail = "select * from usuarios where email = $1";
    const { rowCount: quantidadeUsuarios } = await conexao.query(consultaEmail, [email]);

    if (quantidadeUsuarios > 0) {
        return res.status(400).json("O email informado já existe.");
    }

    next();
}


module.exports = {
    verificarEmail,
    verificarDuplicidadeEmail
};