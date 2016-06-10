-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2016 at 02:43 PM
-- Server version: 5.6.28-log
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mobile_money_configurations`
--
CREATE DATABASE IF NOT EXISTS `mobile_money_configurations`;
USE  `mobile_money_configurations`;
-- --------------------------------------------------------

--
-- Table structure for table `configurations`
--

CREATE TABLE IF NOT EXISTS `configurations` (
  `id` int(11) NOT NULL,
  `id_api` int(11) NOT NULL,
  `region/country` varchar(255) DEFAULT NULL,
  `name_of_api` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table of mobile money APIs';

-- --------------------------------------------------------

--
-- Table structure for table `mobile_money_apis`
--

CREATE TABLE IF NOT EXISTS `mobile_money_apis` (
  `id` int(11) NOT NULL,
  `name_of_api` varchar(255) NOT NULL,
  `url` int(11) NOT NULL,
  `parameters` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `configurations`
--
ALTER TABLE `configurations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mobile_money_apis`
--
ALTER TABLE `mobile_money_apis`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `configurations`
--
ALTER TABLE `configurations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `mobile_money_apis`
--
ALTER TABLE `mobile_money_apis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
