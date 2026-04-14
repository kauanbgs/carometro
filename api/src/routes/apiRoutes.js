const router = require("express").Router();
const studentController = require("../controllers/studentController");
const instructorController = require("../controllers/instructorController");
const classController = require("../controllers/classController");
const occurrenceController = require("../controllers/occurrenceController");
const verifyJWT = require("../middlewares/verifyJWT")

//      CONTROLLER instructor (INST & DEV)       //
router.post("/instructor", instructorController.createInstructor);
router.post("/instructor/login", instructorController.login);
router.get("/instructor", verifyJWT, instructorController.readInstructors);
router.get("/instructor/:id_instructor", verifyJWT, instructorController.getInstructorById);
router.get("/instructor/name/:name", verifyJWT,instructorController.getInstructorByName);
router.put("/instructor/:id_instructor", verifyJWT,instructorController.updateInstructor);
router.delete("/instructor", verifyJWT,instructorController.deleteInstructor);

//      CONTROLLER student       //
router.post("/student", verifyJWT,studentController.createStudent);
router.get("/student", verifyJWT,studentController.readStudents);
router.get("/student/:id_student", verifyJWT, studentController.getStudentByID);
router.get("/student/number/:student_number", verifyJWT, studentController.getStudentByNumber);
router.get("/student/name/:name", verifyJWT, studentController.getStudentByName);
router.get("/student/status/:status", verifyJWT, studentController.getStudentsByStatus);
router.put("/student/:id_student", verifyJWT, studentController.updateStudent);
router.delete("/student/:id_student", verifyJWT, studentController.deleteStudent);
router.get("/student/class/:fk_id_class", verifyJWT, studentController.getStudentsByClass);

//      CONTROLLER class       //
router.post("/class", verifyJWT, classController.createClass);
router.get("/class", verifyJWT, classController.readClass);
router.get("/class/id/:id_class", verifyJWT, classController.readClassByID);
router.get("/class/instructor/:name",verifyJWT, classController.getClassByInstructorName);
router.get("/class/name/:name", verifyJWT,classController.GetClassByName);
router.get("/class/instructor", verifyJWT,classController.readClassInstructor);
router.get("/class/student", verifyJWT, classController.readStudentsClass);
router.put("/class/id/:id_class", verifyJWT, classController.updateClass);
router.delete("/class/:id_class", verifyJWT,classController.deleteClass);

//      CONTROLLER occurrence       //
router.post("/occurrence", verifyJWT, occurrenceController.createOccurrence);
router.get("/occurrence", verifyJWT, occurrenceController.readOccurrences);
router.get("/occurrence/:fk_id_student", verifyJWT, occurrenceController.getOccurrenceByStudentId);
router.put("/occurrence/:id_occurrence", verifyJWT, occurrenceController.updateOccurrence);
router.delete("/occurrence/:id_occurrence", verifyJWT, occurrenceController.deleteOccurrence);

module.exports = router;
