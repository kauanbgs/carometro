const connect = require("./connect");

module.exports = function testConnect(){
    // Tenta conectar com o banco
    try {
        const query = `SELECT 'Conexao bem-sucedida' AS Mensagem`; // Seleciona uma mensagem de sucesso :)
        connect.query(query, function(err){
            if(err){
                console.log("Conexão não realizada " + err)
                return;
            }
            console.log("Conexão realizada com MySQL")
        })
    } catch (error) {
        console.error("Erro ao executar a consulta SQL:" , error)
    }
}
