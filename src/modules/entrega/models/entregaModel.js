const { pool } = require('../../../config/database.js');

class entregaModel {
    // Criar entrega no banco de dados
    static async criar(remetente, destinatario, enderecoColeta, enderecoDestino, dataPrevistaEntrega, status) {
        try {
            const dados = [remetente, destinatario, enderecoColeta, enderecoDestino, dataPrevistaEntrega, status];
            const consulta = `INSERT INTO entregas (remetente, destinatario, endereco_coleta, endereco_destino, data_prevista_entrega, status) VALUES ($1, $2, $3, $4, $5, $6)`;
            const novaEntrega = await pool.query(consulta, dados);
            return novaEntrega.rows;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async editar(id, remetente, destinatario, enderecoColeta, enderecoDestino, dataPrevistaEntrega, status) {
        try {
            const dados = [id,remetente, destinatario, enderecoColeta, enderecoDestino, dataPrevistaEntrega, status];
            const consulta = `UPDATE entregas SET remetente = $2, destinatario = $3, endereco_coleta = $4, endereco_destino = $5, data_prevista_entrega = $6, status = $7 WHERE id = $1 returning *`;
            const entregaAtualizada = await pool.query(consulta, dados);
            return entregaAtualizada.rows;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async listar() {
            const consulta = `SELECT * FROM entregas`;
            const entregas = await pool.query(consulta);
            return entregas.rows;
    }

    static async buscarPorId(Id) {
        try {
            const consulta = `SELECT * FROM entregas WHERE id = $1`;
            const entrega = await pool.query(consulta, [Id]);
            return entrega.rows;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async excluirEntrega(Id) {
        try {
            const consulta = `DELETE FROM entregas WHERE id = $1`;
            const entrega = await pool.query(consulta, [Id]);
            return entrega.rows;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async excluirTodasEntregas() {
        try {
            const consulta = `DELETE FROM entregas`;
            const entregas = await pool.query(consulta);
            return entregas.rows;
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = entregaModel;
