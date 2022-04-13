const conexao = require("../../bancoDeDados/conexao");

const listarCategorias = async (req, res) => {
    const { usuario } = req;
    try {
        const consultaTransacoes = "select * from transacoes where usuario_id = $1";
        const transacoes = await conexao.query(consultaTransacoes, [usuario.id]);

        if (transacoes.rowCount === 0) {
            return res.status(200).json([]);
        }

        transacoes.rows.sort((a, b) => {
            return a.id - b.id;
        });

        return res.status(200).json(transacoes.rows);
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = listarCategorias;