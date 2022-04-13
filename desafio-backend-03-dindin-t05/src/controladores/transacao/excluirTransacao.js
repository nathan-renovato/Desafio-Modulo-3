const conexao = require("../../bancoDeDados/conexao");

const excluirTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const consultaIdTransacao = "delete from transacoes where id = $1";
        const excluir = await conexao.query(consultaIdTransacao, [id]);

        if (excluir.rowCount === 0) {
            return res.status(400).json({ "mensagem": "Não foi possível excluir a transação." });
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = excluirTransacao;