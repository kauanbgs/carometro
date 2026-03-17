exports.up = function (knex) {
  return knex.raw(`
CREATE PROCEDURE createOccurrence(
  IN p_type VARCHAR(100),
  IN p_description VARCHAR(150),
  IN p_id_student INT,
  IN p_id_instructor INT
)
BEGIN
    DECLARE new_occurrence_id INT;

    -- Criar ocorrência
    INSERT INTO occurrence (type, description, create_date, fk_id_student)
    VALUES (p_type, p_description, NOW(), p_id_student);

    -- Captura do ID gerado automaticamente
    SET new_occurrence_id = LAST_INSERT_ID();

    -- Registrar LOG
    INSERT INTO occurrence_log (log_date, fk_id_occurrence, fk_id_insructor)
    VALUES (NOW(), new_occurrence_id, p_id_instructor);

END 
        `);
};

exports.down = function(knex){
  return knex.schema.dropProcedureIfExists('createOccurrence')
};