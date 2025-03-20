import entregaModel from '../models/entregaModel';

class entregaController {
    static async criarEntrega(req, res) {
        try {
            const { Id, Remetente, Destinatario, EnderecoColeta, EnderecoDestino, DataPrevistaEntrega, Status } = req.body;
            if (!Id || !Remetente || !Destinatario || !EnderecoColeta || !EnderecoDestino || !DataPrevistaEntrega || !Status) {
                return res.status(400).json({ sucesso: 'alert', mensagem: 'Todos os campos são obrigatórios' });
            }

            res.status(201).json({ sucesso: 'true', mensagem: 'Entrega criada com sucesso', entrega: novaEntrega });
            const novaEntrega = await entregaModel.criar(Id, Remetente, Destinatario, EnderecoColeta, EnderecoDestino, DataPrevistaEntrega, Status);
            resposta.status(201).json({ sucesso: 'true', mensagem: 'Entrega criada com sucesso', entrega: novaEntrega });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao criar entrega', erro: error.message });
        }
    }
    static async editarEntrega(req, res) {
        try {
            const id = req.params.id; // usado para buscar a entrega
            const { Remetente, Destinatario, EnderecoColeta, EnderecoDestino, DataPrevistaEntrega, Status } = req.body; // usado para atualizar a entrega pelo corpo da requisição
            if (!Remetente || !Destinatario || !EnderecoColeta || !EnderecoDestino || !DataPrevistaEntrega || !Status) { // verifica se todos os campos foram preenchidos
                return res.status(400).json({ sucesso: 'alert', mensagem: 'Todos os campos são obrigatórios' });
            }
            const entregaAtualizada = await entregaModel.editar(id, Remetente, Destinatario, EnderecoColeta, EnderecoDestino, DataPrevistaEntrega, Status); // atualiza a entrega no banco de dados
            if (!entregaAtualizada) { // verifica se a entrega foi atualizada
                res.status(200).json({ sucesso: 'true', mensagem: 'Entrega atualizada com sucesso', entrega: entregaAtualizada });
            }
        } catch (error) {
            res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao atualizar entrega', erro: error.message });
        }
        }
        static async listarEntregas(req, res) {
        try {
            const entregas = await entregaModel.listar(); // busca todas as entregas no banco de dados
            if(entregas.lenght === 0){ // verifica se existem entregas
                return res.status(400).json({ sucesso: 'alert', mensagem: 'Nenhuma entrega encontrada' });
            }
            res.status(200).json({ sucesso: 'true', mensagem: 'Entregas listadas com sucesso', entregas: entregas });
        } catch (error) {
            res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao listar entregas', erro: error.message });
        }
    }   
        static async buscarEntrega(req, res) {
            try {
                const id = req.params.id; // usado para buscar a entrega
                const entrega = await entregaModel.buscarPorId(id); // busca a entrega no banco de dados
                if (!entrega) { // verifica se a entrega foi encontrada
                    return res.status(400).json({ sucesso: 'alert', mensagem: 'Entrega não encontrada' });
                }
                res.status(200).json({ sucesso: 'true', mensagem: 'Entrega encontrada com sucesso', entrega: entrega });
            } catch (error) {
                res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao buscar entrega', erro: error.message });
            }
        }
        static async excluirEntrega(req, res) {
            try {
                const id = req.params.id; // usado para buscar a entrega
                const entrega = await entregaModel.excluirEntrega(id); // exclui a entrega no banco de dados
                if (!entrega) { // verifica se a entrega foi excluída
                    return res.status(400).json({ sucesso: 'alert', mensagem: 'Entrega não encontrada' });
                }
                res.status(200).json({ sucesso: 'true', mensagem: 'Entrega excluída com sucesso', entrega: entrega });
            } catch (error) {
                res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao excluir entrega', erro: error.message });
            }
        }
        static async excluirTodasEntregas(req, res) {
            try {
                const entregas = await entregaModel.excluirTodasEntregas(); // exclui todas as entregas no banco de dados
                if (!entregas) { // verifica se as entregas foram excluídas
                    return res.status(400).json({ sucesso: 'alert', mensagem: 'Nenhuma entrega encontrada' });
                }
                res.status(200).json({ sucesso: 'true', mensagem: 'Entregas excluídas com sucesso', entregas: entregas });
            } catch (error) {
                res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao excluir entregas', erro: error.message });
            }
        }
    }
    
    module.exports = entregaController; // exporta o controller de entrega