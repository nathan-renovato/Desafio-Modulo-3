const conexao = require("../../bancoDeDados/conexao");

const listarCategorias = async (req, res) => {
    const { usuario } = req;
    try {
        const consultaCategoria = "select categoria_id from transacoes where usuario_id = $1";
        const categoriaId = await conexao.query(consultaCategoria, [usuario.id]);

        if (categoriaId.rowCount === 0) {
            return res.status(200).json([]);
        }

        const resultado = [];
        for (let i = 0; i < categoriaId.rows.length; i++) {
            const consultaDescricao = "select id, descricao from categorias where id = $1";
            const descricao = await conexao.query(consultaDescricao, [categoriaId.rows[i].categoria_id]);
            resultado.push(descricao.rows[0]);
        };

        resultado.sort((a, b) => {
            return a.id - b.id;
        });

        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro desconhecido " + error.message });
    }
}

module.exports = listarCategorias;