exports.up = function (knex) {
  return knex.raw(`
CREATE PROCEDURE Transfer_Capacity_Log(
    IN p_id_student INT,
    IN p_id_new_class INT  -- 1) Corrigido o nome do parâmetro para bater com a query!
)
BEGIN 
    DECLARE v_total_students INT;
    DECLARE error_secondary TINYINT DEFAULT 0;
    -- Handler para pegar qualquer erro nas queries
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
    BEGIN
        SET error_secondary = 1;
    END;
    
    START TRANSACTION;
    -- 2) Removida a tabela student_number do update
    UPDATE student 
    SET fk_id_class = p_id_new_class
    WHERE id_student = p_id_student;
    -- Precisamos checar se o update já não causou erro antes do savepoint
    IF error_secondary = 1 THEN
        ROLLBACK;
    ELSE
        -- Salvando o Update
        SAVEPOINT sp_student_transferred;
        -- COUNT para saber o novo tamanho da turma 
        SELECT COUNT(id_student) INTO v_total_students
        FROM student
        WHERE fk_id_class = p_id_new_class AND status = 1;
        INSERT INTO occurrence (type, description, create_date, fk_id_student)
        VALUES (
            'Transferência', 
            CONCAT('Transferido. A nova turma agora possui ', v_total_students, ' alunos ativos.'), 
            NOW(), 
            p_id_student
        );
        -- Se o SELECT COUNT ou o INSERT falharem
        IF error_secondary = 1 THEN
            -- Desfaz a contagem e o log, mas MANTÉM a transferência de turma do Update
            ROLLBACK TO sp_student_transferred;
        END IF;
        COMMIT;
    END IF;
END 
        `);
};

exports.down = function (knex) {
  return knex.raw('DROP PROCEDURE IF EXISTS Transfer_Capacity_Log');
};