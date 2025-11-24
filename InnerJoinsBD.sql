-- GERENCIAR TURMAS
SELECT
  t.nome AS nome_turma,
  d.nome AS nome_docente
FROM turma t
JOIN docente d ON d.id_docente = t.fk_id_docente;

-- EDITAR TURMA 
SELECT
  e.nome AS nome_aluno,
  t.nome AS nome_turma,
  e.numero_aluno AS numero_chamada,
  e.status
FROM estudante e
JOIN turma t ON t.id_turma = e.fk_id_turma;

-- GERENCIAR DOCENTE
SELECT
  id_docente,
  nome AS nome_docente
FROM docente;

-- PROCEDURE de criar ocorrência
DELIMITER $$

CREATE PROCEDURE criarOcorrencia(
  IN p_tipo VARCHAR(45),
  IN p_descricao TEXT,
  IN p_id_estudante INT
)
BEGIN
    INSERT INTO ocorrencia (tipo, descricao, fk_id_estudante)
    VALUES (p_tipo, p_descricao, p_id_estudante);
END$$

DELIMITER ;
