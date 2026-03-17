const connect = require("../connect");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = class instructorController {
  static async createInstructor(req, res, next) {
    const { email, password, name, type } = req.body;
    if (!email || !password || !name) {
      return next(new Error("All fields must be filled"));
    }
    let query;
    let value;
    if (type) {
      query = `INSERT INTO instructor (email, password, name, type) VALUES (?,?,?,?)`;
      value = [email, password, name, type];
    } else {
      query = `INSERT INTO instructor (email, password, name) VALUES (?,?,?)`;
      value = [email, password, name];
    }
    const hash = await bcrypt.hash(password, saltRounds);
    value[1] = hash; //replace the password with the hash
    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          if (err.code === "ER_DUP_ENTRY") {
            return next(new Error("Email already exists."));
          }
          return next(err);
        }
        console.log("Instructor inserted successfully");
        res.status(201).json({ message: "Instructor created successfully!" });
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
        return res
          .status(200)
          .json({ message: "Instructors retrieved successfully", instructors: results });
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
        return res.status(200).json({ message: "Instructor retrieved successfully", instructor: results });
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
        return res.status(200).json({ message: "Instructor retrieved successfully", instructor: results });
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateInstructor(req, res, next) {
    const { id_instructor, password, name, type } = req.body;

    if (!password || !name || !id_instructor) {
      return next(new Error("All fields must be filled"));
    }

    let query;
    let values;

    if (type) {
      query = `UPDATE instructor SET password = ?, name = ?, type = ? WHERE id_instructor = ?`;
      values = [password, name, type, id_instructor];
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
        const senhaCorreta = await bcrypt.compare(password, instructor.password);
        if (!senhaCorreta) {
          return next(new Error("Password incorrect"));
        }

        const queryDelete = `DELETE FROM instructor WHERE email=?`;
        connect.query(queryDelete, [email], function (errDel, resultsDel) {
          if (errDel) {
            console.error(errDel);
            return next(errDel);
          }
          return res.status(200).json({ message: "Instructor deleted successfully!" });
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
        const senhaCorreta = await bcrypt.compare(password, instructor.password);
        if (!senhaCorreta) {
          return next(new Error("Password incorrect"));
        }
        return res.status(200).json({ message: "Successful login", instructor });
      });
    } catch (error) {
      next(error);
    }
  }
};