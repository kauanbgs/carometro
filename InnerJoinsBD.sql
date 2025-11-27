-- ======================================
-- VIEW: GERENCIAR TURMAS
-- ======================================
CREATE OR REPLACE VIEW vw_gerenciar_turmas AS
SELECT
  t.nome AS nome_turma,
  d.nome AS nome_docente
FROM turma t
JOIN docente d ON d.id_docente = t.fk_id_docente;


-- ======================================
-- VIEW: EDITAR TURMA (LISTA DE ALUNOS)
-- ======================================
CREATE OR REPLACE VIEW vw_editar_turma AS
SELECT
  e.nome AS nome_aluno,
  t.nome AS nome_turma,
  e.numero_aluno AS numero_chamada,
  e.status
FROM estudante e
JOIN turma t ON t.id_turma = e.fk_id_turma;


-- ======================================
-- VIEW: GERENCIAR DOCENTES
-- ======================================
CREATE OR REPLACE VIEW vw_gerenciar_docentes AS
SELECT
  d.id_docente,
  d.nome AS nome_docente
FROM docente d;


-- ======================================
-- PROCEDURE: criarOcorrencia
-- ======================================
DELIMITER $$

CREATE PROCEDURE criarOcorrencia(
  IN p_tipo VARCHAR(100),
  IN p_descricao VARCHAR(150),
  IN p_id_estudante INT,
  IN p_id_docente INT
)
BEGIN
    DECLARE nova_ocorrencia_id INT;

    -- Criar ocorrência
    INSERT INTO ocorrencia (tipo, descricao, data_criacao, fk_id_estudante)
    VALUES (p_tipo, p_descricao, NOW(), p_id_estudante);

    -- Captura do ID gerado automaticamente
    SET nova_ocorrencia_id = LAST_INSERT_ID();

    -- Registrar LOG
    INSERT INTO log_ocorrencias (data_log, fk_id_ocorrencia, fk_id_docente)
    VALUES (NOW(), nova_ocorrencia_id, p_id_docente);

END$$

DELIMITER ;
