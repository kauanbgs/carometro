const connect = require('../../knexfile');

module.exports = async function testConnect() {
    try {
        const result = await connect.raw("SELECT 'Conexao bem-sucedida' AS Mensagem");
        
        //result[0] é a primeira linha e result[0][0] é a primeira coluna dessa linha
        console.log(result[0][0].Mensagem);

    } catch (error) {
        console.error("Erro ao executar a consulta SQL:", error);
    }
};