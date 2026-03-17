exports.up = function (knex) {
  return knex.raw(`
            CREATE VIEW vw_editClassPage AS
SELECT
  s.name AS name_student,
  c.name AS name_class,
  s.student_number AS attendance_number,
  s.status
FROM student s
JOIN class c ON c.id_class = s.fk_id_class;
        `);
};

exports.down = function (knex) {
  return knex.schema.dropViewIfExists("vw_editClassPage");
};
