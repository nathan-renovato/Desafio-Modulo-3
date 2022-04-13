
const verificarTipoTransacao = (req, res, next) => {
    const { tipo } = req.body;

    if (!tipo) {
        return res.status(400).json({ "mensagem": "O tipo deve ser informado." });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({ "mensagem": "O tipo deve ser infomado como 'entrada' ou 'saida'." });
    }

    next();
}

module.exports = verificarTipoTransacao;