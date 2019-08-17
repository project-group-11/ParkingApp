-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 08, 2019 at 10:51 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parking_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `parkingUsers`
--

CREATE TABLE `parkingUsers` (
  `id` int(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `official` tinyint(1) NOT NULL DEFAULT '0',
  `distance` int(255) NOT NULL DEFAULT '10',
  `time` int(255) NOT NULL DEFAULT '15'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parkingUsers`
--

INSERT INTO `parkingUsers` (`id`, `token`, `username`, `img_url`, `official`, `distance`, `time`) VALUES
(4, '0987sdewv', 'Adam', 'https://image.flaticon.com/icons/png/512/219/219970.png', 0, 20, 30),
(7, 'kuf8987sd', 'Ashleigh', 'https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_female-512.png', 0, 10, 20),
(2, '3jio234xh', 'Daisy', 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png', 0, 5, 15),
(5, '231134gui', 'Jessica', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHL1tiH-hHjCY6z2MFvFJXkzbty7phWYITY97fhFWoUr7pQ01F', 0, 15, 25),
(3, '6542bwem', 'Montgomery', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTcNrQj4LRFsJxyOv_L8ovgODPO9wueTQUdMHzzhCrKX5muE8w', 1, 30, 24),
(1, '123hetrw', 'Samuel', 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png', 0, 12, 18),
(8, 'asd897twe', 'Steve', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjfJW7v4TfprjQz57iK4KHbU8XLX18kx8bxIBpqUlacbNCnO7Z', 0, 16, 22),
(6, 'wsdfew908', 'Tyrone', 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', 0, 14, 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `parkingUsers`
--
ALTER TABLE `parkingUsers`
  ADD PRIMARY KEY (`username`) USING BTREE,
  ADD UNIQUE KEY `ID` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `parkingUsers`
--
ALTER TABLE `parkingUsers`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

