CREATE DATABASE  IF NOT EXISTS `cadastroativsustentavel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `cadastroativsustentavel`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: cadastroativsustentavel
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `cadtipoativsust`
--

DROP TABLE IF EXISTS `cadtipoativsust`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadtipoativsust` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadtipoativsust`
--

LOCK TABLES `cadtipoativsust` WRITE;
/*!40000 ALTER TABLE `cadtipoativsust` DISABLE KEYS */;
INSERT INTO `cadtipoativsust` VALUES (1,'Evento cultural para levantamento de recursos'),(2,'Programa de medição para preservação de mata siliar'),(45,'Campanhas de reflorestamento e plantio de árvores em áreas urbanas e rurais'),(46,'Programas de coleta de materiais recicláveis como papel, plástico, vidro e metal'),(47,'Pontos de coleta para o descarte seguro de equipamentos eletrônicos'),(48,'Desenvolvimento de hortas urbanas e comunitárias para promover a agricultura local'),(49,'Sistemas de produção que integram árvores, cultivos agrícolas e pecuária de forma sustentável'),(50,'Desenvolvimento de infraestrutura para ciclistas'),(51,'Incentivo para a implementação de práticas ambientais em instituições de ensino'),(52,'Sessões educativas sobre práticas sustentáveis e proteção ambiental'),(53,'Utilização de resíduos orgânicos para a produção de biogás'),(54,'Incentivo para a implementação de práticas ambientais em escolas'),(60,'Teste Teste Teste Teste Teste Teste Teste Teste Teste kkkkkkkkk');
/*!40000 ALTER TABLE `cadtipoativsust` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-21 10:24:55
