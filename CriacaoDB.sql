CREATE DATABASE carometro;
USE carometro;

CREATE TABLE docente (
	id_docente INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(150) UNIQUE NOT NULL,
	senha VARCHAR(100) NOT NULL,
	tipo ENUM("dev", "doc") DEFAULT "doc"
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
	fk_id_docente INT NOT NULL
);
