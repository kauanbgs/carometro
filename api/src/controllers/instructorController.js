const connect = require("../connect");
const bcrypt = require("bcrypt");
const validateInstructor = require("../services/validateInstructor");
const validateInstEmail = require("../services/validateInstEmail");

const jwt = require("jsonwebtoken");

const saltRounds = 10;

module.exports = class instructorController {
  static async createInstructor(req, res, next) {
    const { email, password, name, role } = req.body;

    const validationErrorInstructor = await validateInstructor(req.body);
    if (validationErrorInstructor) {
      return res.status(400).json(validationErrorInstructor);
    }

    const validationErrorEmailInst = await validateInstEmail(email);
    if (validationErrorEmailInst) {
      return res.status(400).json(validationErrorEmailInst);
    }

    try {
      const hash = await bcrypt.hash(password, saltRounds);

      let query;
      let values;

      if (role) {
        query = `INSERT INTO instructor (email, password, name, role) VALUES (?,?,?,?)`;
        values = [email, hash, name, role];
      } else {
        query = `INSERT INTO instructor (email, password, name) VALUES (?,?,?)`;
        values = [email, hash, name];
      }

      connect.query(query, values, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.status(201).json({ message: "Instructor created successfully" });
      });

    } catch (error) {
      next(error);
    }
  }

  static async readInstructors(req, res, next) {
    const query = `SELECT * FROM instructor`;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.status(200).json({
          message: "Instructors retrieved successfully",
          instructors: results,
        });
      });
    } catch (error) {
      next(error);
    }
  }

  static async getInstructorById(req, res, next) {
    const { id_instructor } = req.params;
    const query = `SELECT * FROM instructor WHERE id_instructor=?`;
    const value = [id_instructor];
    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (results.length === 0) {
          return next(new Error("Instructor not found"));
        }
        return res.status(200).json({
          message: "Instructor retrieved successfully",
          instructor: results,
        });
      });
    } catch (error) {
      next(error);
    }
  }

  static async getInstructorByName(req, res, next) {
    const { name } = req.params;
    const query = `SELECT * FROM instructor WHERE name LIKE ?`;
    const value = [`%${name}%`];
    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (results.length === 0) {
          return next(new Error("Instructor not found"));
        }
        return res.status(200).json({
          message: "Instructor retrieved successfully",
          instructor: results,
        });
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateInstructor(req, res, next) {
    const { id_instructor } = req.params;
    const { password, name, role } = req.body;

    const validationErrorEmailInst = await validateInstEmail(email);
    if (validationErrorEmailInst) {
      return res.status(400).json(validationErrorEmailInst);
    }

    let query;
    let values;

    if (role) {
      query = `UPDATE instructor SET password = ?, name = ?, role = ? WHERE id_instructor = ?`;
      values = [password, name, role, id_instructor];
    } else {
      query = `UPDATE instructor SET password = ?, name = ? WHERE id_instructor = ?`;
      values = [password, name, id_instructor];
    }
    const hash = await bcrypt.hash(password, saltRounds);
    values[0] = hash; //replace the password with the hash
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (results.affectedRows === 0) {
          return next(new Error("Instructor not found"));
        }
        return res
          .status(200)
          .json({ message: "Instructor updated successfully!", id_instructor });
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteInstructor(req, res, next) {
    const { email, password } = req.body;

    if (!password || !email) {
      return next(new Error("All fields must be filled"));
    }

    try {
      const querySelect = `SELECT * FROM instructor WHERE email=?`;
      connect.query(querySelect, [email], async function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return next(new Error("Instructor not found"));
        }

        const instructor = results[0];
        const senhaCorreta = await bcrypt.compare(
          password,
          instructor.password,
        );
        if (!senhaCorreta) {
          return next(new Error("Password incorrect"));
        }

        const queryDelete = `DELETE FROM instructor WHERE email=?`;
        connect.query(queryDelete, [email], function (errDel, resultsDel) {
          if (errDel) {
            console.error(errDel);
            return next(errDel);
          }
          return res
            .status(200)
            .json({ message: "Instructor deleted successfully!" });
        });
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new Error("All fields must be filled"));
    }
    const query = `SELECT * FROM instructor WHERE email=?`;
    const value = [email];
    try {
      connect.query(query, value, async function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (results.length === 0) {
          return next(new Error("Instructor not found"));
        }
        const instructor = results[0];
        const senhaCorreta = await bcrypt.compare(
          password,
          instructor.password,
        );
        if (!senhaCorreta) {
          return next(new Error("Password incorrect"));
        } else {
          const token = jwt.sign(
            { id_instructor: instructor.id_instructor },
            process.env.SECRET,
            /* O secret vai decodificar e codificar, isso evita invasões com token de outras pessoas */ {
              expiresIn: "24h",
            },
          );
          // Remover o atributo senha do objeto user
          delete instructor.password;
          return res
            .status(200)
            .json({ message: "Successful login", instructor, token });
        }
      });
    } catch (error) {
      next(error);
    }
  }
};
