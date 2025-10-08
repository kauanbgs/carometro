const router = require("express").Router();
const docenteController = require('../controllers/docenteController');
const estudanteController = require('../controllers/estudanteController');
const turmaController = require('../controllers/turmaController');


router.get("/health", (req, res) => {
  res.send({ status: "OK", message: "API funcionando" });
});

router.post("/docente", docenteController.createDocente)
router.get("/docente", docenteController.readDocente)
router.get("/docente/:id_docente", docenteController.getDocenteById)
router.get("/docente/nome/:nome", docenteController.getDocenteByNome)
router.put("/docente/:id_docente", docenteController.updateDocente)
router.delete("/docente/:id_docente", docenteController.deleteDocente)

router.post("/turma", turmaController.createTurma)
router.get("/turma", turmaController.readTurma)
router.get("/turma/:id_turma", turmaController.getTurmaById)


router.post("/estudante", estudanteController.createEstudante);
router.get("/estudante", estudanteController.readEstudante);
router.put("/estudante", estudanteController.updateEstudante);
router.delete("/estudante/:id_estudante", estudanteController.deleteEstudante);

module.exports = router;