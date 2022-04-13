const conexao = require("../../bancoDeDados/conexao");

const detalharTransacao = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req;

    try {
        const consultaTransacoes = "select * from transacoes where usuario_id = $1";
        const transacoes = await conexao.query(consultaTransacoes, [usuario.id]);

        const array = transacoes.rows;

        const transacaoEncontrada = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                transacaoEncontrada.push(array[i]);
            }
        };

        if (transacaoEncontrada.length === 0) {
            return res.status(404).json({ "mensagem": "Transação não encontrada." });
        }

        return res.status(200).json(transacaoEncontrada[0]);

    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = detalharTransacao;