const conexao = require("../../bancoDeDados/conexao");

const editarTransacao = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const atualizarDadosTransacao = "update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5  where id = $6";
        const atualizado = await conexao.query(atualizarDadosTransacao, [descricao, valor, data, categoria_id, tipo, id]);

        if (atualizado.rowCount === 0) {
            return res.status(400).json({ "mensagem": "Não foi possível atualizar os dados da transferência." });
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = editarTransacao;