const connect = require("../connect");
const validateOccurrence = require("../services/validateOccurrence");

module.exports = class OccurrenceController {
  static async createOccurrence(req, res, next) {
    let { type, description, fk_id_student, fk_id_instructor } = req.body;

    const validationOccurrenceError = await validateOccurrence(req.body);
    if (validationOccurrenceError) {
      return res.status(400).json(validationOccurrenceError);
    }
    const query = `CALL createOccurrence(?, ?, ?, ?)`;
    const values = [type, description, fk_id_student, fk_id_instructor];

    try {
      connect.query(query, values, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.status(201).json({ message: "Occurrence created successfully" });
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
        return res.status(200).json({ occurrences: results });
      });
    } catch (error) {
      return next(error);
    }
  }

  static async readOccurrences(req, res, next) {
    const query = `
      SELECT o.*, i.name as instructor_name, s.name as student_name 
      FROM occurrence o 
      JOIN occurrence_log ol ON o.id_occurrence = ol.fk_id_occurrence 
      JOIN instructor i ON ol.fk_id_instructor = i.id_instructor
      JOIN student s ON o.fk_id_student = s.id_student
      ORDER BY o.create_date DESC
    `;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          return next(err);
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateOccurrence(req, res, next) {
    const { id_occurrence } = req.params;
    let { type, description, create_date, fk_id_student } = req.body;

    const validationOccurrenceError = await validateOccurrence(req.body, true);
    if (validationOccurrenceError) {
      return res.status(400).json(validationOccurrenceError);
    }

    const query =
      "UPDATE occurrence SET type=?, description=?, create_date=?, fk_id_student=? WHERE id_occurrence=?";
    const values = [type, description, create_date, fk_id_student, id_occurrence];

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
          .json({ message: "Occurrence updated successfully!", id_occurrence });
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