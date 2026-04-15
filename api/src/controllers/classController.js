//NAO USAR PRETTIER
const connect = require("../connect");
const validateClass = require("../services/validateClass");

module.exports = class classController {
  static async createClass(req, res, next) {
    const { name, fk_id_instructor } = req.body;

    const validationErrorClass = validateClass(req.body);
    if (validationErrorClass) {
      return res.status(400).json(validationErrorClass);
    }
    
    const query = "INSERT INTO class (name, fk_id_instructor) VALUES (?, ?)";
    const values = [name, fk_id_instructor];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ error: "class already registered in the system!" });
          }
          console.error(err);
          return next(err);
        }
        return res
          .status(201)
          .json({ message: "class registered successfully!" });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async readClass(req, res, next) {
    const query = `
      SELECT class.name, instructor.name as instructor_name, class.id_class 
      FROM class 
      JOIN instructor ON class.fk_id_instructor = instructor.id_instructor
    `;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.status(200).json({ classes: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async readClassByID(req, res, next) {
    const { id_class } = req.query;
    if (!id_class) {
      return res.status(400).json({ error: "ID of class is required!" });
    }
    const query = `
      SELECT class.name as name_class, instructor.name as name_instructor, class.id_class as id_class 
      FROM class 
      JOIN instructor ON class.fk_id_instructor = instructor.id_instructor 
      WHERE class.id_class = ?
    `;
    const values = [id_class];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async getClassByInstructorName(req, res, next) {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ error: "Name of instructor is required!" });
    }
    const query =
      "SELECT class.name, instructor.name as instructor_name, class.id_class FROM class JOIN instructor ON class.fk_id_instructor = instructor.id_instructor WHERE instructor.name LIKE ?";
    const values = [`%${name}%`];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "No class found for this instructor." });
        }
        return res.status(200).json({ classes: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async GetClassByName(req, res, next) {
    const { name } = req.params;
    const query =
      "SELECT class.name, instructor.name as instructor_name, class.id_class FROM class JOIN instructor ON class.fk_id_instructor = instructor.id_instructor WHERE class.name LIKE ?";
    const values = [`%${name}%`];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "No class found with this name." });
        }
        return res.status(200).json({ classes: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async updateClass(req, res, next) {
    const { name, fk_id_instructor } = req.body;
    const { id_class } = req.params;

    const validationErrorClass = validateClass(req.body);
    if (validationErrorClass) {
      return res.status(400).json(validationErrorClass);
    }

    const query =
      "UPDATE class SET name = ?, fk_id_instructor = ? WHERE id_class = ?";
    const values = [name, fk_id_instructor, id_class];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "class not found!" });
        }
        return res
          .status(200)
          .json({ message: "class updated successfully!", id_class });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async deleteClass(req, res, next) {
    const id_class = req.params.id_class;
    if (!id_class) {
      return res.status(400).json({ error: "ID of class is required!" });
    }
    const query = "DELETE FROM class WHERE id_class = ?";
    const values = [id_class];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "class not found!" });
        }
        return res
          .status(200)
          .json({ message: "class deleted successfully: ", id_class });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async readClassInstructor(req, res, next) {
    const query = `
      SELECT * FROM vw_readClassInstructor
    `;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async readStudentsClass(req, res, next) {
    const query = `
      SELECT * FROM vw_editClassPage;
    `;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
};
