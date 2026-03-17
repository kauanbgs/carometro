exports.up = function (knex) {
  return knex.raw(`
            CREATE VIEW vw_readClassInstructor AS
SELECT
  c.name AS name_class,
  i.name AS name_instructor,
  i.id_instructor AS id_instructor
FROM class c
JOIN instructor i ON i.id_instructor = c.fk_id_instructor;
        `);
};

exports.down = function (knex) {
  return knex.schema.dropViewIfExists("vw_readClassInstructor");
};
