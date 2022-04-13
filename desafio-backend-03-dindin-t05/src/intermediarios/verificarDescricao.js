

const verificarDescricao = (req, res, next) => {
    const { descricao } = req.body;

    if (!descricao) {
        return res.status(400).json({ "mensagem": "A descricao deve ser informada." });
    }


    next();
}

module.exports = verificarDescricao;