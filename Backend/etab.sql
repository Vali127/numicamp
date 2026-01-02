-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: numycamp
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `etablissement`
--

DROP TABLE IF EXISTS `etablissement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etablissement` (
  `code_etab` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom_etab` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_etab` text COLLATE utf8mb4_unicode_ci,
  `province` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ville` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quartier` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo_etab` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_etablissement` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`code_etab`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etablissement`
--

LOCK TABLES `etablissement` WRITE;
/*!40000 ALTER TABLE `etablissement` DISABLE KEYS */;
INSERT INTO `etablissement` VALUES ('ET-bbdba99cd90b','École 42 Antananarivo','Campus de la 42 School, école informatique innovante basée sur l’apprentissage par projets et la pratique intensive.','Analamanga','Antananarivo',NULL,NULL,'https://42antananarivo.mg'),('ET-bbdbb23bd90b','École de Management et d’Innovation Technologique (EMIT)','Grande école publique spécialisée en ingénierie, management et technologies numériques.','Haute Matsiatra','Fianarantsoa','Andrainjato',NULL,'https://emit.mg'),('ET-bbe01115d90b','École Nationale d’Informatique (ENI)','École nationale de référence en informatique, rattachée à l’Université de Fianarantsoa.','Haute Matsiatra','Fianarantsoa','Tanambao',NULL,'https://eni.mg'),('ET-bbe016dad90b','Haute École d’Informatique (HEI) Madagascar','École privée spécialisée en informatique, développement logiciel et systèmes informatiques.','Analamanga','Antananarivo',NULL,NULL,'https://hei.school'),('ET-bbe01961d90b','MISA – Mathématiques, Informatique et Statistique Appliquées','Formation universitaire axée sur l’informatique, la data et les statistiques appliquées.','Analamanga','Antananarivo',NULL,NULL,'https://misa-madagascar.com'),('ET-bbe01ba3d90b','Institut Technologique Universitaire (ITU)','Institut universitaire orienté vers les technologies et la formation technique.','Analamanga','Antananarivo',NULL,NULL,NULL);
/*!40000 ALTER TABLE `etablissement` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_etablissement` BEFORE INSERT ON `etablissement` FOR EACH ROW BEGIN
SET NEW.code_etab = CONCAT('ET-',LEFT(REPLACE(UUID(),'-',''),12));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-20 14:43:18
