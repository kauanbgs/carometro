const connect = require("../connect");

module.exports = class OccurrenceController {
  static async createOccurrence(req, res, next) {
    let { type, description, fk_id_student, fk_id_instructor } = req.body;
    if (!type || !description || !fk_id_student || !fk_id_instructor) {
      return res.status(400).json({ error: "All fields must be filled" });
    }
    const query = `CALL createOccurrence(?, ?, ?, ?)`;
    const values = [type, description, fk_id_student, fk_id_instructor];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
              error: "Occurrence already registered. Try another.",
            });
          }
          return next(err);
        }
        return res.status(201).json({
          message: "Occurrence created successfully (with procedure) ",
        });
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getOccurrenceByStudentId(req, res, next) {
    const { fk_id_student } = req.params;
    const query = "SELECT * FROM occurrence WHERE fk_id_student = ?";
    const values = [fk_id_student];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "No occurrences registered!" });
        }
        return res.status(200).json({ occurrences: results });
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getOccurrenceById(req, res, next) {
    const { id_occurrence } = req.params;
    const query = "SELECT * FROM occurrence WHERE id_occurrence = ?";
    const values = [id_occurrence];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "No occurrences registered!" });
        }
        return res.status(200).json({ occurrences: results });
      });
    } catch (error) {
      return next(error);
    }
  }

  static async readOccurrences(req, res, next) {
    const query = "SELECT * FROM occurrence";
    try {
      connect.query(query, function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "No occurrences registered!" });
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateOccurrence(req, res, next) {
    const { id_occurrence } = req.params;
    let { type, description, fk_id_student } = req.body;
    if (!type || !description || !fk_id_student) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    const query =
      "UPDATE occurrence SET type=?, description=?, fk_id_student=? WHERE id_occurrence=?";
    const values = [type, description, fk_id_student, id_occurrence];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Occurrence not found!" });
        }
        return res
          .status(200)
          .json({ message: "Occurrence updated: ", id_occurrence });
      });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteOccurrence(req, res, next) {
    const { id_occurrence } = req.params;
    const query = "DELETE FROM occurrence WHERE id_occurrence = ?";
    const values = [id_occurrence];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Occurrence not found!" });
        }
        return res.status(200).json({ message: "Occurrence deleted" });
      });
    } catch (error) {
      return next(error);
    }
  }
};