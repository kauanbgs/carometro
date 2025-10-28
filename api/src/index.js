const express = require('express');

class appcontroler {
    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }
    middlewares(){
        this.express.use(express.json());
    }   
    routes(){
        const apiRoutes = require('./routes/apiRoutes')
        this.express.use('/carometro',apiRoutes)
      }
      exceptionHandler(){
        this.express.use((err, req, res, next) => {
            console.log(err);
            res.status(err.status || 500).json({message: err.message || "Erro interno de servidor!"})
        })
      }
}
module.exports = new appcontroler().express;