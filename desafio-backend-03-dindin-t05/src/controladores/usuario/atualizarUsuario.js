const bcrypt = require("bcrypt");
const conexao = require("../../bancoDeDados/conexao");

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { usuario } = req;
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const atualizar = "update usuarios set nome = $1, email = $2, senha = $3  where id = $4";
        const atualizado = await conexao.query(atualizar, [nome, email, senhaCriptografada, usuario.id]);

        if (atualizado.rowCount === 0) {
            return res.status(400).json("Não foi possível atualizar os dados do usuário.");
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = atualizarUsuario;