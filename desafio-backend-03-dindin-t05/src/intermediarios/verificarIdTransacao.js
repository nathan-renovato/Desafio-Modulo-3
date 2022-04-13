const conexao = require("../bancoDeDados/conexao");

const verificarIdTransacao = async (req, res, next) => {
    const { id } = req.params;
    const { usuario } = req;

    const consultaIdTransacao = "select * from transacoes where id = $1";
    const { rowCount } = await conexao.query(consultaIdTransacao, [id]);

    if (rowCount === 0) {
        return res.status(400).json({ "mensagem": "Informe um ID de transação válido." });
    }

    const consultaIdUsuario = "select * from transacoes where usuario_id = $1";
    const { rowCount: transacoes, rows } = await conexao.query(consultaIdUsuario, [usuario.id]);

    if (transacoes === 0) {
        return res.status(404).json({ "mensagem": "Não existe transações para o id informado." });
    }

    next();
}

module.exports = verificarIdTransacao;