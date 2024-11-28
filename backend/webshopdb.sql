-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2024 at 11:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webshopdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartitem`
--

CREATE TABLE `cartitem` (
  `CartItemId` int(11) NOT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `VariantId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cartitem`
--

INSERT INTO `cartitem` (`CartItemId`, `CustomerId`, `quantity`, `ProductId`, `VariantId`) VALUES
(141, 98, 4, 1, NULL),
(142, 102, 3, 19, 8),
(143, 102, 4, 2, NULL),
(144, 102, 3, 29, NULL),
(145, 102, 2, 26, 10),
(146, 105, 3, 19, 8),
(147, 105, 3, 2, NULL),
(148, 105, 2, 26, 11),
(151, 110, 3, 5, NULL),
(152, 110, 3, 19, 8),
(153, 110, 3, 2, NULL),
(154, 110, 3, 1, NULL),
(155, 110, 3, 26, 11);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CategoryId`, `title`) VALUES
(1, 'Fruits'),
(2, 'Vegetables'),
(3, 'Snacks');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CustomerId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`CustomerId`, `name`, `email`, `address`, `password`) VALUES
(98, 'Nini', 'nini@nini.com', '456 Elm St Apt 789, Othertown, TX 67890-1234', 'Nini1111'),
(99, 'test1', 'caxome5291@merotx.com', '456 Elm St Apt 789, Othertown, TX 67890-1234', 'Nini1234'),
(100, 'Hadeel', 'hadielirek+test@gmail.com', '123 Main Street, Springfield, IL 62704', 'Test1111'),
(101, 'hadeel', 'hadielirek@gmail.com', '123 Main Street, Springfield, IL 62704', 'Password123'),
(102, 'user', 'user@user.com', '123 Main Street, Springfield, IL 62704', 'RandomPassword1111'),
(105, 'user1', 'user1@gmail.com', '123 Main Street, Springfield, IL 62704', 'RandomPassword1212'),
(108, 'hi', 'test@testing.com', '123 Main Street, Springfield, IL 62704', 'testTwst12121'),
(110, 'someone', 'someone@gmail.com', '123 Main Street, Springfield, IL 62704', 'Someone123');

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `OrderItemId` int(11) NOT NULL,
  `OrderId` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `VariantId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`OrderItemId`, `OrderId`, `ProductId`, `VariantId`, `quantity`) VALUES
(51, 38, 13, NULL, 3),
(52, 38, 26, 10, 2),
(53, 43, 5, NULL, 5),
(54, 44, 19, 7, 2),
(55, 45, 8, 2, 1),
(56, 45, 13, NULL, 5),
(57, 47, 7, NULL, 1),
(58, 48, 5, NULL, 2),
(59, 49, 7, NULL, 2),
(60, 50, 19, 8, 2),
(61, 51, 2, NULL, 1),
(62, 52, 5, NULL, 1),
(63, 53, 7, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderId` int(11) NOT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `totalPrice` decimal(10,2) NOT NULL,
  `VoucherId` int(11) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderId`, `CustomerId`, `createdAt`, `totalPrice`, `VoucherId`, `discount`) VALUES
(38, 98, '2024-11-21 18:47:24', 11.60, 1, 1.00),
(43, 98, '2024-11-22 11:12:45', 65.00, 1, 1.00),
(44, 98, '2024-11-22 11:27:52', 3.00, 3, 2.00),
(45, 98, '2024-11-22 12:09:41', 13.95, 3, 2.00),
(47, 98, '2024-11-23 12:31:55', 2.66, NULL, 0.00),
(48, 100, '2024-11-26 17:22:27', 26.40, NULL, 0.00),
(49, 100, '2024-11-26 17:23:31', 5.32, NULL, 0.00),
(50, 100, '2024-11-26 17:25:50', 5.00, NULL, 0.00),
(51, 100, '2024-11-26 17:27:31', 2.48, NULL, 0.00),
(52, 100, '2024-11-26 17:29:46', 13.20, NULL, 0.00),
(53, 100, '2024-11-26 17:31:49', 2.66, NULL, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ProductId` int(11) NOT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `subTitle` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `CategoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ProductId`, `Image`, `title`, `subTitle`, `description`, `price`, `stock`, `CategoryId`) VALUES
(1, '/images/watermelon.jpg', 'Watermelon', 'Fresh Watermelon - 1item', 'Juicy and refreshing for optimal hydration. Rich in vitamins A and C. Ideal for snacking, salads, and beverages. Perfect for a cooling treat on a hot day.', 2.68, 97, 1),
(2, '/images/strawberry.webp', 'Strawberries', 'Fresh Strawberries - 500g', 'Delight in the juicy, sweet flavor of fresh strawberries. Handpicked for optimal freshness and taste. Perfect for snacking, desserts, or adding to your favorite recipes. A healthy and delicious treat for any occasion.', 2.48, 89, 1),
(3, '/images/Peach.jpg', 'Peach', 'Fresh Peach - 1 Item', 'Enjoy the juicy and sweet taste of a ripe peach. Handpicked for exceptional flavor and freshness. Ideal for snacking, desserts, or adding to your favorite dishes. A delicious and refreshing treat for any time of the day.', 2.50, 99, 1),
(4, '/images/appricots.webp', 'Appricot', 'Fresh Apricots - 1kg', 'Experience the sweet flavor of fresh apricots. Handpicked at peak ripeness for optimal taste and texture. Perfect for snacking, adding to desserts, or making jams. A delightful and nutritious treat for any time of the year.', 8.25, 98, 1),
(5, '/images/cherry.jpg', 'Cherry', 'Fresh Cherries - 1kg', 'Experience the juicy sweetness of fresh cherries. Handpicked at the peak of ripeness for a burst of flavor. Perfect for snacking, adding to desserts, or enjoying with a bit of chocolate. Very delightful treat.', 13.20, 83, 1),
(6, '/images/pineapple.jpg', 'Pineapple', 'Fresh Pineapple - 1 Item', 'Experience the tropical sweetness of a fresh pineapple. Handpicked for the perfect balance of tangy and sweet. Ideal for snacking, adding to fruit salads, or grilling. A refreshing and flavorful treat for any occasion.', 2.50, 96, 1),
(7, '/images/Kiwi.webp', 'Kiwi', 'Fresh Kiwis - 1 item', 'Experience the vibrant taste of fresh kiwis. Handpicked at the peak of ripeness for a burst of sweet flavor. Perfect for snacking, adding to fruit salads, or blending into smoothies. A delightful and nutritious treat.', 2.66, 81, 1),
(8, '/images/grapes.jpg', 'Grapes', 'Fresh Grapes - 1kg', 'Enjoy the sweet and juicy flavor of fresh grapes. Handpicked for the perfect balance of sweetness and tartness. Ideal for snacking, adding to salads, or making juice. A refreshing and nutritious treat for any time of the year.', 4.95, 92, 1),
(9, '/images/apples.webp', 'Apples', 'Fresh Apples - 1kg', 'Enjoy the crisp and juicy flavor of fresh apples. Handpicked for the perfect balance of sweetness and tartness. Ideal for snacking, adding to salads, or baking. A versatile and nutritious treat for any time of the year.', 3.30, 94, 1),
(11, '/images/tomatoes.jpg', 'Tomatoes', 'Fresh Tomatoes - 1kg', 'Juicy and versatile for various dishes. Rich in vitamins A and C. Ideal for salads, sauces, and salsas. Perfect for adding a fresh taste to your meals.', 3.00, 98, 2),
(12, '/images/carrots.webp', 'Carrots', 'Fresh Carrots - 500g', 'Enjoy the crisp, sweet crunch of fresh carrots. Selected for optimal freshness and flavor. Ideal for snacking, salads, or adding to your favorite dishes. A nutritious and versatile ingredient for any meal.', 3.25, 100, 2),
(13, '/images/Lemons.jpg', 'Lemons', 'Fresh Lemons - 1kg', 'Freshly picked for optimal flavor. Rich in vitamin C and antioxidants. Ideal for cooking, baking, and beverages. Perfect for garnishing and flavoring.', 2.20, 483, 2),
(14, '/images/lime.jpg', 'Lime', 'Fresh Limes - 1kg', 'Enjoy the tangy, fresh taste of limes. Handpicked for the best quality and flavor. Great for adding a splash of flavor to food, drinks, or recipes. A handy and refreshing ingredient for many dishes.', 3.50, 94, 2),
(15, '/images/corn.avif', 'Corn', 'Fresh Corn - 1 item', 'Experience the crisp, sweet flavor of fresh corn. Harvested at the peak of ripeness for maximum sweetness. Perfect for grilling, adding to salads, or enjoying on the cob. A delicious and nutritious treat.', 2.66, 100, 2),
(16, '/images/lettuce.jpg', 'Lettuce', 'Fresh Lettuce - 250g', 'Enjoy the crisp, fresh taste of lettuce. Selected for its freshness and crunch. Perfect for salads, sandwiches, or as a crunchy addition to meals. A versatile and healthy ingredient for any dish.', 3.00, 100, 2),
(17, '/images/cucumber.webp', 'Cucumber', 'Fresh Cucumbers - 700g', 'Enjoy the refreshing crunch of fresh cucumbers. Handpicked for the best quality and crispiness. Perfect for salads, sandwiches, or as a healthy snack. A versatile and hydrating ingredient for your meals.', 3.25, 100, 2),
(18, '/images/cabbage.jpg', 'Cabbage', 'Fresh Cabbage - 1kg', 'Enjoy the crisp, fresh taste of cabbage. Selected for its quality and crunch. Ideal for salads, soups, or as a side dish. A versatile and nutritious ingredient for any meal.', 2.60, 98, 2),
(19, '/images/capsicum.jfif', 'Capsicum', 'Fresh Capsicum - 1 piece', 'Experience the crisp and sweet taste of fresh capsicum. Picked for its bright color and freshness. Great for salads, stir-fries, or as a crunchy snack. A useful and healthy addition to many dishes.', 2.50, 92, 2),
(20, '/images/chocolate2.jpg', 'Chocolate', 'Frey Chocolate - 1 piece', 'Indulge in the rich and smooth flavor of Frey chocolate.Crafted with high-quality ingredients for a premium taste.Ideal for a sweet treat, dessert, or a special snack.Great for enjoying a moment of chocolate bliss.', 2.50, 100, 3),
(21, '/images/juice.jpg', 'Juice', 'Fresh Juice - 1 bottle', 'Savor the refreshing and natural flavor of fresh juice.Made with high-quality ingredients for a crisp taste.Ideal for a quick drink, breakfast, or a revitalizing snack.A tasty and convenient way to stay hydrated.', 2.50, 97, 3),
(22, '/images/icecream.avif', 'Ice Cream', 'Ice Cream - 1 item - 700g', 'Indulge in the creamy and rich taste of premium ice cream.Made with high-quality ingredients for a delightful treat.Perfect for a sweet dessert, special occasions, or a refreshing snack.A delicious and satisfying choice for any time of the day.', 5.00, 100, 3),
(23, '/images/candies.jfif', 'Candies', 'Candy - 45g', 'Savor the flavorful taste of premium candy.Made with quality ingredients for a delightful treat.Perfect for a quick snack, party favor, or a little indulgence.A tasty and enjoyable option.', 3.30, 94, 3),
(24, '/images/Cookie.webp', 'Cookie', 'Cookie - 1 piece', 'Savor the delicious and freshly baked taste of a cookie.Made with quality ingredients for a rich and satisfying treat.Ideal for a quick snack, dessert, or a sweet indulgence.A delightful choice for any time of the day.', 4.00, 100, 3),
(25, '/images/chips.png', 'Chips', 'Chips - 36g', 'Enjoy the crispy and savory flavor of fresh chips.Made with quality ingredients for a satisfying crunch.Perfect for snacking, parties, or as a tasty side.A convenient and delicious choice for any snack time.', 4.25, 6, 3),
(26, '/images/popCorn.webp', 'PopCorn', 'Vanilla Popcorn - 1 item', 'Enjoy the light and fluffy texture of freshly popped popcorn.Made with high-quality kernels for a satisfying snack.Perfect for movie nights, parties, or a quick treat.A classic and tasty option for any occasion.', 3.00, 91, 3),
(27, '/images/oreo.avif', 'Oreo', 'Oreo Cookies - 300g', 'Deliciously crunchy and creamyMade with a classic chocolate wafer and rich cream fillingIdeal for snacking, desserts, and recipes', 3.50, 100, 3),
(28, '/images/hersheys-milk-chocolate.webp', 'Chocolate', 'Hershey\'s Milk Chocolate - 100g', 'Indulge in the smooth, creamy taste of Hershey\'s Milk Chocolate.Made with the finest cocoa beans for a rich, velvety flavor.Perfect for snacking, baking, or enjoying with a cup of coffee.A timeless treat for all ages.', 5.32, 100, 3),
(29, '/images/strawberryCake.jpg', 'Cake Slice', 'Cake Slice - 1 piece', 'Enjoy a slice of delicious, freshly baked cake.Made with high-quality ingredients for a rich and satisfying flavor.Perfect for a sweet treat, dessert, or special occasion.A delightful choice for indulging in a little bit of luxury.', 4.00, 100, 3),
(30, '/images/marshmallow.webp', 'Marshmallow', 'Marshmallows - 500g', 'Enjoy the soft and fluffy texture of premium marshmallows.Made with high-quality ingredients for a sweet and satisfying treat.Perfect for snacking, adding to hot chocolate, or making s\'mores.A delightful choice for a fun and sweet indulgence.', 3.00, 100, 3),
(31, '/images/custardTart.webp', 'Custard Tart', 'Custard Tart - 1 piece', 'Enjoy the creamy and smooth filling of a freshly baked custard tart.Made with high-quality ingredients for a rich and satisfying taste.Perfect as a dessert, for special occasions, or as a sweet treat.A delightful choice for indulging in a classic dessert.', 4.00, 100, 3),
(32, '/images/water.webp', 'Water', 'Water Bottle - 1 bottle', 'Stay hydrated with a refreshing bottle of water.Purified and ready to quench your thirst.Ideal for on-the-go, during workouts, or with meals.A convenient and essential choice for daily hydration.', 2.50, 94, 3),
(33, '/images/sugarCubes.jpg', 'Sugar Cubes', 'Sugar Cubes - 100 cubes', 'Sweeten your beverages with premium sugar cubes.Made with high-quality sugar for consistent sweetness.Ideal for coffee, tea, or any beverage needing a touch of sweetness.A convenient and classic choice for sweetening drinks.', 2.10, 100, 3),
(34, '/images/Milk.jpg', 'Pure Milk\r\n', 'Premium Quality - 1 Liter of Natural Milk', 'Enjoy the rich and creamy taste of our Fresh & Pure 1L Milk Carton. Sourced from trusted local dairy farms, this milk is packed with essential nutrients and is perfect for your daily needs. Whether you’re adding it to your coffee, cereal, or baking.', 2.20, 100, 3);

-- --------------------------------------------------------

--
-- Table structure for table `resetpasswordtoken`
--

CREATE TABLE `resetpasswordtoken` (
  `resetPasswordTokenId` int(11) NOT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `variant`
--

CREATE TABLE `variant` (
  `VariantId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `ProductId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `variant`
--

INSERT INTO `variant` (`VariantId`, `title`, `ProductId`) VALUES
(1, 'Green', 8),
(2, 'Purple', 8),
(3, 'Red', 8),
(4, 'Red', 9),
(5, 'Green', 9),
(6, 'Yellow', 9),
(7, 'Red', 19),
(8, 'Green', 19),
(9, 'Yellow', 19),
(10, 'S', 26),
(11, 'M', 26),
(12, 'L', 26),
(13, 'Orange', 21),
(14, 'Pineapple', 21),
(15, 'Berries', 21),
(16, 'Strawberry', 22),
(17, 'Vanilla', 22),
(18, 'Sour', 23),
(19, 'Original', 23);

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `VoucherId` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `Code` varchar(255) NOT NULL,
  `minSpend` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`VoucherId`, `amount`, `Code`, `minSpend`) VALUES
(1, 1.00, 'CODE01', 0.00),
(3, 2.00, 'CODE02', 0.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD PRIMARY KEY (`CartItemId`),
  ADD KEY `CustomerId` (`CustomerId`),
  ADD KEY `ProductId` (`ProductId`),
  ADD KEY `VariantId` (`VariantId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryId`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CustomerId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`OrderItemId`),
  ADD KEY `OrderId` (`OrderId`),
  ADD KEY `ProductId` (`ProductId`),
  ADD KEY `VariantId` (`VariantId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderId`),
  ADD KEY `CustomerId` (`CustomerId`),
  ADD KEY `VoucherId` (`VoucherId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductId`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `resetpasswordtoken`
--
ALTER TABLE `resetpasswordtoken`
  ADD PRIMARY KEY (`resetPasswordTokenId`),
  ADD KEY `CustomerId` (`CustomerId`);

--
-- Indexes for table `variant`
--
ALTER TABLE `variant`
  ADD PRIMARY KEY (`VariantId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`VoucherId`),
  ADD UNIQUE KEY `Code` (`Code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartitem`
--
ALTER TABLE `cartitem`
  MODIFY `CartItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `CustomerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `OrderItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `resetpasswordtoken`
--
ALTER TABLE `resetpasswordtoken`
  MODIFY `resetPasswordTokenId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `variant`
--
ALTER TABLE `variant`
  MODIFY `VariantId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `VoucherId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`CustomerId`),
  ADD CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`),
  ADD CONSTRAINT `cartitem_ibfk_3` FOREIGN KEY (`VariantId`) REFERENCES `variant` (`VariantId`);

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`OrderId`),
  ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`),
  ADD CONSTRAINT `orderitem_ibfk_3` FOREIGN KEY (`VariantId`) REFERENCES `variant` (`VariantId`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`CustomerId`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`VoucherId`) REFERENCES `vouchers` (`VoucherId`) ON DELETE SET NULL;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`CategoryId`) ON DELETE SET NULL;

--
-- Constraints for table `resetpasswordtoken`
--
ALTER TABLE `resetpasswordtoken`
  ADD CONSTRAINT `resetpasswordtoken_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`CustomerId`) ON DELETE CASCADE;

--
-- Constraints for table `variant`
--
ALTER TABLE `variant`
  ADD CONSTRAINT `variant_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
