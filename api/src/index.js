const express = require('express');// Importa o módulo Express 

class appcontroler {
    constructor(){
        this.express = express(); // Cria uma instância do Express dentro da classe
        this.middlewares();//Chama o método middlewares para configurar os middlewares
        this.routes();

    }
    middlewares(){
        // Permite que a plicação receeba dados em formato JSON nas requisições
        this.express.use(express.json());
    }   
    // Nos definimos as nossas ROTAS
    routes(){
        const apiRoutes = require('./routes/apiRoutes')
        this.express.use('/carometro',apiRoutes)
            
      }// Final Routes
}
// Exporta a intância do Express já configurada acima, tornando-a acessível em outros arquivos
module.exports = new appcontroler().express;