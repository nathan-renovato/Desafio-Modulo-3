const conexao = require("../../bancoDeDados/conexao");

const cadastrarTransacao = async (req, res) => {
    const { usuario } = req;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const inserirTransacao = "insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) values ($1, $2, $3, $4, $5, $6)";
        const transacaoCadastrada = await conexao.query(inserirTransacao, [descricao, valor, data, categoria_id, usuario.id, tipo]);

        if (transacaoCadastrada.rowCount === 0) {
            return res.status(400).json({ "mensagem": "Não foi possível cadastrar a transação." });
        }

        return res.status(201).json({ "mensagem": "transação cadastrada" });
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = cadastrarTransacao;