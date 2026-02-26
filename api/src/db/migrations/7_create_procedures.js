exports.up = function (knex) {
  return knex.raw(`
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

END 
        `);
};

exports.down = function(knex){
  return knex.schema.dropProcedureIfExists('criarOcorrencia')
};