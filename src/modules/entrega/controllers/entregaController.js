const entregaModel = require('../models/entregaModel.js');

const entregaController = {
    async criarEntrega(req, res) {
        try {
            const { remetente, destinatario, enderecoColeta, enderecoDestino, dataPrevistaEntrega, status } = req.body;
            if ( !remetente || !destinatario || !enderecoColeta || !enderecoDestino || !dataPrevistaEntrega || !status) {
                return res.status(400).json({ sucesso: 'alert', mensagem: 'Todos os campos são obrigatórios' });
            }

            const novaEntrega = await entregaModel.criar(remetente, destinatario, enderecoColeta, enderecoDestino, dataPrevistaEntrega, status);
            res.status(201).json({ sucesso: 'true', mensagem: 'Entrega criada com sucesso', entrega: novaEntrega });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao criar entrega', erro: error.message });
        }
    },

    async editarEntrega(req, res) {
        try {
            const id = req.params.id;
            const { remetente, destinatario, enderecoColeta, enderecoDestino, dataPrevistaEntrega, status } = req.body;
            if (!remetente || !destinatario || !enderecoColeta || !enderecoDestino || !dataPrevistaEntrega || !status) {
                return res.status(400).json({ sucesso: 'alert', mensagem: 'Todos os campos são obrigatórios' });
            }

            const entregaAtualizada = await entregaModel.editar(id, remetente, destinatario, enderecoColeta, enderecoDestino, dataPrevistaEntrega, status);
            if (!entregaAtualizada) {
                return res.status(404).json({ sucesso: 'false', mensagem: 'Entrega não encontrada' });
            }

            res.status(200).json({ sucesso: 'true', mensagem: 'Entrega atualizada com sucesso', entrega: entregaAtualizada });

        } catch (error) {
            res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao atualizar entrega', erro: error.message });
        }
    },

    async listarEntregas(req, res) {
        try {
            const entregas = await entregaModel.listar();
            if (entregas.length === 0) { 
                return res.status(404).json({ sucesso: 'alert', mensagem: 'Nenhuma entrega encontrada' });
            }

            res.status(200).json({ sucesso: 'true', mensagem: 'Entregas listadas com sucesso', entregas });

        } catch (error) {
            res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao listar entregas', erro: error.message });
        }
    },

    async buscarEntrega(req, res) {
        try {
            const id = req.params.id;
            const entrega = await entregaModel.buscarPorId(id);
            if (!entrega) {
                return res.status(404).json({ sucesso: 'alert', mensagem: 'Entrega não encontrada' });
            }

            res.status(200).json({ sucesso: 'true', mensagem: 'Entrega encontrada com sucesso', entrega });

        } catch (error) {
            res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao buscar entrega', erro: error.message });
        }
    },

    async excluirEntrega(req, res) {
        try {
            const id = req.params.id;
            const entrega = await entregaModel.excluirEntrega(id);
            if (!entrega) {
                return res.status(404).json({ sucesso: 'alert', mensagem: 'Entrega não encontrada' });
            }

            res.status(200).json({ sucesso: 'true', mensagem: 'Entrega excluída com sucesso', entrega });

        } catch (error) {
            res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao excluir entrega', erro: error.message });
        }
    },

    async excluirTodasEntregas(req, res) {
        try {
            const entregas = await entregaModel.excluirTodasEntregas();
            if (!entregas) {
                return res.status(404).json({ sucesso: 'alert', mensagem: 'Nenhuma entrega encontrada' });
            }

            res.status(200).json({ sucesso: 'true', mensagem: 'Todas as entregas foram excluídas', entregas });

        } catch (error) {
            res.status(500).json({ sucesso: 'false', mensagem: 'Erro ao excluir entregas', erro: error.message });
        }
    }
};

// Exportação no formato CommonJS
module.exports = entregaController;
