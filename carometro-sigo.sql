CREATE DATABASE  IF NOT EXISTS `sigo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sigo`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: sigo
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
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `id_class` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `fk_id_instructor` int unsigned NOT NULL,
  PRIMARY KEY (`id_class`),
  KEY `class_fk_id_instructor_foreign` (`fk_id_instructor`),
  CONSTRAINT `class_fk_id_instructor_foreign` FOREIGN KEY (`fk_id_instructor`) REFERENCES `instructor` (`id_instructor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'1C - DS',1),(2,'Eletrônica',1);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `id_instructor` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` enum('adm','inst') DEFAULT 'inst',
  PRIMARY KEY (`id_instructor`),
  UNIQUE KEY `instructor_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (1,'Euller Ferreira','euller@gmail.com','123456','adm'),(2,'Adriano Donisete','adriano@gmail.com','123456','adm');
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'01_create_instructor_table.js',1,'2026-03-18 00:46:22'),(2,'02_create_class_table.js',1,'2026-03-18 00:46:22'),(3,'03_create_student_table.js',1,'2026-03-18 00:46:22'),(4,'04_create_occurrence_table.js',1,'2026-03-18 00:46:22'),(5,'05_create_students_occurrence_table.js',1,'2026-03-18 00:46:22'),(6,'06_create_occurrence_log_table.js',1,'2026-03-18 00:46:23'),(7,'07_create_procedure_createOccurrence.js',1,'2026-03-18 00:46:23'),(8,'08_create_views_editClassPage.js',1,'2026-03-18 00:46:23'),(9,'09_create_view_readClassInstructor.js',1,'2026-03-18 00:46:23'),(10,'10_procedure_Transfer_Capacity_Log.js',1,'2026-03-18 00:46:23'),(11,'11_trg_prevent_inactive_student_occurrence.js',1,'2026-03-18 00:46:23'),(12,'20251106175102_create_docente_table.js',1,'2026-03-18 00:46:23');
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
-- Table structure for table `occurrence`
--

DROP TABLE IF EXISTS `occurrence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `occurrence` (
  `id_occurrence` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `description` varchar(150) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fk_id_student` int unsigned NOT NULL,
  PRIMARY KEY (`id_occurrence`),
  KEY `occurrence_fk_id_student_foreign` (`fk_id_student`),
  CONSTRAINT `occurrence_fk_id_student_foreign` FOREIGN KEY (`fk_id_student`) REFERENCES `student` (`id_student`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `occurrence`
--

LOCK TABLES `occurrence` WRITE;
/*!40000 ALTER TABLE `occurrence` DISABLE KEYS */;
/*!40000 ALTER TABLE `occurrence` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_prevent_inactive_student_occurrence` BEFORE INSERT ON `occurrence` FOR EACH ROW BEGIN
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
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `occurrence_log`
--

DROP TABLE IF EXISTS `occurrence_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `occurrence_log` (
  `id_occurrence_log` int unsigned NOT NULL AUTO_INCREMENT,
  `log_date` timestamp NOT NULL,
  `fk_id_occurrence` int unsigned NOT NULL,
  `fk_id_instructor` int unsigned NOT NULL,
  PRIMARY KEY (`id_occurrence_log`),
  KEY `occurrence_log_fk_id_occurrence_foreign` (`fk_id_occurrence`),
  KEY `occurrence_log_fk_id_instructor_foreign` (`fk_id_instructor`),
  CONSTRAINT `occurrence_log_fk_id_instructor_foreign` FOREIGN KEY (`fk_id_instructor`) REFERENCES `instructor` (`id_instructor`),
  CONSTRAINT `occurrence_log_fk_id_occurrence_foreign` FOREIGN KEY (`fk_id_occurrence`) REFERENCES `occurrence` (`id_occurrence`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `occurrence_log`
--

LOCK TABLES `occurrence_log` WRITE;
/*!40000 ALTER TABLE `occurrence_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `occurrence_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id_student` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `student_number` int NOT NULL,
  `fk_id_class` int unsigned NOT NULL,
  PRIMARY KEY (`id_student`),
  UNIQUE KEY `student_email_unique` (`email`),
  KEY `student_fk_id_class_foreign` (`fk_id_class`),
  CONSTRAINT `student_fk_id_class_foreign` FOREIGN KEY (`fk_id_class`) REFERENCES `class` (`id_class`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Aluanan Angel de Sousa','aluanan.sousa@aluno.senai.br','11900000001','2025-01-01 11:00:00',1,1,1),(2,'Ana Carolina de Oliveira Monteiro','ana.monteiro@aluno.senai.br','11900000002','2025-01-01 11:00:00',1,2,1),(3,'Anna Vitória Martins Ramos','anna.ramos@aluno.senai.br','11900000003','2025-01-01 11:00:00',1,3,1),(4,'Arthur Cintra de Lacerda','arthur.lacerda@aluno.senai.br','11900000004','2025-01-01 11:00:00',1,4,1),(5,'Arthur Cintra Faleiros','arthur.faleiros@aluno.senai.br','11900000005','2025-01-01 11:00:00',1,5,1),(6,'Arthur Marques Santos','arthur.santos@aluno.senai.br','11900000006','2025-01-01 11:00:00',1,6,1),(7,'Bryan Miguel Moreira','bryan.moreira@aluno.senai.br','11900000007','2025-01-01 11:00:00',1,7,1),(8,'Davi Azevedo Gonçalves','davi.goncalves@aluno.senai.br','11900000008','2025-01-01 11:00:00',1,8,1),(9,'Eduardo Augusto Tognati','eduardo.tognati@aluno.senai.br','11900000009','2025-01-01 11:00:00',1,9,1),(10,'Flávio Henrique de Souza Filho','flavio.souza@aluno.senai.br','11900000010','2025-01-01 11:00:00',1,10,1),(11,'Gabriel Braz Menezes','gabriel.menezes@aluno.senai.br','11900000011','2025-01-01 11:00:00',1,11,1),(12,'Gabriel Rossi Ventura','gabriel.ventura@aluno.senai.br','11900000012','2025-01-01 11:00:00',1,12,1),(13,'Guilherme Bason Garcia Neves','guilherme.neves@aluno.senai.br','11900000013','2025-01-01 11:00:00',1,13,1),(14,'João Victor Oliveira Silva','joao.silva@aluno.senai.br','11900000014','2025-01-01 11:00:00',1,14,1),(15,'José Victor Faccirolli','jose.faccirolli@aluno.senai.br','11900000015','2025-01-01 11:00:00',1,15,1),(16,'Kauan Borges Plaza','kauan.plaza@aluno.senai.br','11900000016','2025-01-01 11:00:00',1,16,1),(17,'Kauan Henrique Melo Silva','kauan.silva@aluno.senai.br','11900000017','2025-01-01 11:00:00',1,17,1),(18,'Keliyah Cristine de Oliveira Martins','keliyah.martins@aluno.senai.br','11900000018','2025-01-01 11:00:00',1,18,1),(19,'Leonardo Alves da Silva','leonardo.silva@aluno.senai.br','11900000019','2025-01-01 11:00:00',1,19,1),(20,'Luís Pedro França Paulino','luis.paulino@aluno.senai.br','11900000020','2025-01-01 11:00:00',1,20,1),(21,'Luiz Felipe Campos Margato','luiz.margato@aluno.senai.br','11900000021','2025-01-01 11:00:00',1,21,1),(22,'Pedro Galindo Tavares','pedro.tavares@aluno.senai.br','11900000023','2025-01-01 11:00:00',1,23,1),(23,'Rafael Caíres dos Santos','rafael.santos@aluno.senai.br','11900000024','2025-01-01 11:00:00',1,24,1),(24,'Rafael Mendes Neves','rafael.neves@aluno.senai.br','11900000025','2025-01-01 11:00:00',1,25,1),(25,'Renan Vieira Mobrise','renan.mobrise@aluno.senai.br','11900000026','2025-01-01 11:00:00',1,26,1),(26,'Sofia Siqueira Belchior','sofia.belchior@aluno.senai.br','11900000027','2025-01-01 11:00:00',1,27,1),(27,'Sophia de Oliveira Ferreira','sophia.ferreira@aluno.senai.br','11900000028','2025-01-01 11:00:00',1,28,1),(28,'Ulisses Santini Gomes','ulisses.gomes@aluno.senai.br','11900000029','2025-01-01 11:00:00',1,29,1),(29,'Vinicius Soares Peroni','vinicius.peroni@aluno.senai.br','11900000030','2025-01-01 11:00:00',1,30,1),(30,'Antonio','acintra504@gmail.com','11900000031','2025-01-01 11:00:00',0,31,1);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_occurrence`
--

DROP TABLE IF EXISTS `students_occurrence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students_occurrence` (
  `id_students_occurrence` int unsigned NOT NULL AUTO_INCREMENT,
  `fk_id_occurrence` int unsigned NOT NULL,
  `fk_id_student` int unsigned NOT NULL,
  PRIMARY KEY (`id_students_occurrence`),
  KEY `students_occurrence_fk_id_occurrence_foreign` (`fk_id_occurrence`),
  KEY `students_occurrence_fk_id_student_foreign` (`fk_id_student`),
  CONSTRAINT `students_occurrence_fk_id_occurrence_foreign` FOREIGN KEY (`fk_id_occurrence`) REFERENCES `occurrence` (`id_occurrence`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `students_occurrence_fk_id_student_foreign` FOREIGN KEY (`fk_id_student`) REFERENCES `student` (`id_student`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_occurrence`
--

LOCK TABLES `students_occurrence` WRITE;
/*!40000 ALTER TABLE `students_occurrence` DISABLE KEYS */;
/*!40000 ALTER TABLE `students_occurrence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_editclasspage`
--

DROP TABLE IF EXISTS `vw_editclasspage`;
/*!50001 DROP VIEW IF EXISTS `vw_editclasspage`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_editclasspage` AS SELECT 
 1 AS `name_student`,
 1 AS `name_class`,
 1 AS `attendance_number`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_readclassinstructor`
--

DROP TABLE IF EXISTS `vw_readclassinstructor`;
/*!50001 DROP VIEW IF EXISTS `vw_readclassinstructor`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_readclassinstructor` AS SELECT 
 1 AS `name_class`,
 1 AS `name_instructor`,
 1 AS `id_instructor`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'sigo'
--

--
-- Dumping routines for database 'sigo'
--
/*!50003 DROP PROCEDURE IF EXISTS `createOccurrence` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createOccurrence`(
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
    INSERT INTO occurrence_log (log_date, fk_id_occurrence, fk_id_instructor)
    VALUES (NOW(), new_occurrence_id, p_id_instructor);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Transfer_Capacity_Log` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Transfer_Capacity_Log`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vw_editclasspage`
--

/*!50001 DROP VIEW IF EXISTS `vw_editclasspage`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_editclasspage` AS select `s`.`name` AS `name_student`,`c`.`name` AS `name_class`,`s`.`student_number` AS `attendance_number`,`s`.`status` AS `status` from (`student` `s` join `class` `c` on((`c`.`id_class` = `s`.`fk_id_class`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_readclassinstructor`
--

/*!50001 DROP VIEW IF EXISTS `vw_readclassinstructor`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_readclassinstructor` AS select `c`.`name` AS `name_class`,`i`.`name` AS `name_instructor`,`i`.`id_instructor` AS `id_instructor` from (`class` `c` join `instructor` `i` on((`i`.`id_instructor` = `c`.`fk_id_instructor`))) */;
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

-- Dump completed on 2026-03-17 21:46:57
