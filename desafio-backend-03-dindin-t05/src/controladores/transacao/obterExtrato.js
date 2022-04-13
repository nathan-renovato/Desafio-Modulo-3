const conexao = require("../../bancoDeDados/conexao");

const obterExtrato = async (req, res) => {
    const { usuario } = req;

    try {
        const consultaIdUsuario = "select * from transacoes where usuario_id = $1";
        const { rowCount: transacoes, rows } = await conexao.query(consultaIdUsuario, [usuario.id]);

        if (transacoes === 0) {
            return res.status(404).json({ "mensagem": "Não existe transações para o id informado." });
        }

        const consultaTransacoes = "select sum(valor) from transacoes where usuario_id = $1 and tipo = $2";
        const somaEntrada = await conexao.query(consultaTransacoes, [usuario.id, "entrada"]);
        const somaSaida = await conexao.query(consultaTransacoes, [usuario.id, "saida"]);

        return res.status(200).json({
            "entrada": (!somaEntrada.rows[0].sum ? "0" : somaEntrada.rows[0].sum),
            "saida": (!somaSaida.rows[0].sum ? "0" : somaSaida.rows[0].sum)
        });
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = obterExtrato;