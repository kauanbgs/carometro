-- ======================================
-- VIEW: GERENCIAR TURMAS
-- ======================================
CREATE VIEW vw_gerenciar_turmas AS
SELECT
  t.nome AS nome_turma,
  d.nome AS nome_docente,
  d.id_docente AS id_docente
FROM turma t
JOIN docente d ON d.id_docente = t.fk_id_docente;


-- ======================================
-- VIEW: EDITAR TURMA (LISTA DE ALUNOS)
-- ======================================
CREATE VIEW vw_editar_turma AS
SELECT
  e.nome AS nome_aluno,
  t.nome AS nome_turma,
  e.numero_aluno AS numero_chamada,
  e.status
FROM estudante e
JOIN turma t ON t.id_turma = e.fk_id_turma;


-- ======================================
-- PROCEDURE: criarOcorrencia
-- ======================================
-- DELIMITER $$

-- CREATE PROCEDURE criarOcorrencia(
--   IN p_tipo VARCHAR(100),
--   IN p_descricao VARCHAR(150),
--   IN p_id_estudante INT,
--   IN p_id_docente INT
-- )
-- BEGIN
--     DECLARE nova_ocorrencia_id INT;

--     -- Criar ocorrência
--     INSERT INTO ocorrencia (tipo, descricao, data_criacao, fk_id_estudante)
--     VALUES (p_tipo, p_descricao, NOW(), p_id_estudante);

--     -- Captura do ID gerado automaticamente
--     SET nova_ocorrencia_id = LAST_INSERT_ID();

--     -- Registrar LOG
--     INSERT INTO log_ocorrencias (data_log, fk_id_ocorrencia, fk_id_docente)
--     VALUES (NOW(), nova_ocorrencia_id, p_id_docente);
--   END;

-- END$$

-- DELIMITER ;


-- ======================================
-- PROCEDURE: criarOcorrencia
-- ======================================

DELIMITER $$
CREATE PROCEDURE create_occurrence(
    IN p_id_occurrence INT,
    IN p_type VARCHAR (100),
    IN p_description VARCHAR (150),
    IN p_id_student INT,
    IN p_id_instructor INT 
)
BEGIN 
    DECLARE v_occurrence_id INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN 
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erro ao criar a ocorrência.';
    END;

    START TRANSACTION;
      IF NOT EXISTS(
        SELECT 1 FROM estudante WHERE id_estudante = p_id_estudante
      )THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erro ao encontrar o aluno';
      END IF;

      IF NOT EXISTS(
        SELECT 1 FROM docente WHERE id_docente = p_id_docente
      )THEN 
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erro ao encontrar o docente';
      END IF;


    

DELIMITER ;

-- ======================================
-- TRIGGER: verificarreincidencia
-- ======================================
-- DELIMITER $$ 
-- CREATE TRIGGER tr_verificar_reincidencia;
-- AFTER INSERT ON ocorrencia
-- FOR EACH ROW
-- BEGIN
--     DECLARE v_total INT;
--     SELECT COUNT(*) INTO v_total
--     FROM ocorrencia
--     WHERE fk_id_estudante = NEW.fk_id_estudante

--     IF v_total >= 3 THEN
--         UPDATE estudante
--         SET status = 0
--         WHERE id_estudante = NEW.fk_id_estudante
--     END IF;
--   END$$
-- DELIMITER ;


-- INSERT INTO ocorrencia (tipo,descricao,data_criacao,fk_id_estudante)
-- VALUES ('Advertência','Testando trigger',NOW(),1);



-- ======================================
-- TRIGGER: impedir_ocorrencia_aluno_inativo
-- ======================================

DELIMITER $$

CREATE TRIGGER trg_prevent_inactive_student_occurrence
BEFORE INSERT ON occurrence
FOR EACH ROW
BEGIN
    DECLARE v_status TINYINT;

    -- Busca o status atual do estudante que está recebendo a ocorrência
    SELECT status INTO v_status
    FROM student
    WHERE id_student = NEW.fk_id_student;

    -- Se o status for 0 (inativo), aborta a inserção com uma mensagem de erro
    IF v_status = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Operação negada: Não é possível registrar uma nova ocorrência para um estudante inativo.';
    END IF;
END $$

DELIMITER ;

INSERT INTO occurrence (type,description,create_date,fk_id_student)
VALUES ('Advertência','Testando trigger 2',NOW(),30);


-- ======================================
-- PROCEDURE: transferir_aluno_turma
-- ======================================

DELIMITER //
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
END // 
DELIMITER ;