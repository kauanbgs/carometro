const router = require("express").Router();
const docenteController = require("../controllers/docenteController");
const estudanteController = require("../controllers/estudanteController");
const ocorrenciaController = require("../controllers/ocorrenciaController");
const turmaController = require("../controllers/turmaController");


//      CONTROLLER DOCENTE (DOC & DEV)       //
router.post("/docente", docenteController.createDocente);
router.get("/docente", docenteController.readDocente);
router.get("/docente/:id_docente", docenteController.getDocenteById);
router.get("/docente/nome/:nome", docenteController.getDocenteByName);
router.put("/docente/", docenteController.updateDocente);
router.delete("/docente/:email", docenteController.deleteDocente);
router.post("/docente/login", docenteController.login);


//      CONTROLLER ESTUDANTE       //
router.post("/estudante", estudanteController.createEstudante);
router.get("/estudante", estudanteController.readEstudante);
router.get("/estudante/:id_estudante", estudanteController.getEstudanteByID);
router.get("/estudante/numero/:numero_aluno", estudanteController.getEstudanteByNumero);
router.get("/estudante/nome/:nome", estudanteController.getEstudanteByName);
router.get("/estudante/status/:status", estudanteController.getEstudanteBystatus);
router.put("/estudante/:id_estudante", estudanteController.updateEstudante);
router.delete("/estudante/:id_estudante", estudanteController.deleteEstudante);



//      CONTROLLER TURMA       //
router.post("/turma", turmaController.createTurma);
router.get("/turma", turmaController.readTurma);
router.get("/turma/id/:id_turma", turmaController.readTurmaByID)
router.get("/turma/:fk_id_docente", turmaController.GetTurmaByDocenteID);
router.get("/turma/nome/:nome", turmaController.GetTurmaByName); // GetByName
router.put("/turma/id/:id_turma", turmaController.updateTurma)
router.delete("/turma/:id_turma", turmaController.deleteTurma)

//      CONTROLLER OCORRÊNCIA       //
router.post("/ocorrencia", ocorrenciaController.createOcorrencia);
router.get("/ocorrencia", ocorrenciaController.readOcorrencias);
router.get("/ocorrencia/:fk_id_estudante", ocorrenciaController.getOcorrenciaByIdAluno);
router.put("/ocorrencia/:id_ocorrencia", ocorrenciaController.updateOcorrencia);
router.delete("/ocorrencia/:id_ocorrencia", ocorrenciaController.deleteOcorrencia)

module.exports = router;
