const pool = require ('../../../config/database');

function listarLivros() {
  try {
    const query = 'SELECT * FROM livros';
    const { rows } = await pool.query
    (query);
} catch (error) {
    console.error('Erro ao buscar livros!', error);    
  }
}