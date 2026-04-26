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
router.get("/instructor/name/:name", instructorController.getInstructorByName);
router.put("/instructor/:id_instructor", verifyJWT,instructorController.updateInstructor);
router.delete("/instructor", verifyJWT,instructorController.deleteInstructor);

//      CONTROLLER student       //
router.post("/student", verifyJWT,studentController.createStudent);
router.get("/student", verifyJWT,studentController.readStudents);
router.get("/student/id/:id_student", verifyJWT, studentController.getStudentByID);
router.get("/student/number/:student_number", verifyJWT, studentController.getStudentByNumber);
router.get("/student/name/:name", verifyJWT, studentController.getStudentByName);
router.get("/student/status/:status", verifyJWT, studentController.getStudentsByStatus);
router.put("/student/:id_student", verifyJWT, studentController.updateStudent);
router.delete("/student/:id_student", verifyJWT, studentController.deleteStudent);
router.get("/student/class/:fk_id_class",  studentController.getStudentsByClass);

//      CONTROLLER class       //
router.post("/class", classController.createClass);
router.get("/class", classController.readClass);
router.get("/class/:id_class", classController.readClassByID);
router.get("/class/instructor/:name", classController.getClassByInstructorName);
router.get("/class/name/:name", classController.GetClassByName);
router.get("/class/instructors", classController.readClassInstructor);
router.get("/class/student", classController.readStudentsClass);
router.put("/class/:id_class", classController.updateClass);
router.delete("/class/:id_class", classController.deleteClass);

//      CONTROLLER occurrence       //
router.post("/occurrence", occurrenceController.createOccurrence);
router.get("/occurrence", occurrenceController.readOccurrences);
router.get("/occurrence/:fk_id_student",occurrenceController.getOccurrenceByStudentId
);
router.get("/occurrence/id/:id_occurrence", occurrenceController.getOccurrenceById);
router.put("/occurrence/:id_occurrence", occurrenceController.updateOccurrence);
router.delete("/occurrence/:id_occurrence",occurrenceController.deleteOccurrence);

module.exports = router;
