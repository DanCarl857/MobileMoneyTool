-- phpMyAdmin SQL Dump
-- version 4.6.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 22, 2016 at 01:12 PM
-- Server version: 5.7.14
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mobile_money_application`
--

-- --------------------------------------------------------

--
-- Table structure for table `configurations`
--

CREATE TABLE `configurations` (
  `id` int(11) NOT NULL,
  `region` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `API` varchar(255) NOT NULL,
  `Org_phone` int(15) NOT NULL,
  `Org_id` int(50) NOT NULL,
  `URLs` varchar(255) NOT NULL,
  `Parameters` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_history`
--

CREATE TABLE `transaction_history` (
  `id` int(11) NOT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `staff` varchar(255) DEFAULT 'Head Office',
  `office` varchar(255) NOT NULL DEFAULT 'Head Office',
  `transaction_type` varchar(255) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `recipient` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='table to store transaction history for clients using the Mobile money service';

--
-- Dumping data for table `transaction_history`
--

INSERT INTO `transaction_history` (`id`, `client_id`, `staff`, `office`, `transaction_type`, `amount`, `recipient`, `date`) VALUES
(1, 1, 'Head Office', 'Head Office', 'Withdrawal', 1, 'null', '2016-08-18 12:05:17'),
(2, 1, 'Head Office', 'Head Office', 'Withdrawal', 1, 'null', '2016-08-18 12:16:49'),
(3, 1, 'Head Office', 'Head Office', 'Withdrawal', 1, 'null', '2016-08-18 12:22:29'),
(4, 1, 'Head Office', 'Head Office', 'Withdrawal', 1, 'null', '2016-08-18 12:54:49'),
(5, 1, 'Head Office', 'Head Office', 'Savings', 1, 'null', '2016-08-18 13:10:04'),
(6, 1, 'Head Office', 'Head Office', 'Savings', 1, 'null', '2016-08-18 13:26:18'),
(7, 1, 'Head Office', 'Head Office', 'Withdrawal', 1, 'null', '2016-08-20 07:48:03'),
(8, 1, 'Head Office', 'Head Office', 'Withdrawal', 1, 'null', '2016-08-20 07:48:03'),
(9, 1, 'Head Office', 'Head Office', 'Withdrawal', 1, 'null', '2016-08-20 07:55:12'),
(10, 1, 'Head Office', 'Head Office', 'Withdrawal', 1, 'null', '2016-08-20 07:55:12'),
(11, 1, 'Head Office', 'Head Office', 'Withdrawal', 1, 'null', '2016-08-20 07:58:47'),
(12, 1, 'Head Office', 'Head Office', 'Withdrawal', 1, 'null', '2016-08-20 07:58:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `configurations`
--
ALTER TABLE `configurations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction_history`
--
ALTER TABLE `transaction_history`
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
-- AUTO_INCREMENT for table `transaction_history`
--
ALTER TABLE `transaction_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
