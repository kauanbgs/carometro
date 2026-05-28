const router = require("express").Router();
const studentController = require("../controllers/studentController");
const instructorController = require("../controllers/instructorController");
const classController = require("../controllers/classController");
const occurrenceController = require("../controllers/occurrenceController");
const verifyJWT = require("../middlewares/verifyJWT");
const { loginLimiter } = require("../middlewares/rateLimiter");
const upload = require("../services/upload");




//      LINK WITH GOOGLE       //
router.get("/auth/google", instructorController.authGoogle);
router.post("/auth/google/disconnect/:id_instructor", instructorController.disconnectGoogle);
router.get("/auth/google/callback", instructorController.callbackGoogle);
router.get("/google_classroom/:id_instructor", instructorController.googleClasses);
router.get("/google_classroom/students/:id_class/:id_instructor", instructorController.googleStudents);


//      CONTROLLER instructor (INST & DEV)       //
router.post("/instructor", instructorController.createInstructor);
router.post("/instructor/login", loginLimiter, instructorController.login);
router.get("/instructor", verifyJWT, instructorController.readInstructors);
router.get("/instructor/:id_instructor", verifyJWT, instructorController.getInstructorById);
router.get("/instructor/name/:name", verifyJWT,instructorController.getInstructorByName);
router.put("/instructor/:id_instructor", verifyJWT,instructorController.updateInstructor);
router.delete("/instructor", verifyJWT,instructorController.deleteInstructor);

//      CONTROLLER student       //
router.post("/student", upload.single("photo"), verifyJWT, studentController.createStudent);
router.get("/student", verifyJWT,studentController.readStudents);
router.get("/student/id/:id_student", verifyJWT, studentController.getStudentByID);
router.get("/student/number/:student_number", verifyJWT, studentController.getStudentByNumber);
router.get("/student/name/:name", verifyJWT, studentController.getStudentByName);
router.get("/student/status/:status", verifyJWT, studentController.getStudentsByStatus);
router.get("/student/class/:fk_id_class", verifyJWT, studentController.getStudentsByClass);
router.put("/student/:id_student", verifyJWT, upload.single("photo"), studentController.updateStudent);
router.delete("/student/:id_student", verifyJWT, studentController.deleteStudent);
router.get("/student/photo/:id_student", verifyJWT, studentController.getStudentPhoto);


router.put("/student/:id_student", verifyJWT, studentController.updateStudent);

router.patch("/student/:id_student/photo", verifyJWT, upload.single("photo"), studentController.updateStudentPhoto);

//      CONTROLLER class       //
router.post("/class", verifyJWT, classController.createClass);
router.get("/class", verifyJWT, classController.readClass);
router.get("/class/:id_class", verifyJWT, classController.readClassByID);
router.get("/class/instructor/:name", verifyJWT, classController.getClassByInstructorName);
router.get("/class/name/:name", verifyJWT, classController.GetClassByName);
router.get("/class/instructors", verifyJWT, classController.readClassInstructor);
router.get("/class/student", verifyJWT, classController.readStudentsClass);
router.put("/class/:id_class", verifyJWT, classController.updateClass);
router.delete("/class/:id_class", verifyJWT, classController.deleteClass);

//      CONTROLLER occurrence       //
router.post("/occurrence", verifyJWT, occurrenceController.createOccurrence);
router.get("/occurrence", verifyJWT, occurrenceController.readOccurrences);
router.get("/occurrence/:fk_id_student",verifyJWT, occurrenceController.getOccurrenceByStudentId);
router.get("/occurrence/id/:id_occurrence", verifyJWT, occurrenceController.getOccurrenceById);
router.put("/occurrence/:id_occurrence", verifyJWT, occurrenceController.updateOccurrence);
router.delete("/occurrence/:id_occurrence", verifyJWT, occurrenceController.deleteOccurrence);

module.exports = router;
