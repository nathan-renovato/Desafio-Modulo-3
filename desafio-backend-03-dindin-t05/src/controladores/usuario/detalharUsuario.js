const detalharUsuario = async (req, res) => {
    const { usuario } = req;

    try {
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = detalharUsuario;