const connect = require("../connect");
const bcrypt = require("bcrypt");
const validateInstructor = require("../services/validateInstructor");
const validateInstEmail = require("../services/validateInstEmail");


const jwt = require("jsonwebtoken");

const saltRounds = 10;

const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/sigo/auth/google/callback"
);

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
            {
              expiresIn: "24h",
            },
          );
          delete instructor.password;
          return res
            .status(200)
            .json({ message: "Successful login", token, instructor });
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async authGoogle(req, res, next) {
    const { id_instructor } = req.query;
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: ['https://www.googleapis.com/auth/classroom.courses.readonly', 'https://www.googleapis.com/auth/classroom.rosters.readonly'],
      state: id_instructor
    });
    res.redirect(authUrl);
  }

  static async disconnectGoogle(req, res) {
    const { id_instructor } = req.params;
    const query = `UPDATE instructor SET google_access_token = NULL WHERE id_instructor = ?`;
    const value = [id_instructor];
    connect.query(query, value, function (err, results) {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (results.affectedRows === 0) {
        return next(new Error("Instructor not found"));
      }
      return res.status(200).json({ message: "Google Classroom disconnected successfully!" });
    });
  }

  static async callbackGoogle(req, res, next) {
    const { code, state } = req.query;
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const id_instructor = state;
      const google_access_token = tokens.access_token;
      const query = `UPDATE instructor SET google_access_token = ? WHERE id_instructor = ?`;
      const value = [google_access_token, id_instructor];

      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (results.affectedRows === 0) {
          return next(new Error("Instructor not found"));
        }
        // Redirect back to frontend
        return res.redirect("http://localhost:5173/conexoes?success=true");
      });
    } catch (error) {
      console.error("Error in Google Callback:", error);
      res.redirect("http://localhost:5173/conexoes?error=true");
    }
  }
  static async googleClasses(req, res) {
    const id_instructor = req.id_instructor || req.params.id_instructor;
    const query = `SELECT google_access_token FROM instructor WHERE id_instructor = ?`;
    
    connect.query(query, [id_instructor], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0 || !results[0].google_access_token) {
        return res.status(401).json({ error: "Google Classroom não conectado!" });
      }

      oauth2Client.setCredentials({ access_token: results[0].google_access_token });
      const classroom = google.classroom({ version: "v1", auth: oauth2Client });
      
      try {
        const response = await classroom.courses.list();
        res.json(response.data.courses || []);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  static async googleStudents(req, res) {
    const { id_class, id_instructor } = req.params;
    const query = `SELECT google_access_token FROM instructor WHERE id_instructor = ?`;

    connect.query(query, [id_instructor], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0 || !results[0].google_access_token) {
        return res.status(401).json({ error: "Google Classroom não conectado!" });
      }

      oauth2Client.setCredentials({ access_token: results[0].google_access_token });
      const classroom = google.classroom({ version: "v1", auth: oauth2Client });

      try {
        const response = await classroom.courses.students.list({ courseId: id_class });
        res.json(response.data.students || []);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }
  
};
