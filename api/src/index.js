const express = require("express");
const cors = require("cors");
// const testConnect = require("./db/testConnect");

class appcontroler {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
    // testConnect();
  }
  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: true })); // Necessário para receber dados de formulários HTML
  }
  routes() {
    const apiRoutes = require("./routes/apiRoutes");
    this.express.use("/carometro", apiRoutes);
  }
  exceptionHandler() {
    this.express.use((err, req, res, next) => {
      console.log(err);
      res
        .status(err.status || 500)
        .json({ message: err.message || "Erro interno de servidor!" });
    });
  }
}
module.exports = new appcontroler().express;
