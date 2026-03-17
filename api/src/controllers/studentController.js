const connect = require("../connect");

module.exports = class studentController {
  static async createStudent(req, res, next) {
    const { name, email, phone, create_date, status, student_number, fk_id_class } =
      req.body;
    if (
      !name ||
      !email ||
      !phone ||
      !create_date ||
      !status ||
      !student_number ||
      !fk_id_class
    ) {
      return res
        .status(400)
        .json({ error: "All fields must be filled" });
    }
    const query = `INSERT INTO student (name, email, phone, create_date, status, student_number, fk_id_class) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, email, phone, create_date, status, student_number, fk_id_class];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res
          .status(201)
          .json({ message: "Student created successfully" });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async readStudents(req, res, next) {
    const query = "SELECT * FROM student";
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res
            .status(404)
            .json({ error: "Students not found" });
        }
        return res
          .status(200)
          .json({ message: "Students retrieved successfully", students: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async getStudentByID(req, res, next) {
    const { id_student } = req.params;
    if (!id_student) {
      return res.status(400).json({ error: "Student ID is required" });
    }
    const query = "SELECT * FROM student WHERE id_student = ?";
    const values = [id_student];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Student not found" });
        }
        return res
          .status(200)
          .json({ message: "Student retrieved successfully", student: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async getStudentByNumber(req, res, next) {
    const { student_number } = req.params;
    console.log("ID recebido:", student_number); // <--- Adicione isto
    const query = "SELECT * FROM student WHERE student_number = ?";
    const values = [student_number];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Student not found" });
        }
        return res
          .status(200)
          .json({ message: "Student retrieved successfully", student: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async getStudentByName(req, res, next) {
    const { name } = req.params;
    const query = "SELECT * FROM student WHERE name LIKE ?";
    const values = [`%${name}%`];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "student não encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "student: ", student: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async getStudentsByStatus(req, res, next) {
    const { status } = req.params;
    const query = "SELECT * FROM student WHERE status = ?";
    const values = [status];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Student not found" });
        }
        return res
          .status(200)
          .json({ message: "Student retrieved successfully", student: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async updateStudent(req, res, next) {
    const { id_student } = req.params;
    const {
      name,
      email,
      phone,
      create_date,
      status,
      student_number,
      fk_id_class,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !create_date ||
      !status ||
      !student_number ||
      !fk_id_class ||
      !id_student
    ) {
      return next(
        res.status(400).json({ error: "All fields must be filled" })
      );
    }

    const query = `UPDATE student SET name=?, email=?, phone=?, create_date=?, status=?, student_number=?, fk_id_class=? WHERE id_student=?`;
    const values = [
      name,
      email,
      phone,
      create_date,
      status,
      student_number,
      fk_id_class,
      id_student,
    ];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.affectedRows === 0) {
          return next(
            res.status(404).json({ error: "Student not found" })
          );
        }
        return res
          .status(200)
          .json({ message: "Student updated successfully", id_student });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async deleteStudent(req, res, next) {
    const { id_student } = req.params;
    if (!id_student) {
      return next(new Error("Student ID is required"));
    }
    const query = "DELETE FROM student WHERE id_student = ?";
    const values = [id_student];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.affectedRows === 0) {
          return next(new Error("Student not found"));
        }
        return res
          .status(200)
          .json({ message: "Student deleted successfully", id_student });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
  static async getStudentsByClass(req, res, next) {
    const { fk_id_class } = req.params;
    const query = "SELECT * FROM student WHERE fk_id_class = ?";
    const values = [fk_id_class];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return next(new Error("No students found in this class"));
        }
        return res
          .status(200)
          .json({ message: "Students found successfully", students: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
};
