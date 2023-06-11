-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: ssvm
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) DEFAULT NULL,
  `quantity` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `total` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `reference` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (34,'Ballpen','3','15','45','5/29/2023 2:56:24','0DHJ2229120001112'),(35,'Marker','4','18','72','5/29/2023 2:56:24','0DHJ2229120001112'),(36,'Ballpen','3','15','45','5/29/2023 3:8:52','0DHJ2229120001112'),(37,'Marker','3','18','54','5/29/2023 3:8:52','0DHJ2229120001112'),(38,'Ballpen','1','15','15','5/29/2023 4:16:47','0DHJ2229120001112'),(39,'Marker','1','18','18','5/29/2023 4:16:58','0DHJ2229120001112'),(40,'Ballpen','1','15','15','5/29/2023 4:17:3','0DHJ2229120001112'),(41,'Ballpen','2','15','30','5/29/2023 4:44:30','0DHJ2229120001112'),(42,'Ballpen','2','15','30','5/29/2023 4:44:45','0DHJ2229120001112'),(43,'Marker','2','18','36','5/29/2023 4:44:45','0DHJ2229120001112'),(44,'Ballpen','2','15','30','5/29/2023 4:44:45','0DHJ2229120001112'),(45,'Ballpen','4','15','60','5/30/2023 5:17:29','0DHJ2229120001112'),(46,'Marker','5','18','90','5/30/2023 5:17:29','0DHJ2229120001112'),(47,'Ballpen','1','15','15','6/5/2023 17:42:43','0DHJ2229120001112');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,'Ballpen','15','Ballpen.png','0'),(2,'Marker','18','Marker.png','2');
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05 17:44:40
