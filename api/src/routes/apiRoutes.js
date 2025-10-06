const router = require("express").Router();
const docenteController = require('../controllers/docenteController');
const estudanteController = require('../controllers/estudanteController');


router.get("/health", (req, res) => {
  res.send({ status: "OK", message: "API funcionando" });
});

router.post("/docente", docenteController.createDocente)
router.get("/docente", docenteController.readDocente)
router.put("/docente", docenteController.updateDocente)
router.delete("/docente/:id_docente", docenteController.deleteDocente)

router.post("/estudante", estudanteController.createEstudante);
router.get("/eestudantestudante", estudanteController.readEstudante);
router.put("/estudante", estudanteController.updateEstudante);
router.delete("/estudante/:id_estudante", estudanteController.deleteEstudante);

module.exports = router;