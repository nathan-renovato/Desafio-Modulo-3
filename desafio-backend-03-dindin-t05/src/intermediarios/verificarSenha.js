const verificarSenha = (req, res, next) => {
    const { senha } = req.body;

    if (!senha) {
        return res.status(400).json("O campo senha é obrigatório.");
    }

    next();
}

module.exports = verificarSenha;