const router = require("express").Router();
const studentController = require("../controllers/studentController");
const instructorController = require("../controllers/instructorController");
const classController = require("../controllers/classController");
const occurrenceController = require("../controllers/occurrenceController");

//      CONTROLLER instructor (INST & DEV)       //
router.post("/instructor", instructorController.createInstructor);
router.get("/instructor", instructorController.readInstructors);
router.get("/instructor/:id_instructor", instructorController.getInstructorById);
router.get("/instructor/name/:name", instructorController.getInstructorByName);
router.put("/instructor/", instructorController.updateInstructor);
router.delete("/instructor", instructorController.deleteInstructor);
router.post("/instructor/login", instructorController.login);

//      CONTROLLER student       //
router.post("/student", studentController.createStudent);
router.get("/student", studentController.readStudents);
router.get("/student/:id_student", studentController.getStudentByID);
router.get("/student/number/:student_number", studentController.getStudentByNumber);
router.get("/student/name/:name", studentController.getStudentByName);
router.get("/student/status/:status", studentController.getStudentsByStatus);
router.put("/student/:id_student", studentController.updateStudent);
router.delete("/student/:id_student", studentController.deleteStudent);
router.get("/student/class/:fk_id_class", studentController.getStudentsByClass);

//      CONTROLLER class       //
router.post("/class", classController.createClass);
router.get("/class", classController.readClass);
router.get("/class/id/:id_class", classController.readClassByID);
router.get("/class/instructor/:fk_id_instructor", classController.getClassByInstructorID);
router.get("/class/name/:name", classController.GetClassByName);
router.get("/class/instructors", classController.readClassInstructor);
router.get("/class/student", classController.readStudentsClass);
router.put("/class/id/:id_class", classController.updateClass);
router.delete("/class/:id_class", classController.deleteClass);

//      CONTROLLER occurrence       //
router.post("/occurrence", occurrenceController.createOccurrence);
router.get("/occurrence", occurrenceController.readOccurrences);
router.get("/occurrence/:fk_id_student",occurrenceController.getOccurrenceByStudentId
);
router.put("/occurrence/:id_occurrence", occurrenceController.updateOccurrence);
router.delete("/occurrence/:id_occurrence",occurrenceController.deleteOccurrence);

module.exports = router;
