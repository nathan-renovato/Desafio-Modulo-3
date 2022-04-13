const conexao = require("../../bancoDeDados/conexao");
const bcrypt = require("bcrypt");
const segredo = require("../../segredo");
const jwt = require("jsonwebtoken");

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const verificarEmail = "select * from usuarios where email = $1";
        const { rows, rowCount } = await conexao.query(verificarEmail, [email]);

        if (rowCount === 0) {
            return res.status(404).json("Usuário não encontrado.")
        }

        const usuario = rows[0];

        const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

        if (!senhaVerificada) {
            return res.status(400).json("Usuário e/ou senha inválido(s).");
        }

        const token = jwt.sign({ id: usuario.id }, segredo, { expiresIn: "2h" });

        const { senha: senhaUsuario, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        })
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = loginUsuario;