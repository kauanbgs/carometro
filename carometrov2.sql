CREATE DATABASE  IF NOT EXISTS `carometro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `carometro`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: carometro
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `docente`
--

DROP TABLE IF EXISTS `docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docente` (
  `id_docente` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `tipo` enum('adm','doc') DEFAULT 'doc',
  PRIMARY KEY (`id_docente`),
  UNIQUE KEY `docente_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente`
--

LOCK TABLES `docente` WRITE;
/*!40000 ALTER TABLE `docente` DISABLE KEYS */;
INSERT INTO `docente` VALUES (1,'Euller Ferreira','euller@gmail.com','123456','adm'),(2,'Adriano Donisete','adriano@gmail.com','123456','adm');
/*!40000 ALTER TABLE `docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudante`
--

DROP TABLE IF EXISTS `estudante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudante` (
  `id_estudante` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefone` varchar(11) NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `numero_aluno` int NOT NULL,
  `fk_id_turma` int unsigned NOT NULL,
  PRIMARY KEY (`id_estudante`),
  UNIQUE KEY `estudante_email_unique` (`email`),
  KEY `estudante_fk_id_turma_foreign` (`fk_id_turma`),
  CONSTRAINT `estudante_fk_id_turma_foreign` FOREIGN KEY (`fk_id_turma`) REFERENCES `turma` (`id_turma`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudante`
--

LOCK TABLES `estudante` WRITE;
/*!40000 ALTER TABLE `estudante` DISABLE KEYS */;
INSERT INTO `estudante` VALUES (1,'Aluanan Angel de Sousa','aluanan.sousa@aluno.senai.br','11900000001','2025-01-01 11:00:00',1,1,1),(2,'Ana Carolina de Oliveira Monteiro','ana.monteiro@aluno.senai.br','11900000002','2025-01-01 11:00:00',1,2,1),(3,'Anna Vitória Martins Ramos','anna.ramos@aluno.senai.br','11900000003','2025-01-01 11:00:00',1,3,2),(4,'Arthur Cintra de Lacerda','arthur.lacerda@aluno.senai.br','11900000004','2025-01-01 11:00:00',1,4,1),(5,'Arthur Cintra Faleiros','arthur.faleiros@aluno.senai.br','11900000005','2025-01-01 11:00:00',1,5,2),(6,'Arthur Marques Santos','arthur.santos@aluno.senai.br','11900000006','2025-01-01 11:00:00',1,6,1),(7,'Bryan Miguel Moreira','bryan.moreira@aluno.senai.br','11900000007','2025-01-01 11:00:00',1,7,1),(8,'Davi Azevedo Gonçalves','davi.goncalves@aluno.senai.br','11900000008','2025-01-01 11:00:00',1,8,1),(9,'Eduardo Augusto Tognati','eduardo.tognati@aluno.senai.br','11900000009','2025-01-01 11:00:00',1,9,1),(10,'Flávio Henrique de Souza Filho','flavio.souza@aluno.senai.br','11900000010','2025-01-01 11:00:00',1,10,1),(11,'Gabriel Braz Menezes','gabriel.menezes@aluno.senai.br','11900000011','2025-01-01 11:00:00',1,11,1),(12,'Gabriel Rossi Ventura','gabriel.ventura@aluno.senai.br','11900000012','2025-01-01 11:00:00',1,12,1),(13,'Guilherme Bason Garcia Neves','guilherme.neves@aluno.senai.br','11900000013','2025-01-01 11:00:00',1,13,1),(14,'João Victor Oliveira Silva','joao.silva@aluno.senai.br','11900000014','2025-01-01 11:00:00',1,14,1),(15,'José Victor Faccirolli','jose.faccirolli@aluno.senai.br','11900000015','2025-01-01 11:00:00',1,15,2),(16,'Kauan Borges Plaza','kauan.plaza@aluno.senai.br','11900000016','2025-01-01 11:00:00',1,16,1),(17,'Kauan Henrique Melo Silva','kauan.silva@aluno.senai.br','11900000017','2025-01-01 11:00:00',1,17,1),(18,'Keliyah Cristine de Oliveira Martins','keliyah.martins@aluno.senai.br','11900000018','2025-01-01 11:00:00',1,18,1),(19,'Leonardo Alves da Silva','leonardo.silva@aluno.senai.br','11900000019','2025-01-01 11:00:00',1,19,1),(20,'Luís Pedro França Paulino','luis.paulino@aluno.senai.br','11900000020','2025-01-01 11:00:00',1,20,1),(21,'Luiz Felipe Campos Margato','luiz.margato@aluno.senai.br','11900000021','2025-01-01 11:00:00',1,21,1),(22,'Pedro Galindo Tavares','pedro.tavares@aluno.senai.br','11900000023','2025-01-01 11:00:00',1,23,1),(23,'Rafael Caíres dos Santos','rafael.santos@aluno.senai.br','11900000024','2025-01-01 11:00:00',1,24,1),(24,'Rafael Mendes Neves','rafael.neves@aluno.senai.br','11900000025','2025-01-01 11:00:00',1,25,1),(25,'Renan Vieira Mobrise','renan.mobrise@aluno.senai.br','11900000026','2025-01-01 11:00:00',1,26,1),(26,'Sofia Siqueira Belchior','sofia.belchior@aluno.senai.br','11900000027','2025-01-01 11:00:00',1,27,1),(27,'Sophia de Oliveira Ferreira','sophia.ferreira@aluno.senai.br','11900000028','2025-01-01 11:00:00',1,28,1),(28,'Ulisses Santini Gomes','ulisses.gomes@aluno.senai.br','11900000029','2025-01-01 11:00:00',1,29,2),(29,'Vinicius Soares Peroni','vinicius.peroni@aluno.senai.br','11900000030','2025-01-01 11:00:00',1,30,1),(30,'Antonio','acintra504@gmail.com','11900000031','2025-01-01 11:00:00',0,31,1);
/*!40000 ALTER TABLE `estudante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudantes_ocorrencias`
--

DROP TABLE IF EXISTS `estudantes_ocorrencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudantes_ocorrencias` (
  `id_estudantes_ocorrencias` int unsigned NOT NULL AUTO_INCREMENT,
  `fk_id_ocorrencia` int unsigned NOT NULL,
  `fk_id_estudante` int unsigned NOT NULL,
  PRIMARY KEY (`id_estudantes_ocorrencias`),
  KEY `estudantes_ocorrencias_fk_id_ocorrencia_foreign` (`fk_id_ocorrencia`),
  KEY `estudantes_ocorrencias_fk_id_estudante_foreign` (`fk_id_estudante`),
  CONSTRAINT `estudantes_ocorrencias_fk_id_estudante_foreign` FOREIGN KEY (`fk_id_estudante`) REFERENCES `estudante` (`id_estudante`),
  CONSTRAINT `estudantes_ocorrencias_fk_id_ocorrencia_foreign` FOREIGN KEY (`fk_id_ocorrencia`) REFERENCES `ocorrencia` (`id_ocorrencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudantes_ocorrencias`
--

LOCK TABLES `estudantes_ocorrencias` WRITE;
/*!40000 ALTER TABLE `estudantes_ocorrencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `estudantes_ocorrencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'1_create_docente_table.js',1,'2026-03-16 21:54:57'),(2,'20251106175102_create_docente_table.js',1,'2026-03-16 21:54:57'),(3,'2_create_turma_table.js',1,'2026-03-16 21:54:57'),(4,'3_create_estudante_table.js',1,'2026-03-16 21:54:57'),(5,'4_create_ocorrencia_table.js',1,'2026-03-16 21:54:57'),(6,'5_create_estudantes_ocorrencias_table.js',1,'2026-03-16 21:54:57'),(7,'6_create_log_ocorrencias_table.js',1,'2026-03-16 21:54:57'),(8,'7_create_procedures.js',1,'2026-03-16 21:54:57'),(9,'8_create_views_editarTurma.js',1,'2026-03-16 21:54:57'),(10,'9_create_view_gerenciarTurma.js',1,'2026-03-16 21:54:57');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_ocorrencias`
--

DROP TABLE IF EXISTS `log_ocorrencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_ocorrencias` (
  `id_log_ocorrencia` int unsigned NOT NULL AUTO_INCREMENT,
  `data_log` timestamp NOT NULL,
  `fk_id_ocorrencia` int unsigned NOT NULL,
  `fk_id_docente` int unsigned NOT NULL,
  PRIMARY KEY (`id_log_ocorrencia`),
  KEY `log_ocorrencias_fk_id_ocorrencia_foreign` (`fk_id_ocorrencia`),
  KEY `log_ocorrencias_fk_id_docente_foreign` (`fk_id_docente`),
  CONSTRAINT `log_ocorrencias_fk_id_docente_foreign` FOREIGN KEY (`fk_id_docente`) REFERENCES `docente` (`id_docente`),
  CONSTRAINT `log_ocorrencias_fk_id_ocorrencia_foreign` FOREIGN KEY (`fk_id_ocorrencia`) REFERENCES `ocorrencia` (`id_ocorrencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_ocorrencias`
--

LOCK TABLES `log_ocorrencias` WRITE;
/*!40000 ALTER TABLE `log_ocorrencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_ocorrencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ocorrencia`
--

DROP TABLE IF EXISTS `ocorrencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ocorrencia` (
  `id_ocorrencia` int unsigned NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) NOT NULL,
  `descricao` varchar(150) NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fk_id_estudante` int unsigned NOT NULL,
  PRIMARY KEY (`id_ocorrencia`),
  KEY `ocorrencia_fk_id_estudante_foreign` (`fk_id_estudante`),
  CONSTRAINT `ocorrencia_fk_id_estudante_foreign` FOREIGN KEY (`fk_id_estudante`) REFERENCES `estudante` (`id_estudante`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ocorrencia`
--

LOCK TABLES `ocorrencia` WRITE;
/*!40000 ALTER TABLE `ocorrencia` DISABLE KEYS */;
INSERT INTO `ocorrencia` VALUES (1,'Advertência','Testando trigger 2','2026-03-16 23:23:38',30),(3,'Transferência','Transferido. A nova turma agora possui 29 alunos ativos.','2026-03-16 23:51:44',2),(4,'Transferência','Transferido. A nova turma agora possui 29 alunos ativos.','2026-03-16 23:51:46',2),(5,'Transferência','Transferido. A nova turma agora possui 1 alunos ativos.','2026-03-16 23:53:03',3),(6,'Transferência','Transferido. A nova turma agora possui 2 alunos ativos.','2026-03-16 23:56:59',28),(8,'Transferência','Transferido. A nova turma agora possui 3 alunos ativos.','2026-03-17 00:00:51',5),(9,'Transferência','Transferido. A nova turma agora possui 4 alunos ativos.','2026-03-17 00:09:17',15),(12,'Advertência','Testando trigger 2','2026-03-17 00:16:33',15);
/*!40000 ALTER TABLE `ocorrencia` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_impedir_ocorrencia_aluno_inativo` BEFORE INSERT ON `ocorrencia` FOR EACH ROW BEGIN
    DECLARE v_status TINYINT;

    -- Busca o status atual do estudante que está recebendo a ocorrência
    SELECT status INTO v_status
    FROM estudante
    WHERE id_estudante = NEW.fk_id_estudante;

    -- Se o status for 0 (inativo), aborta a inserção com uma mensagem de erro
    IF v_status = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Operação negada: Não é possível registrar uma nova ocorrência para um estudante inativo.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `turma`
--

DROP TABLE IF EXISTS `turma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turma` (
  `id_turma` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `fk_id_docente` int unsigned NOT NULL,
  PRIMARY KEY (`id_turma`),
  KEY `turma_fk_id_docente_foreign` (`fk_id_docente`),
  CONSTRAINT `turma_fk_id_docente_foreign` FOREIGN KEY (`fk_id_docente`) REFERENCES `docente` (`id_docente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turma`
--

LOCK TABLES `turma` WRITE;
/*!40000 ALTER TABLE `turma` DISABLE KEYS */;
INSERT INTO `turma` VALUES (1,'1C - DS',1),(2,'Eletrônica',1);
/*!40000 ALTER TABLE `turma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_editar_turma`
--

DROP TABLE IF EXISTS `vw_editar_turma`;
/*!50001 DROP VIEW IF EXISTS `vw_editar_turma`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_editar_turma` AS SELECT 
 1 AS `nome_aluno`,
 1 AS `nome_turma`,
 1 AS `numero_chamada`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_gerenciar_turmas`
--

DROP TABLE IF EXISTS `vw_gerenciar_turmas`;
/*!50001 DROP VIEW IF EXISTS `vw_gerenciar_turmas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_gerenciar_turmas` AS SELECT 
 1 AS `nome_turma`,
 1 AS `nome_docente`,
 1 AS `id_docente`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'carometro'
--

--
-- Dumping routines for database 'carometro'
--
/*!50003 DROP PROCEDURE IF EXISTS `criarOcorrencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `criarOcorrencia`(
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `transferirComLogDeLotacao` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `transferirComLogDeLotacao`(
    IN p_id_estudante INT,
    IN p_id_nova_turma INT
)
BEGIN 
    DECLARE v_total_alunos INT;
    DECLARE erro_secundario TINYINT DEFAULT 0;

    -- Se der erro em algum INSERT ou SELECT, muda a variável para 1 e não trava o banco
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
    BEGIN
        SET erro_secundario = 1;
    END;
    
    START TRANSACTION;

    UPDATE estudante, numero_aluno
    SET fk_id_turma = p_id_nova_turma
    WHERE id_estudante = p_id_estudante;

    -- Salvando o Update
    SAVEPOINT sp_aluno_transferido;

    -- COUNT para saber o novo tamanho da turma 
    SELECT COUNT(id_estudante) INTO v_total_alunos
    FROM estudante
    WHERE fk_id_turma = p_id_nova_turma AND status = 1;

    INSERT INTO ocorrencia (tipo, descricao, data_criacao, fk_id_estudante)
    VALUES (
        'Transferência', 
        CONCAT('Transferido. A nova turma agora possui ', v_total_alunos, ' alunos ativos.'), 
        NOW(), 
        p_id_estudante
    );

    -- Se o SELECT COUNT ou o INSERT falharem (erro de sintaxe)
    IF erro_secundario = 1 THEN
        -- Desfaz a contagem e o log, mas MANTÉM a transferência de turma
        ROLLBACK TO sp_aluno_transferido;
    END IF;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vw_editar_turma`
--

/*!50001 DROP VIEW IF EXISTS `vw_editar_turma`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_editar_turma` AS select `e`.`nome` AS `nome_aluno`,`t`.`nome` AS `nome_turma`,`e`.`numero_aluno` AS `numero_chamada`,`e`.`status` AS `status` from (`estudante` `e` join `turma` `t` on((`t`.`id_turma` = `e`.`fk_id_turma`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_gerenciar_turmas`
--

/*!50001 DROP VIEW IF EXISTS `vw_gerenciar_turmas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_gerenciar_turmas` AS select `t`.`nome` AS `nome_turma`,`d`.`nome` AS `nome_docente`,`d`.`id_docente` AS `id_docente` from (`turma` `t` join `docente` `d` on((`d`.`id_docente` = `t`.`fk_id_docente`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-16 21:19:44
