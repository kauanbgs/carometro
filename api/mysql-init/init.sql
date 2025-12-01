CREATE DATABASE carometro;
USE carometro;

CREATE TABLE docente (
	id_docente INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(150) UNIQUE NOT NULL,
	senha VARCHAR(100) NOT NULL,
	tipo ENUM("adm", "doc") DEFAULT "doc"
);

CREATE TABLE turma(
	id_turma INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	fk_id_docente INT NOT NULL,
	FOREIGN KEY (fk_id_docente) REFERENCES docente(id_docente)
);

CREATE TABLE estudante (
	id_estudante INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(150) UNIQUE NOT NULL,
	telefone VARCHAR(11) NOT NULL,
	data_criacao DATETIME NOT NULL,
	status TINYINT NOT NULL,
	numero_aluno INT NOT NULL,
	fk_id_turma INT NOT NULL,
	FOREIGN KEY (fk_id_turma) REFERENCES turma(id_turma)
);

CREATE TABLE ocorrencia(
	id_ocorrencia INT AUTO_INCREMENT PRIMARY KEY,
	tipo VARCHAR(100) NOT NULL,
	descricao VARCHAR(150) NOT NULL,
	data_criacao DATETIME NOT NULL,
	fk_id_estudante INT NOT NULL,
	FOREIGN KEY (fk_id_estudante) REFERENCES estudante(id_estudante)
);

CREATE TABLE estudantes_ocorrencias(
	id_estudantes_ocorrencias INT AUTO_INCREMENT PRIMARY KEY,
	fk_id_ocorrencia INT NOT NULL,
	fk_id_estudante INT NOT NULL,
	FOREIGN KEY (fk_id_ocorrencia) REFERENCES ocorrencia(id_ocorrencia),
	FOREIGN KEY (fk_id_estudante) REFERENCES estudante(id_estudante)
);

CREATE TABLE log_ocorrencias(
	id_log_ocorrencia INT AUTO_INCREMENT PRIMARY KEY,
	data_log DATETIME NOT NULL,
	fk_id_ocorrencia INT NOT NULL,
	fk_id_docente INT NOT NULL,
	FOREIGN KEY (fk_id_ocorrencia) REFERENCES ocorrencia(id_ocorrencia),
	FOREIGN KEY (fk_id_docente) REFERENCES docente(id_docente)
);

INSERT INTO docente (nome, email, senha, tipo)
VALUES ('Carlos Souza', 'carlos.souza@senai.br', '123456', 'doc');


INSERT INTO turma (nome, fk_id_docente)
VALUES ('1C - DS', 1);

INSERT INTO estudante (nome, email, telefone, data_criacao, status, numero_aluno, fk_id_turma) VALUES
('Aluanan Angel de Sousa', 'aluanan.sousa@aluno.senai.br', '11900000001', '2025-01-01 08:00:00', 1, 1, 1),
('Ana Carolina de Oliveira Monteiro', 'ana.monteiro@aluno.senai.br', '11900000002', '2025-01-01 08:00:00', 1, 2, 1),
('Anna Vitória Martins Ramos', 'anna.ramos@aluno.senai.br', '11900000003', '2025-01-01 08:00:00', 1, 3, 1),
('Arthur Cintra de Lacerda', 'arthur.lacerda@aluno.senai.br', '11900000004', '2025-01-01 08:00:00', 1, 4, 1),
('Arthur Cintra Faleiros', 'arthur.faleiros@aluno.senai.br', '11900000005', '2025-01-01 08:00:00', 1, 5, 1),
('Arthur Marques Santos', 'arthur.santos@aluno.senai.br', '11900000006', '2025-01-01 08:00:00', 1, 6, 1),
('Bryan Miguel Moreira', 'bryan.moreira@aluno.senai.br', '11900000007', '2025-01-01 08:00:00', 1, 7, 1),
('Davi Azevedo Gonçalves', 'davi.goncalves@aluno.senai.br', '11900000008', '2025-01-01 08:00:00', 1, 8, 1),
('Eduardo Augusto Tognati', 'eduardo.tognati@aluno.senai.br', '11900000009', '2025-01-01 08:00:00', 1, 9, 1),
('Flávio Henrique de Souza Filho', 'flavio.souza@aluno.senai.br', '11900000010', '2025-01-01 08:00:00', 1, 10, 1),
('Gabriel Braz Menezes', 'gabriel.menezes@aluno.senai.br', '11900000011', '2025-01-01 08:00:00', 1, 11, 1),
('Gabriel Rossi Ventura', 'gabriel.ventura@aluno.senai.br', '11900000012', '2025-01-01 08:00:00', 1, 12, 1),
('Guilherme Bason Garcia Neves', 'guilherme.neves@aluno.senai.br', '11900000013', '2025-01-01 08:00:00', 1, 13, 1),
('João Victor Oliveira Silva', 'joao.silva@aluno.senai.br', '11900000014', '2025-01-01 08:00:00', 1, 14, 1),
('José Victor Faccirolli', 'jose.faccirolli@aluno.senai.br', '11900000015', '2025-01-01 08:00:00', 1, 15, 1),
('Kauan Borges Plaza', 'kauan.plaza@aluno.senai.br', '11900000016', '2025-01-01 08:00:00', 1, 16, 1),
('Kauan Henrique Melo Silva', 'kauan.silva@aluno.senai.br', '11900000017', '2025-01-01 08:00:00', 1, 17, 1),
('Keliyah Cristine de Oliveira Martins', 'keliyah.martins@aluno.senai.br', '11900000018', '2025-01-01 08:00:00', 1, 18, 1),
('Leonardo Alves da Silva', 'leonardo.silva@aluno.senai.br', '11900000019', '2025-01-01 08:00:00', 1, 19, 1),
('Luís Pedro França Paulino', 'luis.paulino@aluno.senai.br', '11900000020', '2025-01-01 08:00:00', 1, 20, 1),
('Luiz Felipe Campos Margato', 'luiz.margato@aluno.senai.br', '11900000021', '2025-01-01 08:00:00', 1, 21, 1),
('Maria Vitória Sampaio Souza', 'maria.souza@aluno.senai.br', '11900000022', '2025-01-01 08:00:00', 1, 22, 1),
('Pedro Galindo Tavares', 'pedro.tavares@aluno.senai.br', '11900000023', '2025-01-01 08:00:00', 1, 23, 1),
('Rafael Caíres dos Santos', 'rafael.santos@aluno.senai.br', '11900000024', '2025-01-01 08:00:00', 1, 24, 1),
('Rafael Mendes Neves', 'rafael.neves@aluno.senai.br', '11900000025', '2025-01-01 08:00:00', 1, 25, 1),
('Renan Vieira Mobrise', 'renan.mobrise@aluno.senai.br', '11900000026', '2025-01-01 08:00:00', 1, 26, 1),
('Sofia Siqueira Belchior', 'sofia.belchior@aluno.senai.br', '11900000027', '2025-01-01 08:00:00', 1, 27, 1),
('Sophia de Oliveira Ferreira', 'sophia.ferreira@aluno.senai.br', '11900000028', '2025-01-01 08:00:00', 1, 28, 1),
('Ulisses Santini Gomes', 'ulisses.gomes@aluno.senai.br', '11900000029', '2025-01-01 08:00:00', 1, 29, 1),
('Vinicius Soares Peroni', 'vinicius.peroni@aluno.senai.br', '11900000030', '2025-01-01 08:00:00', 1, 30, 1);
