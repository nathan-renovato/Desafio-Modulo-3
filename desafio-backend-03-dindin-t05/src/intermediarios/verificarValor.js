const verificarValor = (req, res, next) => {
    const { valor } = req.body;

    if (!valor) {
        return res.status(400).json({ "mensagem": "O valor deve ser informado." });
    }


    next();
}

module.exports = verificarValor;