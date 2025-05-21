-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for car_dekho_app_db
CREATE DATABASE IF NOT EXISTS `car_dekho_app_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `car_dekho_app_db`;

-- Dumping structure for table car_dekho_app_db.car
CREATE TABLE IF NOT EXISTS `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isNew` tinyint(4) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `kilometers` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `variantId` int(11) DEFAULT NULL,
  `cityId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ef4033d1baf5409a13d41b6feec` (`variantId`),
  KEY `FK_c0433a6fce5f3a8704d81f2cf3f` (`cityId`),
  CONSTRAINT `FK_c0433a6fce5f3a8704d81f2cf3f` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ef4033d1baf5409a13d41b6feec` FOREIGN KEY (`variantId`) REFERENCES `variant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.car: ~36 rows (approximately)
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` (`id`, `isNew`, `year`, `kilometers`, `price`, `variantId`, `cityId`) VALUES
	(1, 0, 2020, 25000, 360000, 1, 1),
	(2, 0, 2019, 38000, 320000, 2, 2),
	(3, 0, 2021, 15000, 390000, 1, 3),
	(4, 0, 2018, 45000, 480000, 3, 1),
	(5, 0, 2019, 35000, 540000, 4, 4),
	(6, 0, 2020, 30000, 650000, 5, 2),
	(7, 0, 2019, 40000, 580000, 10, 5),
	(8, 0, 2020, 25000, 680000, 11, 3),
	(9, 0, 2021, 15000, 780000, 12, 6),
	(10, 0, 2018, 60000, 850000, 13, 7),
	(11, 0, 2019, 50000, 950000, 14, 8),
	(12, 0, 2020, 35000, 1200000, 15, 1),
	(13, 0, 2019, 48000, 600000, 16, 9),
	(14, 0, 2020, 35000, 700000, 17, 10),
	(15, 0, 2021, 20000, 820000, 18, 2),
	(16, 0, 2022, 20000, 1100000, 21, 1),
	(17, 0, 2022, 25000, 1250000, 22, 5),
	(18, 0, 2019, 40000, 850000, 28, 1),
	(19, 0, 2020, 30000, 950000, 29, 4),
	(20, 0, 2021, 20000, 1100000, 30, 7),
	(21, 1, 2025, 0, 420000, 1, 1),
	(22, 1, 2025, 0, 470000, 2, 2),
	(23, 1, 2025, 0, 599000, 3, 3),
	(24, 1, 2025, 0, 699000, 4, 4),
	(25, 1, 2025, 0, 799000, 5, 5),
	(26, 1, 2025, 0, 649000, 6, 6),
	(27, 1, 2025, 0, 749000, 7, 7),
	(28, 1, 2025, 0, 1099000, 13, 8),
	(29, 1, 2025, 0, 1299000, 14, 9),
	(30, 1, 2025, 0, 1499000, 15, 10),
	(31, 1, 2025, 0, 749000, 16, 5),
	(32, 1, 2025, 0, 849000, 17, 10),
	(33, 1, 2025, 0, 949000, 18, 2),
	(34, 1, 2025, 0, 1299000, 21, 3),
	(35, 1, 2025, 0, 1499000, 22, 4),
	(36, 1, 2025, 0, 1699000, 23, 5);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.car_sell_request
CREATE TABLE IF NOT EXISTS `car_sell_request` (
  `requestId` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `requestDate` datetime NOT NULL DEFAULT current_timestamp(),
  `inspectionDate` datetime DEFAULT NULL,
  `valuationAmount` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`requestId`),
  KEY `FK_d3e88e93d259fa61445140ef275` (`userId`),
  CONSTRAINT `FK_d3e88e93d259fa61445140ef275` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.car_sell_request: ~0 rows (approximately)
/*!40000 ALTER TABLE `car_sell_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `car_sell_request` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.car_type
CREATE TABLE IF NOT EXISTS `car_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `minBudget` int(11) DEFAULT NULL,
  `maxBudget` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.car_type: ~10 rows (approximately)
/*!40000 ALTER TABLE `car_type` DISABLE KEYS */;
INSERT INTO `car_type` (`id`, `name`, `description`, `minBudget`, `maxBudget`) VALUES
	(1, 'Hatchback', 'Compact cars with a rear door that opens upward. Ideal for city driving with good fuel efficiency.', 250000, 1200000),
	(2, 'Sedan', 'Four-door cars with a separate trunk compartment. Balanced performance and comfort.', 500000, 2500000),
	(3, 'SUV', 'Sport Utility Vehicles with higher ground clearance and typically more spacious interiors.', 700000, 5000000),
	(4, 'MUV', 'Multi-Utility Vehicles designed for family use with more seating capacity.', 800000, 3000000),
	(5, 'Luxury', 'Premium vehicles with high-end features, superior comfort, and advanced technology.', 3000000, 50000000),
	(6, 'Convertible', 'Vehicles with a retractable roof, offering an open-air driving experience.', 3500000, 30000000),
	(7, 'Crossover', 'Combines features of SUVs and passenger cars, offering better fuel economy than traditional SUVs.', 900000, 4000000),
	(8, 'Coupe', 'Two-door cars with a fixed roof and sporty appearance.', 2500000, 25000000),
	(9, 'Pickup Truck', 'Vehicles with an open cargo area at the back.', 1500000, 10000000),
	(10, 'Electric', 'Battery-powered vehicles with zero emissions.', 1200000, 30000000);
/*!40000 ALTER TABLE `car_type` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.category
CREATE TABLE IF NOT EXISTS `category` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `menuheadingMenuId` int(11) DEFAULT NULL,
  `hasSubCategory` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`categoryId`),
  KEY `FK_de87fd02150750c3819f64a2b9d` (`menuheadingMenuId`),
  CONSTRAINT `FK_de87fd02150750c3819f64a2b9d` FOREIGN KEY (`menuheadingMenuId`) REFERENCES `menu_heading` (`menuId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.category: ~18 rows (approximately)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`categoryId`, `name`, `menuheadingMenuId`, `hasSubCategory`) VALUES
	(1, 'Explore New Cars', 1, 0),
	(2, 'Electric Cars', 1, 1),
	(3, 'Popular Cars', 1, 1),
	(4, 'Upcomming Cars', 1, 0),
	(5, 'New Launches', 1, 0),
	(6, 'Popular Brands', 1, 1),
	(7, 'Compare Cars', 1, 0),
	(8, 'New Car Offers & Discounts', 1, 0),
	(9, 'Find Car Dealers ', 1, 0),
	(10, 'Find EV Charging Stations', 1, 0),
	(11, 'Find Fuel Stations', 1, 0),
	(12, 'Check Fuel Prices', 1, 0),
	(13, 'Car Insurance', 1, 0),
	(14, 'ABC Dealers', 1, 0),
	(16, 'PMV', 1, 0),
	(17, 'Buy Used Cars', 2, 0),
	(18, 'Used Cars In Your City', 2, 1),
	(19, 'Sell My Car', 2, 0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.city
CREATE TABLE IF NOT EXISTS `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.city: ~10 rows (approximately)
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` (`id`, `name`, `state`) VALUES
	(1, 'Mumbai', 'Maharashtra'),
	(2, 'Delhi', 'Delhi'),
	(3, 'Bangalore', 'Karnataka'),
	(4, 'Hyderabad', 'Telangana'),
	(5, 'Chennai', 'Tamil Nadu'),
	(6, 'Kolkata', 'West Bengal'),
	(7, 'Pune', 'Maharashtra'),
	(8, 'Ahmedabad', 'Gujarat'),
	(9, 'Jaipur', 'Rajasthan'),
	(10, 'Lucknow', 'Uttar Pradesh');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.make
CREATE TABLE IF NOT EXISTS `make` (
  `makeId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `categoryCategoryId` int(11) DEFAULT NULL,
  `logo` varchar(255) NOT NULL,
  PRIMARY KEY (`makeId`),
  KEY `FK_b36279736c242f8269311e625e4` (`categoryCategoryId`),
  CONSTRAINT `FK_b36279736c242f8269311e625e4` FOREIGN KEY (`categoryCategoryId`) REFERENCES `category` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.make: ~45 rows (approximately)
/*!40000 ALTER TABLE `make` DISABLE KEYS */;
INSERT INTO `make` (`makeId`, `name`, `categoryCategoryId`, `logo`) VALUES
	(1, 'Maruti', 6, 'logo-1744897412026-530223511.webp'),
	(2, 'Tata', 2, 'logo-1744366018868-238951461.webp'),
	(3, 'Kia', 2, 'logo-1744366066679-811034928.webp'),
	(4, 'Toyata', 2, 'logo-1744366822280-404003775.webp'),
	(5, 'Hyundai', 6, 'logo-1744366861559-191922259.webp'),
	(6, 'Mahindra', 2, 'logo-1744366932985-74413499.webp'),
	(7, 'Honda', 2, 'logo-1744366962306-58394382.webp'),
	(8, 'MG', 2, 'logo-1744367012271-354895625.webp'),
	(9, 'Skoda', 2, 'logo-1744367041020-258187304.webp'),
	(10, 'Jeep', 2, 'logo-1744367067289-791599133.webp'),
	(11, 'Renault', 3, 'logo-1744367119185-447422318.webp'),
	(12, 'Nissan', 3, 'logo-1744367150358-607547832.webp'),
	(13, 'Volkswagen', 3, 'logo-1744367503934-606716567.avif'),
	(14, 'Citroen', 3, 'logo-1744367607401-507126739.avif'),
	(15, 'Aston Martin', 3, 'logo-1744367648829-937736155.avif'),
	(16, 'Audi', 4, 'logo-1744367707687-553158997.avif'),
	(17, 'Bajaj', 4, 'logo-1744367738300-35905296.avif'),
	(18, 'Bentley', 4, 'logo-1744367765602-576674114.avif'),
	(19, 'BMW', 4, 'logo-1744367791316-788172403.avif'),
	(20, 'BYD', 4, 'logo-1744367825323-38422385.avif'),
	(21, 'Ferrari', 5, 'logo-1744367856534-332683514.avif'),
	(22, 'Force', 5, 'logo-1744367883787-596766206.avif'),
	(23, 'Isuzu', 5, 'logo-1744367914000-603787701.avif'),
	(24, 'Jaguar', 5, 'logo-1744367948298-276159199.avif'),
	(25, 'Lamborghini', 5, 'logo-1744368023464-959703465.avif'),
	(26, 'Land Rover', 6, 'logo-1744368066141-300231814.avif'),
	(27, 'Lotus', 6, 'logo-1744368123133-161596365.avif'),
	(28, 'Maserati', 6, 'logo-1744368172524-807550272.avif'),
	(29, 'Mclaren', 6, 'logo-1744368380332-701061407.avif'),
	(30, 'Mercedes-Benz', 6, 'logo-1744368458618-781421408.avif'),
	(31, 'Mini', 6, 'logo-1744368507701-370218300.avif'),
	(32, 'PMV', 7, 'logo-1744368569656-214587286.avif'),
	(33, 'Porsche', 7, 'logo-1744368665875-679688188.avif'),
	(34, 'Pravaig', 7, 'logo-1744368719703-750566285.avif'),
	(35, 'Rolls-Royce', 7, 'logo-1744368785731-384656032.avif'),
	(36, 'Strome Motors', 8, 'logo-1744368837095-109321170.avif'),
	(37, 'Vayve Mobility', 8, 'logo-1744368883970-612006413.avif'),
	(38, 'VinFast', 9, ''),
	(39, 'Volvo', 9, 'logo-1744369034750-29301261.avif'),
	(40, 'Vlvo-Bench', 10, ''),
	(42, 'Maruti', 2, 'logo-1744365955003-66388644.webp'),
	(43, 'Hyundai', 2, 'logo-1744366861559-191922259.webp'),
	(44, 'Tata', 2, 'logo-1744366018868-238951461.webp'),
	(45, 'Mahindra', 2, 'logo-1744366932985-74413499.webp'),
	(46, 'Honda', 2, 'logo-1744366962306-58394382.webp');
/*!40000 ALTER TABLE `make` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.menu_heading
CREATE TABLE IF NOT EXISTS `menu_heading` (
  `name` varchar(255) NOT NULL,
  `menuId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.menu_heading: ~3 rows (approximately)
/*!40000 ALTER TABLE `menu_heading` DISABLE KEYS */;
INSERT INTO `menu_heading` (`name`, `menuId`) VALUES
	('NEW CARS', 1),
	('USED CARS', 2),
	('NEWS & REVIEWS', 3),
	('VIDEOS', 4);
/*!40000 ALTER TABLE `menu_heading` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.model
CREATE TABLE IF NOT EXISTS `model` (
  `modelId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `makeMakeId` int(11) DEFAULT NULL,
  `engine` varchar(255) NOT NULL,
  `power` varchar(255) NOT NULL,
  `transmission` varchar(255) NOT NULL,
  `torgue` varchar(255) NOT NULL,
  `body_type` varchar(255) NOT NULL,
  `seating_capacity` int(11) NOT NULL,
  `launch_status` varchar(255) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  `mileage` varchar(255) NOT NULL,
  `fueltype` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `price` varchar(255) NOT NULL,
  PRIMARY KEY (`modelId`),
  KEY `FK_c8003e8dcbfa7bf894cff2a987d` (`makeMakeId`),
  CONSTRAINT `FK_c8003e8dcbfa7bf894cff2a987d` FOREIGN KEY (`makeMakeId`) REFERENCES `make` (`makeId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.model: ~47 rows (approximately)
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` (`modelId`, `name`, `makeMakeId`, `engine`, `power`, `transmission`, `torgue`, `body_type`, `seating_capacity`, `launch_status`, `images`, `mileage`, `fueltype`, `year`, `price`) VALUES
	(1, 'VIDEOS', 1, '796 cc', '67 bhp', 'Manual', '91.1 NM', 'Hatchback', 0, '', 'uploads/models/model-1745228262115-133566416.avif', '22.05 kmpl', 'Petrol', 0, '500000.00'),
	(2, 'Alto K1', 1, '998 cc', '55.92-65.72 bhp', 'Manual/Automatic', '82.1-89 Nm', 'Hatchback', 0, '', 'uploads/models/model-1745212363578-551620886.avif', '23.39-24.9 kmpl', 'CNG/Petrol', 0, '420000.00-621000.00'),
	(3, 'Baleno', 1, '1197 cc', '76.43 - 88.5 bhp', 'Manual/Automatic', '98.5 Nm - 113 Nm', 'Hatchback', 0, '', 'uploads/models/model-1745212455235-862252063.avif', '22.35 - 22.94 kmpl', 'CNG/Petrol', 0, '670000.00-992000.00'),
	(4, 'Brezza', 1, '1462 cc', '86.63 - 101.64 bhp', 'Automatic', '', 'SUV', 0, 'Newly Launch', 'uploads/models/model-1745212553996-939732388.avif', '23.39-24.9 kmpl', 'CNG/Petrol', 2025, '869000.00-1414000.00'),
	(5, 'Altroz', 2, '1199 cc - 1497 cc', '72.49 - 88.76 bhp', 'Manual / Automatic', '103 Nm - 200 Nm', 'Hatchback', 5, 'Newly Launch', 'uploads/models/model-1745212677847-522199590.avif', '23.64 kmpl', 'Petrol / CNG / Diesel', 2025, '665000.00-1130000.00'),
	(6, 'Altroz Racer', 2, '1199 cc', '118.35 bhp', 'Manual', '170 Nm', 'Hatchback', 5, 'Newly Launch', 'uploads/models/model-1745212792656-547298428.avif', '18 kmpl', 'Petrol', 2025, '950000.00-1100000.00'),
	(7, '  Harrier', 2, '1199 cc', '118.35 bhp', 'Manual / Automatic', '170 Nm', 'Sport Utilities', 5, 'Newly Launch', 'uploads/models/model-1745212880899-978303665.avif', '23.64 kmpl', 'Petrol / CNG / Diesel', 2025, '95000.00-1130000.00'),
	(8, 'Kia Carens', 3, '1482 cc - 1497 cc', '113.42 - 157.81 bhp', 'Manual / Automatic', '144 Nm - 253 Nm', 'MUV', 6, '', 'uploads/models/model-1745220559016-584968377.avif', '23.64 kmpl', 'Diesel / Petrol', 2025, '1060000.00-1970000.00'),
	(9, 'Kia Seltos', 3, '1482 cc - 1497 cc', '113.42 - 157.81 bhp', 'Automatic', '250Nm@1500-2750rpm', 'SUV', 5, '', 'uploads/models/model-1745220691797-747283571.avif', '19.1 kmpl', 'Diesel', 2025, '1113000.00-2051000.00'),
	(10, ' Toyota Camry', 4, '2487 cc', '227 bhp', 'Automatic', '221 Nm', 'Sedan', 5, '', 'uploads/models/model-1745220786436-402042782.avif', '25.49 kmpl', 'Petrol', 2025, '4850000'),
	(11, 'Hyundai Aura', 4, '2694 cc - 2755 cc', '163.6 - 201.15 bhp', 'Automatic', '245 Nm - 500 Nm', 'SUV', 5, '', 'uploads/models/model-1745220875608-352785887.avif', '11 kmpl', 'Diesel', 0, '353700'),
	(12, 'Hyundai Aura', 5, '1197 cc', '68 - 82 bhp', 'Manual / Automatic', '95.2 Nm - 113.8 Nm', 'Sedan', 5, '', 'uploads/models/model-1745220976513-760146021.avif', '11 kmpl', 'Petrol / CNG', 0, '654000'),
	(13, 'Hyundai Creta', 5, '1482 cc - 1497 cc', '113.18 - 157.57 bhp', 'Automatic', '143.8 Nm - 253 Nm', 'SUV', 5, '', 'uploads/models/model-1745221137952-718702100.avif', '19.1 kmpl', 'Diesel', 0, '1111000'),
	(14, 'Mahindra Bolero', 6, '1493 cc', '74.96 bhp', 'Manual', '210 Nm', 'SUV', 5, '', 'uploads/models/model-1745221353462-970624393.avif', '16 kmpl', 'Diesel', 0, '979000'),
	(15, 'Mahindra Thar', 6, '1497 cc - 2184 cc', '116.93 - 150.19 bhp', 'Manual', '300 Nm - 320 Nm', 'SUV', 4, '', 'uploads/models/model-1745221428084-134145073.avif', '16 kmpl', 'Diesel', 0, '1150000'),
	(16, 'Honda City', 7, '1498 cc', '119.35 bhp', 'Manual / Automatic', '145 Nm', 'Sedan', 5, '', 'uploads/models/model-1745224458440-145928859.avif', '17.8 - 18.4 kmpl', 'Petrol', 0, '1228000'),
	(17, 'Honda Elevate', 7, '1498 cc', '119 bhp', 'Manual / Automatic', '145 Nm', 'SUV', 5, '', 'uploads/models/model-1745224612204-762681576.avif', '15.31 - 16.92 kmpl', 'Petrol', 0, '1191000'),
	(18, 'MG Gloster', 8, '1996 cc', '158.79 - 212.55 bhp', 'Manual / Automatic', '373.5 Nm - 478.5 Nm', 'SUV', 5, '', 'uploads/models/model-1745224822552-119854763.avif', '10 kmpl', 'Diesel', 0, '3957000'),
	(19, 'MG Hector', 8, '1451 cc - 1956 cc', '141.04 - 167.67 bhp', 'Manual / Automatic', '250 Nm - 350 Nm', 'SUV', 5, '', 'uploads/models/model-1745224861422-182651454.avif', '15.58 kmpl', 'Petrol', 0, '2289000'),
	(20, 'Skoda Kushaq', 9, '999 cc - 1498 cc', '114 - 147.51 bhp', 'Automatic', '250 Nm - 350 Nm', 'SUV', 5, '', 'uploads/models/model-1745225021285-200563194.avif', '18.09 - 19.76 kmpl', 'Petrol', 0, '1900000'),
	(21, 'Skoda Kylaq', 9, '999 cc', '114 bhp', 'Automatic', '178 Nm', 'SUV', 5, '', 'uploads/models/model-1745225139032-201468370.avif', '18.09 - 19.76 kmpl', 'Petrol', 0, '1200000'),
	(22, 'Jeep Compass', 10, '1956 cc', '168 bhp', 'Automatic', '350 Nm', 'SUV', 5, '', 'uploads/models/model-1745225268738-343405168.avif', '14.9 - 17.1 kmpl', 'Diesel', 0, '1899000'),
	(23, 'Jeep Meridian', 10, '1956 cc', '168 bhp', 'Automatic', '350 Nm', 'SUV', 5, '', 'uploads/models/model-1745225385372-268718139.avif', '12kmpl', 'Diesel', 0, '2499000'),
	(24, 'Renault KWID', 11, '999 cc', '67.06 bhp', 'Manual / Automatic ', '91 Nm', 'SUV', 5, '', 'uploads/models/model-1745225484999-238098882.avif', '21.46 - 22.3 kmpl', 'CNG / Petrol', 0, '6450000'),
	(25, 'Renault Kiger', 11, '999 cc', '71 - 98.63 bhp', 'Manual / Automatic ', '96 Nm - 160 Nm', 'SUV', 5, '', 'uploads/models/model-1745225587560-723768086.avif', '21.46 - 22.3 kmpl', 'Petrol', 0, '6450000'),
	(26, 'Renault Triber', 11, '999 cc', '71.01 bhp', 'Manual / Automatic ', '96 Nm', 'MUV', 5, '', 'uploads/models/model-1745225738622-242886392.avif', '18.2 - 20 kmpl', 'Petrol', 0, '6150000'),
	(27, 'Nissan Magnite', 12, '999 cc', '71 - 99 bhp', 'Manual / Automatic ', '96 Nm - 160 Nm', 'SUV', 5, '', 'uploads/models/model-1745225895735-223288420.avif', '18.2 - 20 kmpl', 'Petrol', 0, '6150000'),
	(28, 'Nissan X-Trail', 12, '1498 cc', '161 bhp', 'Automatic', '300 Nm', 'SUV', 5, '', 'uploads/models/model-1745225994220-353892729.avif', '10 kmpl', 'Petrol', 0, '4992000'),
	(29, 'Nissan X-Trail', 2, '1199 cc', '72 - 87 bhp', 'Manual / Automatic', '103 Nm - 115 Nm', 'SUV', 5, '', 'uploads/models/model-1745226197936-467102418.avif', '10 kmpl', 'Petrol', 0, '620000'),
	(30, 'Mahindra Scorpio', 6, '2184 cc', '130 bhp', 'Manual', '300 Nm', 'SUV', 5, '', 'uploads/models/model-1745226347006-871500843.avif', '14.44 kmpl', 'Diesel', 0, '1400000'),
	(31, 'Alto 800', 1, '', '', '', '', '', 0, '', 'uploads/models/model-1745226459667-431604478.avif', '', '', 0, ''),
	(32, 'Maruti Swift', 1, '1197 cc', '68.8 - 80.46 bhp', 'Manual / Automatic', '101.8 Nm - 111.7 Nm', 'Hatchback', 5, '', 'uploads/models/model-1745226548330-143036197.avif', '24.8 - 25.75 kmpl', 'CNG / Petrol', 0, '649000'),
	(33, 'Baleno', 1, '', '', '', '', '', 0, '', 'uploads/models/model-1745226689806-768825120.avif', '', '', 0, ''),
	(34, 'Hyundai Grand i10 Nios', 5, '1197 cc', '68 - 82 bhp', 'Manual / Automatic', '101.8 Nm - 111.7 Nm', 'Hatchback', 5, '', 'uploads/models/model-1745226949624-866994529.avif', '16 - 18 kmpl', 'Petrol / CNG', 0, '598000'),
	(35, 'Hyundai i20', 5, '1197 cc', '82 - 87 bhp', 'Automatic / Manual', '114.7 Nm', 'Hatchback', 5, '', 'uploads/models/model-1745227120722-189550062.avif', '16 - 20 kmpl', 'Petrol', 0, '74000'),
	(36, 'Creta', 2, '', '', '', '', '', 0, '', 'uploads/models/model-1745227242000-212741477.avif', '', '', 0, ''),
	(37, 'Tata Nexon', 2, '1199 cc - 1497 cc', '99 - 118.27 bhp', 'Automatic', '170 Nm - 260 Nm', 'SUV', 5, '', 'uploads/models/model-1745227435646-581527301.avif', '16 - 20 kmpl', 'Petrol', 0, '74000'),
	(38, 'Harrier', 2, '', '', '', '', '', 0, '', 'uploads/models/model-1745227559822-921552692.avif', '', '', 0, ''),
	(39, 'Tata Safari EV', 2, '1199 cc - 1497 cc', '99 - 118.27 bhp', 'Automatic', '170 Nm - 260 Nm', 'SUV', 5, '', 'uploads/models/model-1745227671295-855398882.avif', '16 - 20 kmpl', 'Petrol', 0, '3200000'),
	(40, 'Mahindra XUV700', 6, '1999 cc - 2198 cc', '152 - 197 bhp', 'Automatic', '360 Nm - 450 Nm', 'SUV', 5, '', 'uploads/models/model-1745227904645-655911646.avif', '17 kmpl', 'Diesel', 0, '1450000'),
	(41, 'Scorpio', 6, '', '', '', '', '', 0, '', 'uploads/models/model-1745227924263-782638659.avif', '', '', 0, ''),
	(46, ' Mahindra BE 6', 6, '2487cc', '282bhp', 'Automatic', '380Nm', 'SUV', 5, 'Newly Launch', 'uploads/models/model-1745233211728-912043612.avif', '112', 'Electric', 2025, '18900000.00'),
	(47, 'Mahindra XEV 9e', 6, '1999 cc - 2198 cc', '282bhp', 'Automatic', '380 Nm', 'SUV', 5, 'Newly Launch', 'uploads/models/model-1745233358906-261093822.avif', '17 kmpl', 'Diesel', 2025, '2190000'),
	(48, 'MG Windsor EV', 8, '1999 cc - 2198 cc', '134 bhp', 'Automatic', '200Nm', 'MUV', 5, 'Newly Launch', 'uploads/models/model-1745233518025-99414108.avif', '17 kmpl', 'Diesel', 2025, '2190000'),
	(49, 'MG Windsor EV', 2, '1999 cc - 2198 cc', '165bhp', 'Automatic', '215Nm', 'SUV', 5, 'Newly Launch', 'uploads/models/model-1745233667381-839246563.avif', '17 kmpl', 'Electric', 2025, '1749000'),
	(50, 'MG Windsor EV', 8, '1999 cc - 2198 cc', '41.42 bhp', 'Automatic', '110Nm', 'TypeHatchback', 5, 'Newly Launch', 'uploads/models/model-1745233754238-259423918.avif', '17 kmpl', 'Electric', 2025, '700000'),
	(51, 'Tata Punch EV', 2, '', '80.46 - 120.69 bhp', '', '190Nm', 'SUV', 5, '', NULL, '', 'Electric', 2024, '999000.00-1444000.00');
/*!40000 ALTER TABLE `model` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.otps
CREATE TABLE IF NOT EXISTS `otps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otp` varchar(6) NOT NULL,
  `isUsed` tinyint(4) NOT NULL DEFAULT 0,
  `expiresAt` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_82b0deb105275568cdcef2823eb` (`userId`),
  CONSTRAINT `FK_82b0deb105275568cdcef2823eb` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.otps: ~55 rows (approximately)
/*!40000 ALTER TABLE `otps` DISABLE KEYS */;
INSERT INTO `otps` (`id`, `otp`, `isUsed`, `expiresAt`, `createdAt`, `userId`) VALUES
	(1, '5270', 0, '2025-04-22 12:56:36', '2025-04-22 12:41:36.797807', 1),
	(2, '4072', 1, '2025-04-22 13:19:03', '2025-04-22 13:04:03.498017', 1),
	(3, '2816', 1, '2025-04-22 15:05:29', '2025-04-22 14:50:29.090609', 1),
	(4, '2978', 1, '2025-04-22 16:32:52', '2025-04-22 16:17:52.494833', 2),
	(5, '1465', 1, '2025-04-22 16:35:36', '2025-04-22 16:20:36.694134', 2),
	(6, '6831', 1, '2025-04-23 10:29:56', '2025-04-23 10:14:56.281376', 2),
	(7, '9960', 1, '2025-04-23 10:31:25', '2025-04-23 10:16:25.442229', 2),
	(8, '2468', 1, '2025-04-23 10:52:21', '2025-04-23 10:37:21.649486', 2),
	(9, '7109', 1, '2025-04-23 10:53:23', '2025-04-23 10:38:23.008747', 3),
	(10, '4593', 1, '2025-04-23 10:55:09', '2025-04-23 10:40:09.272808', 4),
	(11, '6448', 1, '2025-04-24 12:30:37', '2025-04-24 12:15:37.133882', 5),
	(12, '2589', 1, '2025-04-24 12:51:26', '2025-04-24 12:36:26.401097', 6),
	(13, '7969', 1, '2025-04-24 12:52:15', '2025-04-24 12:37:15.079127', 6),
	(14, '5081', 1, '2025-04-24 13:12:04', '2025-04-24 12:57:04.657253', 7),
	(15, '6025', 1, '2025-04-24 13:12:52', '2025-04-24 12:57:52.024014', 8),
	(16, '2197', 1, '2025-04-24 13:18:10', '2025-04-24 13:03:10.059438', 9),
	(17, '3423', 1, '2025-04-24 14:48:54', '2025-04-24 14:33:54.340257', 10),
	(18, '9701', 1, '2025-04-24 14:58:48', '2025-04-24 14:43:48.199846', 11),
	(19, '1590', 1, '2025-04-24 15:16:50', '2025-04-24 15:01:50.750441', 12),
	(20, '6381', 1, '2025-04-24 15:21:16', '2025-04-24 15:06:16.624717', 13),
	(21, '7444', 1, '2025-04-24 16:09:34', '2025-04-24 15:54:35.003456', 14),
	(22, '7576', 0, '2025-04-24 17:04:04', '2025-04-24 16:49:04.795904', 15),
	(23, '6467', 1, '2025-04-24 17:12:14', '2025-04-24 16:57:14.427014', 16),
	(24, '1417', 1, '2025-04-24 18:19:09', '2025-04-24 18:04:09.397617', 17),
	(25, '9542', 1, '2025-04-24 18:25:58', '2025-04-24 18:10:58.437261', 18),
	(26, '3519', 1, '2025-04-25 16:48:19', '2025-04-25 16:33:19.662618', 19),
	(27, '6345', 1, '2025-04-28 10:34:12', '2025-04-28 10:19:12.403577', 20),
	(28, '6676', 1, '2025-04-28 11:32:17', '2025-04-28 11:17:17.064302', 21),
	(29, '3812', 1, '2025-04-28 11:33:03', '2025-04-28 11:18:03.417729', 22),
	(30, '5981', 1, '2025-04-28 11:37:03', '2025-04-28 11:22:03.429398', 23),
	(31, '2643', 1, '2025-04-28 11:39:02', '2025-04-28 11:24:02.961010', 24),
	(32, '3905', 1, '2025-04-28 11:50:55', '2025-04-28 11:35:55.358795', 25),
	(33, '1267', 1, '2025-04-28 11:56:55', '2025-04-28 11:41:55.278301', 26),
	(34, '6182', 1, '2025-04-28 12:00:37', '2025-04-28 11:45:37.103665', 27),
	(35, '3379', 1, '2025-04-28 12:05:14', '2025-04-28 11:50:14.037041', 28),
	(36, '4671', 0, '2025-04-28 12:08:02', '2025-04-28 11:53:02.542077', 29),
	(37, '7870', 1, '2025-04-28 12:10:00', '2025-04-28 11:55:00.943629', 30),
	(38, '9247', 1, '2025-04-28 12:11:45', '2025-04-28 11:56:45.142972', 31),
	(39, '9577', 1, '2025-04-28 12:13:42', '2025-04-28 11:58:42.323547', 32),
	(40, '8313', 1, '2025-04-28 18:53:33', '2025-04-28 18:38:33.183699', 33),
	(41, '1028', 1, '2025-04-28 18:54:43', '2025-04-28 18:39:43.913941', 34),
	(42, '1716', 1, '2025-04-28 18:56:52', '2025-04-28 18:41:52.834416', 31),
	(43, '9145', 1, '2025-04-28 18:58:56', '2025-04-28 18:43:56.297809', 31),
	(44, '7294', 1, '2025-04-29 14:24:01', '2025-04-29 14:09:01.369429', 35),
	(45, '3048', 1, '2025-04-29 14:25:03', '2025-04-29 14:10:03.035253', 1),
	(46, '5622', 1, '2025-04-29 14:26:22', '2025-04-29 14:11:22.452645', 35),
	(47, '1144', 1, '2025-04-29 14:27:12', '2025-04-29 14:12:12.541545', 36),
	(48, '4974', 1, '2025-04-29 15:00:50', '2025-04-29 14:45:50.985228', 37),
	(49, '4301', 0, '2025-04-29 15:01:33', '2025-04-29 14:46:33.950648', 38),
	(50, '7282', 1, '2025-04-29 15:06:41', '2025-04-29 14:51:41.923677', 39),
	(51, '2013', 1, '2025-04-29 15:18:13', '2025-04-29 15:03:13.332879', 40),
	(52, '2835', 1, '2025-04-29 15:41:01', '2025-04-29 15:26:01.208344', 41),
	(53, '4879', 1, '2025-04-29 15:51:05', '2025-04-29 15:36:05.748453', 42),
	(54, '3362', 1, '2025-05-07 16:07:29', '2025-05-07 15:52:29.729931', 43),
	(55, '9587', 1, '2025-05-07 16:23:34', '2025-05-07 16:08:34.826120', 44);
/*!40000 ALTER TABLE `otps` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.seller
CREATE TABLE IF NOT EXISTS `seller` (
  `selllerId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `contactAdderess` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`selllerId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.seller: ~9 rows (approximately)
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` (`selllerId`, `name`, `mobile`, `contactAdderess`, `email`) VALUES
	(1, 'John Car Dealer', '9876543210', '1234 Auto Lane, Pune', 'john@sellcars.com'),
	(2, 'ABC Dealers', '9087654321', '1234 Auto Lane, mumbai', 'abc@sellcars.com'),
	(3, 'Trinka Singh', '9617894754', 'ddfdf', 'trinkasingh22@gmai.com'),
	(4, 'Trinka Singh', '9617894754', 'hggh', 'trinkasingh22@gmai.com'),
	(5, 'Trinka Singh', '9617894754', 'abc', 'trinkasingh@gmail.com'),
	(6, '	To Kill a Mockingbird', '9617894754', 'asa', 'trinkasingh22@gmai.com'),
	(7, '	To Kill a Mockingbird', '9617894754', 'asa', 'trinkasingh22@gmai.com'),
	(8, '	To Kill a Mockingbird', '9617894754', 'abc', 'trinkasingh22@gmai.com'),
	(9, '	To Kill a Mockingbird', '9617894754', 'abc', 'trinkasingh22@gmai.com'),
	(10, '	To Kill a Mockingbird', '9617894754', 'dfd', 'trinkasingh22@gmai.com'),
	(11, 'Harper Lee', '9617894754', 'dsds', 'trinkasingh22@gmai.com'),
	(12, 'Harper Lee', '9617894754', 'abc', 'trinkasingh22@gmai.com');
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.used_car_detail
CREATE TABLE IF NOT EXISTS `used_car_detail` (
  `carId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `images` varchar(255) NOT NULL,
  `carNumber` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `lenght` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `fuelType` varchar(255) NOT NULL,
  `insurance` varchar(255) NOT NULL,
  `seats` int(11) NOT NULL,
  `kmsDriven` varchar(255) NOT NULL,
  `Rto` varchar(255) NOT NULL,
  `engine` varchar(255) NOT NULL,
  `mileage` varchar(255) NOT NULL,
  `power` varchar(255) NOT NULL,
  `numberofAirbags` int(11) NOT NULL,
  `engineDisplacement` varchar(255) NOT NULL,
  `transmission` varchar(255) NOT NULL,
  `yearofManufacture` int(11) NOT NULL,
  `categoryCategoryId` int(11) DEFAULT NULL,
  `sellerSelllerId` int(11) DEFAULT NULL,
  `registrationYear` varchar(255) NOT NULL,
  `ownership` varchar(255) NOT NULL,
  `body_type` varchar(255) NOT NULL,
  `makeMakeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`carId`),
  KEY `FK_a704f1ecfe4f54a45eb04b7d72e` (`categoryCategoryId`),
  KEY `FK_b9bd05974695948f419eceda685` (`sellerSelllerId`),
  KEY `FK_695f613a82e9ea1a401efd51ab9` (`makeMakeId`),
  CONSTRAINT `FK_695f613a82e9ea1a401efd51ab9` FOREIGN KEY (`makeMakeId`) REFERENCES `make` (`makeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_a704f1ecfe4f54a45eb04b7d72e` FOREIGN KEY (`categoryCategoryId`) REFERENCES `category` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_b9bd05974695948f419eceda685` FOREIGN KEY (`sellerSelllerId`) REFERENCES `seller` (`selllerId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.used_car_detail: ~7 rows (approximately)
/*!40000 ALTER TABLE `used_car_detail` DISABLE KEYS */;
INSERT INTO `used_car_detail` (`carId`, `name`, `title`, `images`, `carNumber`, `price`, `lenght`, `state`, `city`, `fuelType`, `insurance`, `seats`, `kmsDriven`, `Rto`, `engine`, `mileage`, `power`, `numberofAirbags`, `engineDisplacement`, `transmission`, `yearofManufacture`, `categoryCategoryId`, `sellerSelllerId`, `registrationYear`, `ownership`, `body_type`, `makeMakeId`) VALUES
	(1, 'BMW', '2022 BMW X4 M Sport X xDrive30d', 'image-1745412797622-172604231.avif', 'MH12AB1234', '50.50 Lakh', '4.6m', 'Maharashtra', 'Pune', 'Diesel', 'Comprehensive', 5, '20,000 Kms', 'Pune', '2993 cc', '235 kmph', '261.50 bhp', 6, '2993 cc', 'Automatic', 2022, 17, 1, 'Jan 2022', 'Second Owner', 'Hatchback', 1),
	(3, '2022 Honda City ZX CVT', '2022 Honda City ZX CVT', 'image-1745413557641-510326264.avif', 'MH12AB1235', '13 Lakh', '', 'Maharashtra', 'Mumbai', 'Petrol', 'Comprehensive', 5, '18,000 Kms', 'Mumbai', '1497 cc', '17.4 kmpl', '117.6 bhp', 6, '1497 cc', 'Automatic', 2022, 17, 2, 'Jul 2022', 'First Owner', '', 2),
	(5, '	The Hobbit', 'gfff', 'image-1745991262242-990243591.avif', 'MH01AC1234', '600000', '4000M', 'Maharashtra', 'Nashik', 'Petrol', 'Comprehensive', 5, '2500', 'MH01', '1.5', '150', '118', 5, '1498', 'Automatic', 2024, 17, 4, '2024', '2nd Owner', '', 3),
	(6, 'Honda city', '2020 honda city XUV', 'image-1745991656412-869311749.avif', 'MH01AC1234', '600000', '4000M', 'Maharashtra', 'Pune', 'Petrol', 'Third-party', 5, '2500', 'MH01', '1.5', '150', '118', 5, '1498', 'Automatic', 2020, 17, 5, '2021', '2nd Owner', '', 4),
	(7, 'Harper Lee', 'fdf', 'image-1746003836886-67715858.avif', 'MH01AC1234', '600000', '4000M', 'Maharashtra', 'Nashik', 'Petrol', 'Comprehensive', 5, '2500', 'MH01', '', '150', '118', 5, '', 'Automatic', 2024, 17, 10, '2024', '2nd Owner', 'Sedan', 2),
	(8, 'Harper Lee', 'dsds', 'image-1746004003927-406052949.avif', 'MH01AC1234', '600000', '4000M', 'Tamil Nadu', 'Coimbatore', 'Petrol', 'Third-party', 5, '2500', 'MH01', '554', '150', '118', 5, '345', 'Automatic', 2024, 17, 11, '2024', '2nd Owner', 'SUV', 1),
	(9, '	To Kill a Mockingbird', 'dsdsd', 'image-1746613501714-615145822.avif', 'MH01AC1234', '3434.00', '4000M', 'Maharashtra', 'Mumbai', 'Petrol', 'Third-party', 5, '2500', 'MH01', '554', '150', '118', 5, '345', 'Automatic', 2023, 17, 12, '2023', '2nd Owner', 'Luxury', 6);
/*!40000 ALTER TABLE `used_car_detail` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobileNumber` varchar(15) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `isAdmin` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_61dc14c8c49c187f5d08047c98` (`mobileNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.users: ~37 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `mobileNumber`, `name`, `isActive`, `createdAt`, `updatedAt`, `isAdmin`) VALUES
	(1, '9617894754', 'Trinks', 1, '2025-04-22 12:41:36.771497', '2025-04-29 14:10:03.000000', 0),
	(2, '8821898181', 'User', 1, '2025-04-22 16:17:52.475458', '2025-04-22 16:17:52.475458', 0),
	(3, '8976845986', 'User', 1, '2025-04-23 10:38:22.995788', '2025-04-23 10:38:22.995788', 0),
	(4, '9089456765', 'User', 1, '2025-04-23 10:40:09.256328', '2025-04-23 10:40:09.256328', 0),
	(5, '8765712345', 'User', 1, '2025-04-24 12:15:36.983828', '2025-04-24 12:15:36.983828', 0),
	(6, '8796586524', 'User', 1, '2025-04-24 12:36:26.319864', '2025-04-24 12:36:26.319864', 0),
	(7, '8821898282', 'User', 1, '2025-04-24 12:57:04.592671', '2025-04-24 12:57:04.592671', 0),
	(8, '8495867253', 'User', 1, '2025-04-24 12:57:52.011568', '2025-04-24 12:57:52.011568', 0),
	(9, '8389123456', 'User', 1, '2025-04-24 13:03:10.007496', '2025-04-24 13:03:10.007496', 0),
	(10, '9874567890', 'User', 1, '2025-04-24 14:33:54.222971', '2025-04-24 14:33:54.222971', 0),
	(11, '9867893457', 'User', 1, '2025-04-24 14:43:48.174810', '2025-04-24 14:43:48.174810', 0),
	(12, '9874567892', 'User', 1, '2025-04-24 15:01:50.705179', '2025-04-24 15:01:50.705179', 0),
	(13, '9823456789', 'User', 1, '2025-04-24 15:06:16.604124', '2025-04-24 15:06:16.604124', 0),
	(14, '9876789453', 'User', 1, '2025-04-24 15:54:34.857220', '2025-04-24 15:54:34.857220', 0),
	(15, '9980768976', 'User', 1, '2025-04-24 16:49:04.686615', '2025-04-24 16:49:04.686615', 0),
	(16, '9874567658', 'User', 1, '2025-04-24 16:57:14.305408', '2025-04-24 16:57:14.305408', 0),
	(17, '9870567812', 'User', 1, '2025-04-24 18:04:09.328848', '2025-04-24 18:04:09.328848', 0),
	(18, '9812345689', 'User', 1, '2025-04-24 18:10:58.382294', '2025-04-24 18:10:58.382294', 0),
	(19, '9078123456', 'User', 1, '2025-04-25 16:33:19.553400', '2025-04-25 16:33:19.553400', 0),
	(20, '9087678906', 'User', 1, '2025-04-28 10:19:12.270934', '2025-04-28 10:19:12.270934', 0),
	(21, '9876541234', 'User', 1, '2025-04-28 11:17:17.018130', '2025-04-28 11:17:17.018130', 0),
	(22, '8908765789', 'User', 1, '2025-04-28 11:18:03.408986', '2025-04-28 11:18:03.408986', 0),
	(23, '9080996677', 'User', 1, '2025-04-28 11:22:03.418906', '2025-04-28 11:22:03.418906', 0),
	(24, '8795869079', 'User', 1, '2025-04-28 11:24:02.947348', '2025-04-28 11:24:02.947348', 0),
	(25, '9870567412', 'abc', 1, '2025-04-28 11:35:55.339402', '2025-04-28 11:35:55.339402', 0),
	(26, '8945612345', 'Trinkas', 1, '2025-04-28 11:41:55.143265', '2025-04-28 11:41:55.143265', 0),
	(27, '8674980989', 'abc', 1, '2025-04-28 11:45:37.055609', '2025-04-28 11:45:37.055609', 0),
	(28, '9999955441', 'Trinka Singh', 1, '2025-04-28 11:50:14.020411', '2025-04-28 11:50:14.020411', 0),
	(29, '8909809890', 'Trinka', 1, '2025-04-28 11:53:02.528629', '2025-04-28 11:53:02.528629', 0),
	(30, '9867897867', 'Trinka', 1, '2025-04-28 11:55:00.930606', '2025-04-28 11:55:00.930606', 0),
	(31, '6758986789', 'trinka', 1, '2025-04-28 11:56:45.131576', '2025-04-28 18:43:56.000000', 0),
	(32, '9865234124', 'Trinka', 1, '2025-04-28 11:58:42.314504', '2025-04-28 11:58:42.314504', 0),
	(33, '9090899090', 'vrushali', 1, '2025-04-28 18:38:33.012504', '2025-04-28 18:38:33.012504', 0),
	(34, '9089761234', 'vrushali', 1, '2025-04-28 18:39:43.905483', '2025-04-28 18:39:43.905483', 0),
	(35, '9876543212', 'Trinka', 1, '2025-04-29 14:09:01.346528', '2025-04-29 14:09:01.346528', 0),
	(36, '8965781234', 'TrinkaSingh', 1, '2025-04-29 14:12:12.535424', '2025-04-29 14:12:12.535424', 0),
	(37, '9011223345', 'Trinkas', 1, '2025-04-29 14:45:50.931374', '2025-04-29 14:45:50.931374', 0),
	(38, '9090909090', 'trink', 1, '2025-04-29 14:46:33.942765', '2025-04-29 14:46:33.942765', 0),
	(39, '9098123456', 'trink', 1, '2025-04-29 14:51:41.902018', '2025-04-29 14:51:41.902018', 0),
	(40, '9801234589', 'trink', 1, '2025-04-29 15:03:13.251692', '2025-04-29 15:03:13.251692', 0),
	(41, '9870989890', 'Trink', 1, '2025-04-29 15:26:01.147859', '2025-04-29 15:26:01.147859', 0),
	(42, '9087965435', 'Trinks', 1, '2025-04-29 15:36:05.707761', '2025-04-29 15:36:05.707761', 0),
	(43, '9878976545', 'trinka', 1, '2025-05-07 15:52:29.684094', '2025-05-07 15:52:29.684094', 0),
	(44, '9089098909', 'trinka', 1, '2025-05-07 16:08:34.816780', '2025-05-07 16:08:34.816780', 0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table car_dekho_app_db.variant
CREATE TABLE IF NOT EXISTS `variant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `engine` varchar(255) NOT NULL,
  `power` varchar(255) NOT NULL,
  `transmission` varchar(255) NOT NULL,
  `torgue` varchar(255) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  `mileage` varchar(255) NOT NULL,
  `fueltype` varchar(255) NOT NULL,
  `modelModelId` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `seating_capacity` int(11) NOT NULL,
  `body_type` varchar(255) NOT NULL,
  `launch_status` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9c7876bcef17a7a9dcaf1812c46` (`modelModelId`),
  CONSTRAINT `FK_9c7876bcef17a7a9dcaf1812c46` FOREIGN KEY (`modelModelId`) REFERENCES `model` (`modelId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

-- Dumping data for table car_dekho_app_db.variant: ~53 rows (approximately)
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
INSERT INTO `variant` (`id`, `name`, `engine`, `power`, `transmission`, `torgue`, `images`, `mileage`, `fueltype`, `modelModelId`, `price`, `seating_capacity`, `body_type`, `launch_status`, `year`) VALUES
	(1, 'Alto 800 tour H1 (petrol)', '796 cc', '47.33 bhp', 'Manual', '69 Nm', '1745228778842-447050717-alto-touw-hw-petrol.avif', '22.05 kmpl', 'Petrol', 1, 450000.00, 0, 'SUV', 'Newly Laucnh', 0),
	(2, 'Mahindra BE ', '796 cc', '47.33 bhp', 'Manual', '69 Nm', '1743744083021-756710786-Mahindra BE6.avif', '22.05 kmpl', 'Electric', 6, 450000.00, 0, 'SUV', 'Newly Laucnh', 0),
	(3, 'Mahindra XEV 9e', '796 cc', '47.33 bhp', 'Manual', '69 Nm', '1743744143737-87006550-Mahindra BE6.avif', '22.05 kmpl', 'Electric', 6, 450000.00, 0, 'SUV', 'Newly Laucnh', 0),
	(4, 'Alto 800 tour H1 (O)', '796 cc', '47.33 bhp', 'Manual', '69 Nm', 'alto-h1.jpg', '22.05 kmpl', 'Petrol', 1, 500000.00, 0, 'Hatchback', '', 0),
	(5, 'Alto 800 tour H2', '796 cc', '47.33 bhp', 'Manual', '69 Nm', 'alto-h2.jpg', '22.05 kmpl', 'Petrol', 1, 500000.00, 0, 'Hatchback', '', 0),
	(6, 'Swift LXi', '1197 cc', '89 bhp', 'Manual', '113 Nm', 'swift-lxi.jpg', '23.2 kmpl', 'Petrol', 2, 500000.00, 0, 'Hatchback', '', 0),
	(7, 'Swift VXi', '1197 cc', '89 bhp', 'Manual', '113 Nm', 'swift-vxi.jpg', '23.2 kmpl', 'Petrol', 2, 600000.00, 0, 'Hatchback', '', 0),
	(8, 'Swift ZXi', '1197 cc', '89 bhp', 'Automatic', '113 Nm', 'swift-zxi.jpg', '22.56 kmpl', 'Petrol', 2, 600000.00, 0, 'Hatchback', '', 0),
	(9, 'Baleno Sigma', '1197 cc', '89 bhp', 'Manual', '113 Nm', 'baleno-sigma.jpg', '22.35 kmpl', 'Petrol', 3, 600000.00, 0, 'Hatchback', '', 0),
	(10, 'Baleno Delta', '1197 cc', '89 bhp', 'Manual', '113 Nm', 'baleno-delta.jpg', '22.35 kmpl', 'Petrol', 3, 700000.00, 0, 'Sedan', '', 0),
	(11, 'i10 Era', '1086 cc', '68 bhp', 'Manual', '99 Nm', 'i10-era.jpg', '20.36 kmpl', 'Petrol', 4, 800000.00, 0, 'Sedan', '', 0),
	(12, 'i10 Magna', '1086 cc', '68 bhp', 'Manual', '99 Nm', 'i10-magna.jpg', '20.36 kmpl', 'Petrol', 4, 400000.00, 0, 'Sedan', '', 0),
	(13, 'i20 Magna', '1197 cc', '82 bhp', 'Manual', '115 Nm', 'i20-magna.jpg', '20.35 kmpl', 'Petrol', 5, 1000000.00, 0, 'Sedan', '', 0),
	(14, 'i20 Sportz', '1197 cc', '82 bhp', 'Manual', '115 Nm', 'i20-sportz.jpg', '20.35 kmpl', 'Petrol', 5, 1000000.00, 0, 'Sedan', '', 0),
	(15, 'i20 Asta', '1197 cc', '82 bhp', 'Automatic', '115 Nm', 'i20-asta.jpg', '19.65 kmpl', 'Petrol', 5, 1000000.00, 0, 'Hatchback', '', 0),
	(16, 'Creta E', '1497 cc', '113 bhp', 'Manual', '250 Nm', 'creta-e.jpg', '21.4 kmpl', 'Diesel', 6, 900000.00, 0, 'SUV', '', 0),
	(17, 'Creta S', '1497 cc', '113 bhp', 'Manual', '250 Nm', 'creta-s.jpg', '21.4 kmpl', 'Diesel', 6, 900000.00, 0, 'SUV', '', 0),
	(18, 'Creta SX', '1497 cc', '113 bhp', 'Automatic', '250 Nm', 'creta-sx.jpg', '18.5 kmpl', 'Diesel', 6, 900000.00, 0, 'SUV', '', 0),
	(21, 'Nexon XZ', '1199 cc', '118 bhp', 'Automatic', '170 Nm', 'nexon-xz.jpg', '16.8 kmpl', 'Petrol', 7, 800000.00, 0, 'Hatchback', '', 0),
	(22, 'Harrier XE', '1956 cc', '168 bhp', 'Manual', '350 Nm', 'harrier-xe.jpg', '16.35 kmpl', 'Diesel', 8, 700000.00, 0, 'Hatchback', '', 0),
	(23, 'Harrier XM', '1956 cc', '168 bhp', 'Manual', '350 Nm', 'harrier-xm.jpg', '16.35 kmpl', 'Diesel', 8, 700000.00, 0, 'Hatchback', '', 0),
	(24, 'XUV700 MX', '1997 cc', '197 bhp', 'Manual', '380 Nm', 'xuv700-mx.jpg', '16.35 kmpl', 'Diesel', 10, 700000.00, 0, 'SUV', '', 0),
	(25, 'XUV700 AX3', '1997 cc', '197 bhp', 'Manual', '380 Nm', 'xuv700-ax3.jpg', '16.35 kmpl', 'Diesel', 10, 600000.00, 0, 'SUV', '', 0),
	(26, 'XUV700 AX5', '1997 cc', '197 bhp', 'Automatic', '380 Nm', 'xuv700-ax5.jpg', '15.95 kmpl', 'Diesel', 10, 600000.00, 0, 'SUV', '', 0),
	(27, 'Scorpio S3', '2179 cc', '140 bhp', 'Manual', '320 Nm', 'scorpio-s3.jpg', '15.4 kmpl', 'Diesel', 11, 600000.00, 0, 'Luxury', '', 0),
	(28, 'Scorpio S5', '2179 cc', '140 bhp', 'Manual', '320 Nm', 'scorpio-s5.jpg', '15.4 kmpl', 'Diesel', 11, 500000.00, 0, 'Luxury', '', 0),
	(29, 'Scorpio S7', '2179 cc', '140 bhp', 'Manual', '320 Nm', 'scorpio-s7.jpg', '15.4 kmpl', 'Diesel', 11, 500000.00, 0, 'Luxury', '', 0),
	(30, 'City V', '1498 cc', '121 bhp', 'Manual', '145 Nm', 'city-v.jpg', '17.8 kmpl', 'Petrol', 13, 500000.00, 0, 'MUV', '', 0),
	(31, 'City VX', '1498 cc', '121 bhp', 'Manual', '145 Nm', 'city-vx.jpg', '17.8 kmpl', 'Petrol', 13, 400000.00, 0, 'MUV', '', 0),
	(32, 'City ZX', '1498 cc', '121 bhp', 'Automatic', '145 Nm', 'city-zx.jpg', '16.2 kmpl', 'Petrol', 13, 400000.00, 0, 'MUV', '', 0),
	(33, 'Alto K10 STD', '998 cc', '65.71 bhp', 'Manual', '69 Nm', '1744960931298-994267867-Altok2 variant.avif', '24.39 kmpl', 'Petrol', 2, 420000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(34, 'Alto K10 LXI', '998 cc', '65.71 bhp', 'Manual', '69 Nm', '1744961236298-567603404-Altok2 variant.avif', '24.39 kmpl', 'Petrol', 2, 499000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(35, 'Alto K10 VXI', '998 cc', '65.71 bhp', 'Manual', '69 Nm', '1744961763171-127743519-alto k10vxi.avif', '24.39 kmpl', 'Petrol', 2, 499000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(36, 'Alto K10 VXI Plus', '998 cc', '65.71 bhp', 'Manual', '69 Nm', '1744961927518-157055338-AltoK10 plus.avif', '24.39 kmpl', 'Petrol', 2, 559000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(37, 'Baleno Sigma', '1197 cc', '88.50 bhp', 'Manual', '113Nm@4400rpm', '1746163977713-579330722-maruti-baleno-sigma.avif', '22.35 kmpl', 'Petrol', 3, 670000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(38, 'Baleno Delta', '1197 cc', '88.50 bhp', 'Manual', '113Nm@4400rpm', '1746164077500-522054093-maruti-baleno-sigma.avif', '22.35 kmpl', 'Petrol', 3, 7540000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(39, 'Maruti Baleno Delta CNG', '1197 cc', '76.43 bhp', 'Manual', '113Nm@4400rpm', '1746164270205-350643668-maruti-baleno-sigma.avif', '30.61 km/kg', 'CNG', 3, 844000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(40, 'Maruti Baleno Zeta', '1197 cc', '88.50 bhp', 'Manual', '113Nm@4400rpm', '1746164368874-186444992-maruti-baleno-sigma.avif', '30.61 km/kg', 'Petrol', 3, 844000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(41, 'Maruti Baleno Alpha AMT', '1197 cc', '88.50 bhp', 'Manual', '113Nm@4400rpm', '1746164471141-135480563-maruti-baleno-sigma.avif', '22.94 kmpl', 'Petrol', 3, 992000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(42, 'Maruti Brezza Lxi', '1197 cc', '101.64 bhp', 'Manual', '136.8Nm@4400rpm', '1746164835906-158282655-maruti-breza-variants.avif', '17.38 kmpl', 'Petrol', 4, 869000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(43, 'Maruti Brezza Lxi CNG', '1462 cc', '86.63 bhp', 'Manual', '136.8Nm@4400rpm', '1746164959198-548381033-maruti-breza-variants.avif', '25.51 km/kg', 'CNG', 4, 964000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(44, 'Tata Altroz XE', '1199 cc', '86.79 bhp', 'Manual', '136.8Nm@4400rpm', '1746165435850-300211895-Tata-altroz-variants.avif', '19.33 kmpl', 'Petrol', 5, 665000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(45, 'Tata Altroz XM', '1199 cc', '86.79 bhp', 'Manual', '136.8Nm@4400rpm', '1746165471150-74748019-Tata-altroz-variants.avif', '19.33 kmpl', 'Petrol', 5, 690000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(46, 'Tata Altroz Racer R1', '1199 cc', '118.35 bhp', 'Manual', '136.8Nm@4400rpm', '1746165756704-412875320-tataaltroz-model.avif', '18 kmpl', 'Petrol', 6, 950000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(47, 'Tata Altroz Racer R2', '1199 cc', '118.35 bhp', 'Manual', '136.8Nm@4400rpm', '1746165794735-284489536-tataaltroz-model.avif', '18 kmpl', 'Petrol', 6, 1050000.00, 5, 'Hatchback', 'Newly Launch', 2025),
	(48, 'Tata Harrier Smart', '1956 cc', '167.62 bhp', 'Manual', '136.8Nm@4400rpm', '1746166004405-248016133-tata-harrier-model.avif', '18 kmpl', 'Diesel', 7, 1050000.00, 5, 'Sport Utilities', 'Newly Launch', 2025),
	(49, 'Tata Harrier Pure', '1956 cc', '167.62 bhp', 'Manual', '350Nm@1750-2500rpm', '1746166109206-207254918-tata-harrier-model.avif', '16.8 kmpl', 'Diesel', 7, 1685000.00, 5, 'Sport Utilities', 'Newly Launch', 2025),
	(50, 'Kia Carens Premium', '1497 cc', '167.62 bhp', 'Manual', '144Nm@4500rpm', '1746166358283-919657693-kia-karens-moedel.avif', '15 kmpl', 'Petrol', 8, 1060000.00, 6, 'MUV', 'Newly Launch', 2025),
	(51, 'Kia Carens Prestige Opt 6 STR', '1497 cc', '113.42bhp', 'Manual', '144Nm@4500rpm', '1746166468910-286406829-kia-karens-moedel.avif', '11.2 kmpl', 'Petrol', 8, 12000.00, 6, 'MUV', 'Newly Launch', 2025),
	(52, 'Kia Seltos HTE (O)', '1497 cc', '113.42bhp', 'Manual', '144Nm@4500rpm', '1746166692880-982707661-kisa-seltos-variants.avif', '11.2 kmpl', 'Petrol', 9, 12000.00, 5, 'SUV', 'Newly Launch', 2025),
	(53, 'Kia Seltos HTE (O) Diesel', '1497 cc', '113.42bhp', 'Manual', '144Nm@4500rpm', '1746166767881-341333615-kisa-seltos-variants.avif', '11.2 kmpl', 'Diesel', 9, 1271000.00, 5, 'SUV', 'Newly Launch', 2025),
	(54, 'Kia Seltos HTE (O) Diesel', '1497 cc', '113.42bhp', 'Manual', '144Nm@4500rpm', '1746166785061-732806813-kisa-seltos-variants.avif', '11.2 kmpl', 'Diesel', 9, 1271000.00, 5, 'SUV', 'Newly Launch', 2025),
	(55, 'Toyota Camry Elegance', '2487 cc', '227 bhp', 'Automatic', '221Nm@3600-5200rpm', '1746167088468-398504560-toyota-camry.avif', '25.49 kmpl', 'Petrol', 10, 4865000.00, 5, 'Sedan', 'Newly Launch', 2025);
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
