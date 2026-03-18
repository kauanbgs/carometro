exports.up = function (knex) {
  return knex.raw(`
CREATE TRIGGER trg_prevent_inactive_student_occurrence
BEFORE INSERT ON occurrence
FOR EACH ROW
BEGIN
    DECLARE v_status TINYINT;

    -- Busca o status atual do estudante que esta recebendo a ocorrencia
    SELECT status INTO v_status
    FROM student
    WHERE id_student = NEW.fk_id_student;

    -- Se o status for 0 (inativo), aborta a insercao com uma mensagem de erro
    IF v_status = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Operacao negada: Nao e possivel registrar uma nova ocorrencia para um estudante inativo.';
    END IF;
END
    `);
};

exports.down = function (knex) {
  return knex.raw("DROP TRIGGER IF EXISTS trg_prevent_inactive_student_occurrence");
};
