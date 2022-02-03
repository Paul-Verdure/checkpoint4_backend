DROP TABLE IF EXISTS `gardenSpots`;
DROP TABLE IF EXISTS `gardens`;
DROP TABLE IF EXISTS `plants`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(350) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `isAdmin` BOOLEAN NOT NULL
);

INSERT INTO `users` (`userName`, `email`, `password`, `isAdmin`) 
VALUES 
  ('greenHand','greenHand@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$YW51VVduc2NuZ1Z4S29SSQ$b/Ec0pA3++9sgpCWA21enA', false),
  ('growItYourself','giy@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$dmJQNXhwUk1xNHVCSkc0cg$FsIduoanDy+jUEN2wZlvaQ', true);


CREATE TABLE `gardens` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `gardenName` VARCHAR(100) NOT NULL,
  `img` VARCHAR(255),
  `numberOfSpots` INT NOT NULL,
  `userId` INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO `gardens` (`gardenName`, `img`, `numberOfSpots`, `userId`) 
VALUES 
  ('Spring Garden','https://stardewvalleywiki.com/mediawiki/images/b/b1/Dandelion.png', 10, 1),
  ('Fall Garden','https://stardewvalleywiki.com/mediawiki/images/7/75/Scarecrow.png', 5, 1);


CREATE TABLE `plants` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `img` VARCHAR(255) NOT NULL,
  `sunExposure` VARCHAR(100) NOT NULL,
  `birdSensitive` BOOLEAN NOT NULL,
  `sowingMonth` VARCHAR(100) NOT NULL,
  `harvestMonth` VARCHAR(100) NOT NULL,
  `minTemp` VARCHAR(100) NOT NULL
);

INSERT INTO `plants` (`name`, `description`, `img`, `sunExposure`, `birdSensitive`, `sowingMonth`, `harvestMonth`, `minTemp`) 
VALUES 
  ('Eggplant','The eggplant is a delicate, tropical perennial plant often cultivated as a tender or half-hardy annual in temperate climates.', 'https://stardewvalleywiki.com/mediawiki/images/8/8f/Eggplant.png', 'Sunny', false, 'May-June', 'July-September', '20'),
  ('Tomato','Tomatoes are a significant source of umami flavor. The tomato is consumed in diverse ways, raw or cooked, in many dishes, sauces, salads, and drinks.', 'https://stardewvalleywiki.com/mediawiki/images/9/9d/Tomato.png', 'Sunny', false, 'May-June', 'July-October', '17'),
  ('Carrot','Carrots are grown from seed and can take up to four months (120 days) to mature, but most cultivars mature within 70 to 80 days under the right conditions.', 'https://stardewvalleywiki.com/mediawiki/images/3/34/Cave_Carrot.png', 'Half-Shady', false, 'February-April', 'July-November', '15'),
  ('Green Bean','Green beans are eaten around the world and are sold fresh, canned, and frozen. They can be eaten raw or steamed, boiled, stir-fried, or baked.', 'https://stardewvalleywiki.com/mediawiki/images/5/5c/Green_Bean.png', 'Sunny', true, 'April-May', 'August-October', '10'),
  ('Beetroot','The beetroot is the taproot portion of a beet plant, usually known in North America as beets while the vegetable is referred to as beetroot in British English', 'https://stardewvalleywiki.com/mediawiki/images/a/a4/Beet.png', 'Half-Shady', false, 'April-June', 'July-October', '20'),
  ('Strawberry','The garden strawberry is a widely grown hybrid species of the genus Fragaria, collectively known as the strawberries, which are cultivated worldwide for their fruit.', 'https://stardewvalleywiki.com/mediawiki/images/6/6d/Strawberry.png', 'Sunny', false, 'April-June', 'July-September', '10'),
  ('Raspberry','The raspberry is the edible fruit of a multitude of plant species in the genus Rubus of the rose family, most of which are in the subgenus Idaeobatus.', 'https://stardewvalleywiki.com/mediawiki/images/5/59/Salmonberry.png', 'Sunny', true, 'April-June', 'July-August', '15'),
  ('Melon','A melon is any of various plants of the family Cucurbitaceae with sweet, edible, and fleshy fruit.', 'https://stardewvalleywiki.com/mediawiki/images/1/19/Melon.png', 'Sunny', false, 'June', 'August-September', '10');

CREATE TABLE `gardenSpots` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `sowingDate` DATE NOT NULL,
  `harvestDate` DATE NOT NULL,
  `plantId` INT NOT NULL,
  `gardenId` INT NOT NULL,
  FOREIGN KEY (plantId) REFERENCES plants(id),
  FOREIGN KEY (gardenId) REFERENCES gardens(id)
);

INSERT INTO `gardenSpots` (`sowingDate`, `harvestDate`, `plantId`, `gardenId`) 
VALUES 
  ('2022-05-01','2022-07-01', 1, 1),
  ('2022-05-01','2022-07-01', 1, 1),
  ('2022-05-15','2022-07-15', 2, 1),
  ('2022-05-15','2022-07-15', 2, 1),
  ('2022-05-15','2022-07-15', 2, 1),
  ('2022-04-20','2022-06-15', 6, 1),
  ('2022-04-20','2022-06-15', 6, 1),
  ('2022-04-20','2022-06-15', 6, 1),
  ('2022-05-10','2022-07-25', 7, 1),
  ('2022-06-10','2022-09-05', 8, 1);