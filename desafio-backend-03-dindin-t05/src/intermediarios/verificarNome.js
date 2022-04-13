const verificarNome = (req, res, next) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json("O campo nome é obrigatório.");
    }

    next();
}

module.exports = verificarNome;

