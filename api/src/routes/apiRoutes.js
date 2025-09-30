const router = require("express").Router();
const docenteController = require('../controllers/docenteController');


router.get("/health", (req, res) => {
  res.send({ status: "OK", message: "API funcionando" });
});

router.post("/docente", docenteController.createDocente)
router.get("/docente", docenteController.readDocente)
// router.put("/docente", docenteController.updateDocente)
// router.delete("/docente/:id_docente", docenteController.deleteDocente)

module.exports = router;