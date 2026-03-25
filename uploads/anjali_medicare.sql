-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2026 at 12:22 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `anjali_medicare`
--

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Cold',
  `followUp` varchar(50) DEFAULT NULL,
  `assignedTo` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `name`, `phone`, `company`, `product`, `status`, `followUp`, `assignedTo`, `created_at`) VALUES
(1, 'Dr. Ramesh Kumar', '+91 9876543210', 'City Care Hospital', 'MRI Scanner Pro', 'Hot Lead', '2026-03-26', 'Amit Singh', '2026-03-25 10:17:22'),
(2, 'Dr. Sneha Patel', '+91 9876543211', 'Sunrise Clinics', 'X-Ray Machine A', 'Follow-up', '2026-03-27', 'Rajesh Kumar', '2026-03-25 10:17:22'),
(3, 'Vikram Singh', '+91 9876543212', 'Global Diagnostics', 'Ultrasound Basic', 'Closed', '-', 'Neha Sharma', '2026-03-25 10:17:22'),
(4, 'Priya Desai', '+91 9876543213', 'Prime Health Center', 'ECG Monitor', 'Cold', '2026-04-10', 'Amit Singh', '2026-03-25 10:17:22'),
(5, 'Dr. Harish Rao', '+91 9876543214', 'Apollo Care', 'CT Scanner v2', 'Hot Lead', '2026-03-28', 'Neha Sharma', '2026-03-25 10:17:22'),
(6, 'Pramod', '9793820174', 'Company', 'Product Interest', 'Closed', '2026-03-25', 'Unassigned', '2026-03-25 10:30:23'),
(7, 'Dr. Aryan Sharma', '+91 9123456780', 'LifeCare Hospital', 'CT Scanner High-End', 'Hot Lead', '2026-04-01', 'Amit Singh', '2026-03-25 10:51:19'),
(8, 'Kiran Devi', '+91 9123456781', 'City Heart Clinic', 'ECG-12 Channel', 'Follow-up', '2026-03-29', 'Rajesh Kumar', '2026-03-25 10:51:19'),
(9, 'Dr. Paulose V', '+91 9123456782', 'Mercy Multispeciality', 'X-Ray Mobile Unit', 'Cold', '2026-04-15', 'Neha Sharma', '2026-03-25 10:51:19'),
(10, 'Sarah Khan', '+91 9123456783', 'Global Pathlabs', 'Hematology Analyzer', 'Closed', '-', 'Amit Singh', '2026-03-25 10:51:19');

-- --------------------------------------------------------

--
-- Table structure for table `service_requests`
--

CREATE TABLE `service_requests` (
  `id` int(11) NOT NULL,
  `machine_name` varchar(255) NOT NULL,
  `issue_description` text NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_requests`
--

INSERT INTO `service_requests` (`id`, `machine_name`, `issue_description`, `file_path`, `status`, `created_at`) VALUES
(1, 'MRI Scanner Pro', 'Track installed machines (CT, MRI, autoclaves)', 'uploads\\1774431795365-download.jpg', 'Pending', '2026-03-25 09:43:15'),
(2, 'Ultrasound Basic', 'Track installed machines (CT, MRI, autoclaves)', 'uploads\\1774431863995-download.jpg', 'Pending', '2026-03-25 09:44:24'),
(3, 'ECG Monitor', 'cvzcv', 'uploads\\1774432687810-download.jpg', 'Pending', '2026-03-25 09:58:07'),
(4, 'X-Ray Machine Model A', 'Power supply failure during operation. Unit shuts down unexpectedly after 5 minutes.', NULL, 'Pending', '2026-03-25 10:17:51'),
(5, 'MRI Scanner Pro', 'Cooling system alert. Temperature gauge shows high reading.', NULL, 'In Progress', '2026-03-25 10:17:51'),
(6, 'Ultrasound Basic', 'Display flickering on start up. Hard to read measurements.', NULL, 'Completed', '2026-03-25 10:17:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_requests`
--
ALTER TABLE `service_requests`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `service_requests`
--
ALTER TABLE `service_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
