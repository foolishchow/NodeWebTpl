/*
Navicat MySQL Data Transfer

Source Server         : ls
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2015-10-16 18:07:22
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `td_m_resource`
-- ----------------------------
DROP TABLE IF EXISTS `td_m_resource`;
CREATE TABLE `td_m_resource` (
  `id` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `token` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of td_m_resource
-- ----------------------------
INSERT INTO `td_m_resource` VALUES ('1', '1', '1');
INSERT INTO `td_m_resource` VALUES ('2', '2', '2');
INSERT INTO `td_m_resource` VALUES ('3', '3', '3');
INSERT INTO `td_m_resource` VALUES ('4', '4', '4');
INSERT INTO `td_m_resource` VALUES ('5', '5', '5');
