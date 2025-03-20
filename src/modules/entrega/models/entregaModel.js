import { pool } from '../../../config/database.js';

class entregaModel {
    //Criar entrega no banco de dados
    static async criar(Id, Remetente, Destinatario, EnderecoColeta, EnderecoDestino, DataPrevistaEntrega, Status) {
        const dados = [Id, Remetente, Destinatario, EnderecoColeta, EnderecoDestino, DataPrevistaEntrega, Status];
        const consulta = `INSERT INTO entrega (Id, Remetente, Destinatario, EnderecoColeta, EnderecoDestino, DataPrevistaEntrega, Status) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const novaEntrega = await pool.query(consulta, dados);
        return novaEntrega.rows;
    }

    static async listar() {
        const consulta = `SELECT * FROM entrega`;
        const entregas = await pool.query(consulta);
        return entregas.rows;
    }

    static async buscarPorId(Id) {
        const consulta = `SELECT * FROM entrega WHERE Id = $1`;
        const entrega = await pool.query(consulta, [Id]);
        return entrega.rows;
    }
    static async excluirEntrega(Id) {
        const consulta = `DELETE FROM entrega WHERE Id = $1`;
        const entrega = await pool.query(consulta, [Id]);
        return entrega.rows;
    }
    static async excluirTodasEntregas() {
        const consulta = `DELETE FROM entrega`;
        const entregas = await pool.query(consulta);
        return entregas.rows;
    }
}

export default entregaModel;

