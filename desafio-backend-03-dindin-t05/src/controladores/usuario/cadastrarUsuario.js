const conexao = require("../../bancoDeDados/conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const inserir = "insert into usuarios (nome, email, senha) values ($1, $2, $3)";
        const usuarioCadastrado = await conexao.query(inserir, [nome, email, senhaCriptografada]);

        if (usuarioCadastrado.rowCount === 0) {
            return res.status(400).json("Não foi possível cadastrar o usuário.");
        }

        const consultar = "select * from usuarios where email = $1";
        const { rows } = await conexao.query(consultar, [email]);

        const { senha: senhaUsuario, ...dadosUsuario } = rows[0];

        return res.status(201).json(dadosUsuario);
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = cadastrarUsuario;