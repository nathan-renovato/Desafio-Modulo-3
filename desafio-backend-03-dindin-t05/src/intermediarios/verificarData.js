
const verificarData = (req, res, next) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({ "mensagem": "A data deve ser informada." });
    }

    next();
}

module.exports = verificarData;