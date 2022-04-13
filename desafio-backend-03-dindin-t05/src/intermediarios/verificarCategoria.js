const conexao = require("../bancoDeDados/conexao");

const verificarCategoria = async (req, res, next) => {
    const { categoria_id } = req.body;

    if (!categoria_id) {
        return res.status(400).json({ "mensagem": "A categoria deve ser informada." });
    }

    const consultaCategoriaId = "select * from categorias where id = $1";
    const { rowCount } = await conexao.query(consultaCategoriaId, [categoria_id]);

    if (rowCount === 0) {
        return res.status(404).json("Informe uma categoria válida.");
    }


    next();
}

module.exports = verificarCategoria;