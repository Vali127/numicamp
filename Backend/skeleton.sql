/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.5-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: numicamp
-- ------------------------------------------------------
-- Server version	11.8.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `abonner`
--

DROP TABLE IF EXISTS `abonner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `abonner` (
  `id_profil_pers` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_profil_org` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `unique_abonnement` (`id_profil_pers`,`id_profil_org`),
  KEY `fk_abonner_organisation` (`id_profil_org`),
  CONSTRAINT `fk_abonner_organisation` FOREIGN KEY (`id_profil_org`) REFERENCES `organisation` (`id_profil`) ON DELETE CASCADE,
  CONSTRAINT `fk_abonner_personne` FOREIGN KEY (`id_profil_pers`) REFERENCES `personne` (`id_profil`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `collaborer`
--

DROP TABLE IF EXISTS `collaborer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `collaborer` (
  `id_org_collabore` varchar(15) NOT NULL,
  `id_org_collaborateur` varchar(15) NOT NULL,
  KEY `id_org_collabore` (`id_org_collabore`),
  KEY `id_org_collaborateur` (`id_org_collaborateur`),
  CONSTRAINT `collaborer_ibfk_1` FOREIGN KEY (`id_org_collabore`) REFERENCES `organisation` (`id_profil`),
  CONSTRAINT `collaborer_ibfk_2` FOREIGN KEY (`id_org_collaborateur`) REFERENCES `organisation` (`id_profil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `commenter`
--

DROP TABLE IF EXISTS `commenter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `commenter` (
  `id_pub` varchar(16) NOT NULL,
  `id_profil` varchar(15) NOT NULL,
  `contenue` text DEFAULT NULL,
  `date_creation_com` timestamp NOT NULL DEFAULT current_timestamp(),
  KEY `id_pub` (`id_pub`),
  KEY `id_profil` (`id_profil`),
  CONSTRAINT `commenter_ibfk_1` FOREIGN KEY (`id_pub`) REFERENCES `publication` (`id_pub`) ON DELETE CASCADE,
  CONSTRAINT `commenter_ibfk_2` FOREIGN KEY (`id_profil`) REFERENCES `personne` (`id_profil`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comprendre`
--

DROP TABLE IF EXISTS `comprendre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `comprendre` (
  `id_pub` varchar(16) NOT NULL,
  `id_mot_cle` varchar(16) NOT NULL,
  KEY `id_pub` (`id_pub`),
  KEY `id_mot_cle` (`id_mot_cle`),
  CONSTRAINT `comprendre_ibfk_1` FOREIGN KEY (`id_pub`) REFERENCES `publication` (`id_pub`) ON DELETE CASCADE,
  CONSTRAINT `comprendre_ibfk_2` FOREIGN KEY (`id_mot_cle`) REFERENCES `mot_cle` (`id_mot_cle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `concerner`
--

DROP TABLE IF EXISTS `concerner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `concerner` (
  `id_domaine` varchar(16) NOT NULL,
  `id_pub` varchar(16) NOT NULL,
  KEY `id_domaine` (`id_domaine`),
  KEY `id_pub` (`id_pub`),
  CONSTRAINT `concerner_ibfk_1` FOREIGN KEY (`id_domaine`) REFERENCES `domaine` (`id_domaine`),
  CONSTRAINT `concerner_ibfk_2` FOREIGN KEY (`id_pub`) REFERENCES `publication` (`id_pub`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contacter`
--

DROP TABLE IF EXISTS `contacter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacter` (
  `id_profil_pers` varchar(15) NOT NULL,
  `id_profil_org` varchar(15) NOT NULL,
  KEY `id_profil_pers` (`id_profil_pers`),
  KEY `id_profil_org` (`id_profil_org`),
  CONSTRAINT `contacter_ibfk_1` FOREIGN KEY (`id_profil_pers`) REFERENCES `organisation` (`id_profil`),
  CONSTRAINT `contacter_ibfk_2` FOREIGN KEY (`id_profil_org`) REFERENCES `personne` (`id_profil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `domaine`
--

DROP TABLE IF EXISTS `domaine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `domaine` (
  `id_domaine` varchar(16) NOT NULL,
  `design_domaine` varchar(50) NOT NULL,
  PRIMARY KEY (`id_domaine`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_domaine` BEFORE INSERT ON `domaine` FOR EACH ROW BEGIN   SET NEW.id_domaine = CONCAT('DOM-',LEFT(REPLACE(UUID(),'-',''),12)); END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

--
-- Table structure for table `etablissement`
--

DROP TABLE IF EXISTS `etablissement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `etablissement` (
  `code_etab` char(15) NOT NULL,
  `nom_etab` varchar(100) NOT NULL,
  `description_etab` text DEFAULT NULL,
  `province` varchar(50) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `quartier` varchar(50) DEFAULT NULL,
  `photo_etab` varchar(100) DEFAULT NULL,
  `site_etablissement` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code_etab`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_etab` BEFORE INSERT ON `etablissement` FOR EACH ROW BEGIN SET NEW.code_etab = CONCAT('ET-',LEFT(REPLACE(UUID(),'-',''),12)); END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id_feedback` int(11) NOT NULL AUTO_INCREMENT,
  `id_profil_pers` varchar(15) DEFAULT NULL,
  `id_profil_org` varchar(15) DEFAULT NULL,
  `contenu` varchar(500) NOT NULL,
  `dateEnvoie` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_feedback`),
  KEY `id_profil_pers` (`id_profil_pers`),
  KEY `id_profil_org` (`id_profil_org`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`id_profil_pers`) REFERENCES `personne` (`id_profil`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`id_profil_org`) REFERENCES `organisation` (`id_profil`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id_image` varchar(16) NOT NULL,
  `nom_image` varchar(32) NOT NULL,
  `contenue_image` blob NOT NULL,
  `id_pub` varchar(16) NOT NULL,
  PRIMARY KEY (`id_image`),
  KEY `fk_pub_img` (`id_pub`),
  CONSTRAINT `fk_pub_img` FOREIGN KEY (`id_pub`) REFERENCES `publication` (`id_pub`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_image` BEFORE INSERT ON `image` FOR EACH ROW BEGIN
  SET NEW.id_image = CONCAT('IMG-',LEFT(REPLACE(UUID(),'-',''),12));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

--
-- Table structure for table `interesser`
--

DROP TABLE IF EXISTS `interesser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `interesser` (
  `id_interet` varchar(16) NOT NULL,
  `id_profil` varchar(15) NOT NULL,
  KEY `id_interet` (`id_interet`),
  KEY `id_profil` (`id_profil`),
  CONSTRAINT `interesser_ibfk_1` FOREIGN KEY (`id_interet`) REFERENCES `interet` (`id_interet`),
  CONSTRAINT `interesser_ibfk_2` FOREIGN KEY (`id_profil`) REFERENCES `personne` (`id_profil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `interet`
--

DROP TABLE IF EXISTS `interet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `interet` (
  `id_interet` varchar(16) NOT NULL,
  `design_interet` varchar(50) NOT NULL,
  `description_interet` text DEFAULT NULL,
  PRIMARY KEY (`id_interet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_interet` BEFORE INSERT ON `interet` FOR EACH ROW BEGIN
  SET NEW.id_interet = CONCAT('INT-',LEFT(REPLACE(UUID(),'-',''),12));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

--
-- Table structure for table `mot_cle`
--

DROP TABLE IF EXISTS `mot_cle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mot_cle` (
  `id_mot_cle` varchar(16) NOT NULL,
  `mot_cle` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_mot_cle`),
  KEY `idx_mot_cle` (`mot_cle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_mot_cle` BEFORE INSERT ON `mot_cle` FOR EACH ROW BEGIN
  SET NEW.id_mot_cle = CONCAT('MCL-', LEFT(REPLACE(UUID(), '-', ''), 12));
  SET @last_mot_cle := NEW.id_mot_cle;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

--
-- Table structure for table `organisation`
--

DROP TABLE IF EXISTS `organisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `organisation` (
  `id_profil` varchar(15) NOT NULL,
  `nom_organisation` varchar(50) NOT NULL,
  `date_creation` date NOT NULL,
  `localisation` varchar(32) DEFAULT NULL,
  `nom_profil` varchar(50) NOT NULL,
  `description_profil` varchar(255) DEFAULT NULL,
  `etat_profil` enum('normal','restreint','bloque') DEFAULT 'normal',
  `mot_de_passe` varchar(255) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `id_role` varchar(11) DEFAULT NULL,
  `photo_profil` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id_profil`),
  KEY `idx_org` (`id_profil`),
  KEY `idx_profil2` (`nom_profil`),
  KEY `fk_organisation_role` (`id_role`),
  CONSTRAINT `fk_organisation_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`),
  CONSTRAINT `chk_mdp_longueur2` CHECK (char_length(`mot_de_passe`) >= 8)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_organisation` BEFORE INSERT ON `organisation` FOR EACH ROW BEGIN
  SET NEW.id_profil = CONCAT('PF-', LEFT(REPLACE(UUID(),'-',''),12));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

--
-- Table structure for table `orienter_org`
--

DROP TABLE IF EXISTS `orienter_org`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orienter_org` (
  `id_profil` varchar(15) NOT NULL,
  `id_domaine` varchar(16) NOT NULL,
  PRIMARY KEY (`id_profil`,`id_domaine`),
  KEY `id_domaine` (`id_domaine`),
  CONSTRAINT `orienter_org_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `organisation` (`id_profil`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orienter_org_ibfk_2` FOREIGN KEY (`id_domaine`) REFERENCES `domaine` (`id_domaine`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orienter_pers`
--

DROP TABLE IF EXISTS `orienter_pers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orienter_pers` (
  `id_profil` varchar(15) NOT NULL,
  `id_domaine` varchar(16) NOT NULL,
  PRIMARY KEY (`id_profil`,`id_domaine`),
  KEY `id_domaine` (`id_domaine`),
  CONSTRAINT `orienter_pers_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `personne` (`id_profil`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orienter_pers_ibfk_2` FOREIGN KEY (`id_domaine`) REFERENCES `domaine` (`id_domaine`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personne`
--

DROP TABLE IF EXISTS `personne`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `personne` (
  `id_profil` varchar(15) NOT NULL,
  `nom_personne` varchar(40) NOT NULL,
  `prenom_personne` varchar(40) NOT NULL,
  `datenais` date NOT NULL,
  `sexe` enum('F','M') NOT NULL,
  `localisation` varchar(32) DEFAULT NULL,
  `nom_profil` varchar(50) NOT NULL,
  `description_profil` varchar(255) DEFAULT NULL,
  `etat_profil` enum('normal','restreint','bloque') DEFAULT 'normal',
  `mot_de_passe` varchar(255) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `id_role` varchar(11) DEFAULT 'simple-user',
  `photo_profil` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id_profil`),
  KEY `fk_role_pers` (`id_role`),
  KEY `idx_pers` (`id_profil`),
  KEY `idx_profil1` (`nom_profil`),
  CONSTRAINT `fk_role_pers` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`) ON DELETE CASCADE,
  CONSTRAINT `chk_mdp_longueur` CHECK (char_length(`mot_de_passe`) >= 8)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_personne` BEFORE INSERT ON `personne` FOR EACH ROW BEGIN  SET NEW.id_profil = CONCAT('PF-',LEFT(REPLACE(UUID(),'-',''),12)); END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

--
-- Table structure for table `posseder`
--

DROP TABLE IF EXISTS `posseder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `posseder` (
  `id_domaine` varchar(16) NOT NULL,
  `lien` varchar(255) NOT NULL,
  KEY `id_domaine` (`id_domaine`),
  KEY `lien` (`lien`),
  CONSTRAINT `posseder_ibfk_1` FOREIGN KEY (`id_domaine`) REFERENCES `domaine` (`id_domaine`),
  CONSTRAINT `posseder_ibfk_2` FOREIGN KEY (`lien`) REFERENCES `ressource` (`lien`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `posseder_2`
--

DROP TABLE IF EXISTS `posseder_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `posseder_2` (
  `id_domaine` varchar(16) NOT NULL,
  `lien` varchar(255) NOT NULL,
  KEY `id_domaine` (`id_domaine`),
  KEY `posseder_2_ibfk_2` (`lien`),
  CONSTRAINT `posseder_2_ibfk_1` FOREIGN KEY (`id_domaine`) REFERENCES `domaine` (`id_domaine`),
  CONSTRAINT `posseder_2_ibfk_2` FOREIGN KEY (`lien`) REFERENCES `ressource_2` (`lien`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `publication` (
  `id_pub` varchar(16) NOT NULL,
  `titre_pub` varchar(100) NOT NULL,
  `description_pub` text DEFAULT NULL,
  `photo_pub` varchar(255) DEFAULT NULL,
  `date_pub` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_expiration` date DEFAULT NULL,
  `id_profil_pers` varchar(15) DEFAULT NULL,
  `id_profil_org` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_pub`),
  KEY `idx_pub1` (`id_profil_pers`),
  KEY `idx_pub2` (`id_profil_org`),
  CONSTRAINT `fk_pub_org` FOREIGN KEY (`id_profil_org`) REFERENCES `organisation` (`id_profil`) ON DELETE CASCADE,
  CONSTRAINT `fk_pub_pers` FOREIGN KEY (`id_profil_pers`) REFERENCES `personne` (`id_profil`) ON DELETE CASCADE,
  CONSTRAINT `chk_one_owner` CHECK (`id_profil_pers` is null and `id_profil_org` is not null or `id_profil_pers` is not null and `id_profil_org` is null)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_publication` BEFORE INSERT ON `publication` FOR EACH ROW BEGIN
  SET NEW.id_pub = CONCAT('PUB-', LEFT(REPLACE(UUID(), '-', ''), 12));
  SET @last_id_pub := NEW.id_pub;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `set_date_expiration_before_insert` BEFORE INSERT ON `publication` FOR EACH ROW BEGIN
  IF NEW.date_expiration IS NULL THEN
    SET NEW.date_expiration = DATE_ADD(NOW(), INTERVAL 30 DAY);
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `numicamp` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

--
-- Table structure for table `ressource`
--

DROP TABLE IF EXISTS `ressource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ressource` (
  `lien` varchar(255) NOT NULL,
  `design_res` varchar(50) NOT NULL,
  `description_res` text DEFAULT NULL,
  PRIMARY KEY (`lien`),
  KEY `idx_res` (`lien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ressource_2`
--

DROP TABLE IF EXISTS `ressource_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ressource_2` (
  `lien` varchar(255) NOT NULL,
  `design_res` varchar(50) NOT NULL,
  `description_res` text DEFAULT NULL,
  PRIMARY KEY (`lien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id_role` varchar(11) NOT NULL,
  `description_role` text DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-02-21 17:57:17
