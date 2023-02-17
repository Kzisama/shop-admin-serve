-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: shop-admin
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `category_table`
--

DROP TABLE IF EXISTS `category_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_table` (
  `categoryID` int NOT NULL AUTO_INCREMENT COMMENT '种类ID',
  `name` varchar(255) NOT NULL COMMENT '种类名称',
  `status` int NOT NULL DEFAULT '0' COMMENT '0表示存在，1表示已下架',
  PRIMARY KEY (`categoryID`),
  UNIQUE KEY `categoryID_UNIQUE` (`categoryID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品种类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_table`
--

LOCK TABLES `category_table` WRITE;
/*!40000 ALTER TABLE `category_table` DISABLE KEYS */;
INSERT INTO `category_table` VALUES (1,'食品',0),(2,'服装',0),(3,'文具',0),(4,'通讯',1);
/*!40000 ALTER TABLE `category_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_table`
--

DROP TABLE IF EXISTS `notice_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_table` (
  `noticeID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `pubtime` varchar(255) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '0' COMMENT '通知状态 0表示存在 1表示删除',
  PRIMARY KEY (`noticeID`),
  UNIQUE KEY `noticeID_UNIQUE` (`noticeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_table`
--

LOCK TABLES `notice_table` WRITE;
/*!40000 ALTER TABLE `notice_table` DISABLE KEYS */;
INSERT INTO `notice_table` VALUES (1,'test1','notice content 1','2023-02-11 11:48:06.680','admin',0),(2,'开学','2.18开学返校','2023-02-13 10:34:09.649','admin',0);
/*!40000 ALTER TABLE `notice_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_table`
--

DROP TABLE IF EXISTS `role_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `character` varchar(255) NOT NULL COMMENT '职位',
  `describe` varchar(255) NOT NULL,
  `roles` varchar(255) DEFAULT NULL COMMENT '对应权限',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `character_UNIQUE` (`character`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_table`
--

LOCK TABLES `role_table` WRITE;
/*!40000 ALTER TABLE `role_table` DISABLE KEYS */;
INSERT INTO `role_table` VALUES (1,'超级管理员','拥有最高权限','[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]'),(2,'管理员','拥有对下级的操作权限','[1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,20,21]'),(3,'销售','负责商品售卖','[1,2,7,8,11,12,13,14,16,17,18,20,21]'),(4,'店主','负责店铺所有事物','[1,2,7,8,9,10,17,18,20,21]'),(5,'测试','测试接口1','[1,2,17,18,20,21]');
/*!40000 ALTER TABLE `role_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route_table`
--

DROP TABLE IF EXISTS `route_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route_table` (
  `routeID` int NOT NULL AUTO_INCREMENT COMMENT '路由ID',
  `pid` int NOT NULL COMMENT '父路由ID',
  `path` varchar(255) NOT NULL COMMENT 'path路径（一级:/one  二级: two）',
  `name` varchar(255) NOT NULL COMMENT '路由名称',
  `title` varchar(255) NOT NULL COMMENT 'mtea中的title属性',
  `link` varchar(255) DEFAULT NULL COMMENT '完整路径',
  `icon` varchar(25) NOT NULL COMMENT '图标',
  `pname` varchar(255) NOT NULL COMMENT '所属路由',
  PRIMARY KEY (`routeID`),
  UNIQUE KEY `route_table_un` (`path`,`name`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='路由表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_table`
--

LOCK TABLES `route_table` WRITE;
/*!40000 ALTER TABLE `route_table` DISABLE KEYS */;
INSERT INTO `route_table` VALUES (1,0,'/','Home','后台面板',NULL,'Help','Home'),(2,1,'','HomeIndex','主控台','/','HomeFilled','Home'),(3,0,'/user','User','用户',NULL,'User','User'),(4,3,'preview','UserPreview','用户总览','/user/preview','UserFilled','User'),(5,3,'roles','UserRoles','权限分配','/user/roles','Connection','User'),(6,3,'create','UserCreate','新增用户','/user/create','MagicStick','User'),(7,0,'/goods','Goods','店铺',NULL,'ShoppingBag','Goods'),(8,7,'manage','GoodsManage','商品管理','/goods/manage','ShoppingCartFull','Goods'),(9,7,'kind','GoodsKind','商品分类','/goods/kind','Grid','Goods'),(10,7,'discount','GoodsDiscount','商品优惠','/goods/discount','Discount','Goods'),(11,0,'/order','Order','订单',NULL,'MessageBox','Order'),(12,11,'manage','OrderManage','订单管理','/order/manage','Reading','Order'),(13,0,'/delivery','Delivery','派送',NULL,'Van','Delivery'),(14,13,'people','DeliveryPeople','派送人员','/delivery/people','Avatar','Delivery'),(15,13,'price','DeliveryPrice','派送价格','/delivery/price','Coin','Delivery'),(16,13,'preview','DeliveryPreview','订单总览','/delivery/preview','View','Delivery'),(17,0,'/notice','Notice','通知',NULL,'Bell','Notice'),(18,17,'system','NoticeSystem','系统通知','/notice/system','Notification','Notice'),(19,17,'publish','NoticePublish','发布通知','/notice/publish','EditPen','Notice'),(20,0,'/setting','Setting','设置',NULL,'Setting','Setting'),(21,20,'personal','PersonalSetting','个人设置','/setting/personal','Postcard','Setting');
/*!40000 ALTER TABLE `route_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `userID` int NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(45) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `avatar` text COMMENT '用户头像',
  `character` varchar(45) NOT NULL COMMENT '用户角色',
  `createtime` varchar(255) NOT NULL COMMENT '用户创建时间',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '登陆状态 \n\n0  离线\n1  在线',
  `role` varchar(255) NOT NULL COMMENT '能够访问的路由的id',
  `tel` varchar(255) DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `nickname` varchar(255) DEFAULT NULL COMMENT '用户昵称',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (1,'admin','$2a$05$Rpp0Zib6YLFt/osLW0SWeeeIGxcfTPtIioynV0exOH5ywyxYV/EKO','\\avatar\\imgbg10.png','超级管理员','2023-02-04T16:48:31+08:00',1,'[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]','18523942193','qwertyuio@qq.com','超级管理'),(2,'admin1','$2a$05$gROaBS/4xlE2ItJC8foXdO7uGOp0U6j6vieiY20a7NDtgjDU09.Lm',NULL,'管理员','2023-02-08T17:03:40+08:00',0,'[1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,20,21]',NULL,NULL,NULL),(3,'saleman','$2a$05$LCsWyIGTDx0q706S.5KUO.6iWCxttvPoQ4wd4jvaRbC2l0gYc7m7.',NULL,'销售','2023-02-08T17:58:17+08:00',0,'[1,2,7,8,11,12,13,14,16,17,18,20,21]',NULL,NULL,NULL),(4,'saleman2','$2a$05$tkWyC8/3rcC3s80jeThNmuX9MfRxWOFzhA4hHbqR2vHKxge2F2BWG','\\avatar\\imgavatar1.jpg','销售','2023-02-08T20:02:22+08:00',0,'[1,2,7,8,11,12,13,14,16,17,18,20,21]','18539257723','qwertowq@qq.com','无敌暴龙战神123'),(5,'testman1','$2a$05$npr/zMMqQqb3zkiTG5q4TOnd5NERjL3IA2Iu2ZTkZ65k6m2ATBEy2',NULL,'测试','2023-02-14T22:11:11+08:00',1,'[1,2,17,18,20,21]','','',''),(6,'testman2','$2a$05$p98jDP5rtUeIZg8niNI7xuX08opYxT58Tw3hABb88Nz7LL4mmJXcu',NULL,'测试','2023-02-14T22:20:07+08:00',0,'[1,2,17,18,20,21]','','',''),(7,'shopmaster1','$2a$05$WmK/s5Rz87XNKCYSAR5EzOlPFmU30UXipIJ3WfLqlMQRlv1Wif7cK',NULL,'店主','2023-02-14T22:21:55+08:00',1,'[1,2,7,8,9,10,17,18,20,21]','','','');
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 22:36:42
