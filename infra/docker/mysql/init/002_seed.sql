USE eventhub_db;

INSERT INTO cities (name) VALUES ('Kolkata'),('Mumbai'),('Bangalore')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO event_types (name) VALUES ('Wedding'),('Party'),('Concert')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO users (name,email,password_hash,role,city) VALUES
('Admin User','admin@eventhub.dev','$2a$10$placeholder','ADMIN','Kolkata'),
('Demo Organizer','organizer@eventhub.dev','$2a$10$placeholder','CUSTOMER','Mumbai')
ON DUPLICATE KEY UPDATE email=VALUES(email);

-- Venues: 3 per city x event type
INSERT INTO venues (city_id,event_type_id,name,description,address,seat_capacity_max,base_price,image_url) VALUES
(1,1,'Kolkata Wedding Grand Hall','Premium indoor wedding venue','Salt Lake, Kolkata',300,150000,'https://images.unsplash.com/photo-1519167758481-83f29c7a9d8a'),
(1,1,'Kolkata Wedding Open Lawn','Elegant outdoor venue','New Town, Kolkata',500,220000,'https://images.unsplash.com/photo-1511795409834-ef04bbd61622'),
(1,1,'Kolkata Wedding Royal Banquet','Luxury banquet space','Park Street, Kolkata',200,120000,'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3'),
(1,2,'Kolkata Party Sky Lounge','High energy party space','Rajarhat, Kolkata',150,70000,'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'),
(1,2,'Kolkata Party Club Hall','Indoor celebration hall','EM Bypass, Kolkata',250,90000,'https://images.unsplash.com/photo-1511578314322-379afb476865'),
(1,2,'Kolkata Party Terrace Venue','Rooftop party area','Howrah Riverside',120,60000,'https://images.unsplash.com/photo-1517457373958-b7bdd4587205'),
(1,3,'Kolkata Concert Arena','Concert-focused arena','Eco Park, Kolkata',1000,400000,'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'),
(1,3,'Kolkata Concert Grounds','Open concert ground','Maidan, Kolkata',2000,600000,'https://images.unsplash.com/photo-1459749411175-04bf5292ceea'),
(1,3,'Kolkata Acoustic Hall','Mid-size music hall','Ballygunge, Kolkata',400,180000,'https://images.unsplash.com/photo-1506157786151-b8491531f063'),
(2,1,'Mumbai Wedding Grand Hall','Premium indoor wedding venue','Andheri, Mumbai',300,180000,'https://images.unsplash.com/photo-1519167758481-83f29c7a9d8a'),
(2,1,'Mumbai Wedding Open Lawn','Elegant outdoor venue','Navi Mumbai',500,250000,'https://images.unsplash.com/photo-1511795409834-ef04bbd61622'),
(2,1,'Mumbai Wedding Royal Banquet','Luxury banquet space','Bandra, Mumbai',220,150000,'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3'),
(2,2,'Mumbai Party Sky Lounge','High energy party space','Lower Parel, Mumbai',180,95000,'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'),
(2,2,'Mumbai Party Club Hall','Indoor celebration hall','Powai, Mumbai',260,110000,'https://images.unsplash.com/photo-1511578314322-379afb476865'),
(2,2,'Mumbai Party Terrace Venue','Rooftop party area','Juhu, Mumbai',140,85000,'https://images.unsplash.com/photo-1517457373958-b7bdd4587205'),
(2,3,'Mumbai Concert Arena','Concert-focused arena','BKC, Mumbai',1200,500000,'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'),
(2,3,'Mumbai Concert Grounds','Open concert ground','Navi Mumbai',2500,700000,'https://images.unsplash.com/photo-1459749411175-04bf5292ceea'),
(2,3,'Mumbai Acoustic Hall','Mid-size music hall','Dadar, Mumbai',450,220000,'https://images.unsplash.com/photo-1506157786151-b8491531f063'),
(3,1,'Bangalore Wedding Grand Hall','Premium indoor wedding venue','Whitefield, Bangalore',320,170000,'https://images.unsplash.com/photo-1519167758481-83f29c7a9d8a'),
(3,1,'Bangalore Wedding Open Lawn','Elegant outdoor venue','Sarjapur, Bangalore',520,230000,'https://images.unsplash.com/photo-1511795409834-ef04bbd61622'),
(3,1,'Bangalore Wedding Royal Banquet','Luxury banquet space','Indiranagar, Bangalore',210,135000,'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3'),
(3,2,'Bangalore Party Sky Lounge','High energy party space','MG Road, Bangalore',160,80000,'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'),
(3,2,'Bangalore Party Club Hall','Indoor celebration hall','Koramangala, Bangalore',250,100000,'https://images.unsplash.com/photo-1511578314322-379afb476865'),
(3,2,'Bangalore Party Terrace Venue','Rooftop party area','HSR Layout, Bangalore',130,70000,'https://images.unsplash.com/photo-1517457373958-b7bdd4587205'),
(3,3,'Bangalore Concert Arena','Concert-focused arena','Yelahanka, Bangalore',1100,450000,'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'),
(3,3,'Bangalore Concert Grounds','Open concert ground','Electronic City, Bangalore',2200,650000,'https://images.unsplash.com/photo-1459749411175-04bf5292ceea'),
(3,3,'Bangalore Acoustic Hall','Mid-size music hall','Church Street, Bangalore',420,200000,'https://images.unsplash.com/photo-1506157786151-b8491531f063');

INSERT INTO decoration_vendors (city_id,event_type_id,name,tier,price,image_url) VALUES
(1,1,'Kolkata Decor Standard','STANDARD',20000,'https://images.unsplash.com/photo-1519741497674-611481863552'),
(1,1,'Kolkata Decor Premium','PREMIUM',45000,'https://images.unsplash.com/photo-1519225421980-715cb0215aed'),
(1,1,'Kolkata Decor Plus','PLUS',80000,'https://images.unsplash.com/photo-1520854221256-17451cc331bf'),
(1,2,'Kolkata Party Decor Standard','STANDARD',15000,'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9'),
(1,2,'Kolkata Party Decor Premium','PREMIUM',30000,'https://images.unsplash.com/photo-1469371670807-013ccf25f16a'),
(1,2,'Kolkata Party Decor Plus','PLUS',55000,'https://images.unsplash.com/photo-1527529482837-4698179dc6ce'),
(1,3,'Kolkata Concert Decor Standard','STANDARD',25000,'https://images.unsplash.com/photo-1503095396549-807759245b35'),
(1,3,'Kolkata Concert Decor Premium','PREMIUM',50000,'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'),
(1,3,'Kolkata Concert Decor Plus','PLUS',85000,'https://images.unsplash.com/photo-1506157786151-b8491531f063'),
(2,1,'Mumbai Decor Standard','STANDARD',22000,'https://images.unsplash.com/photo-1519741497674-611481863552'),
(2,1,'Mumbai Decor Premium','PREMIUM',47000,'https://images.unsplash.com/photo-1519225421980-715cb0215aed'),
(2,1,'Mumbai Decor Plus','PLUS',85000,'https://images.unsplash.com/photo-1520854221256-17451cc331bf'),
(2,2,'Mumbai Party Decor Standard','STANDARD',18000,'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9'),
(2,2,'Mumbai Party Decor Premium','PREMIUM',32000,'https://images.unsplash.com/photo-1469371670807-013ccf25f16a'),
(2,2,'Mumbai Party Decor Plus','PLUS',60000,'https://images.unsplash.com/photo-1527529482837-4698179dc6ce'),
(2,3,'Mumbai Concert Decor Standard','STANDARD',28000,'https://images.unsplash.com/photo-1503095396549-807759245b35'),
(2,3,'Mumbai Concert Decor Premium','PREMIUM',55000,'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'),
(2,3,'Mumbai Concert Decor Plus','PLUS',90000,'https://images.unsplash.com/photo-1506157786151-b8491531f063'),
(3,1,'Bangalore Decor Standard','STANDARD',21000,'https://images.unsplash.com/photo-1519741497674-611481863552'),
(3,1,'Bangalore Decor Premium','PREMIUM',46000,'https://images.unsplash.com/photo-1519225421980-715cb0215aed'),
(3,1,'Bangalore Decor Plus','PLUS',82000,'https://images.unsplash.com/photo-1520854221256-17451cc331bf'),
(3,2,'Bangalore Party Decor Standard','STANDARD',17000,'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9'),
(3,2,'Bangalore Party Decor Premium','PREMIUM',31000,'https://images.unsplash.com/photo-1469371670807-013ccf25f16a'),
(3,2,'Bangalore Party Decor Plus','PLUS',58000,'https://images.unsplash.com/photo-1527529482837-4698179dc6ce'),
(3,3,'Bangalore Concert Decor Standard','STANDARD',26000,'https://images.unsplash.com/photo-1503095396549-807759245b35'),
(3,3,'Bangalore Concert Decor Premium','PREMIUM',52000,'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'),
(3,3,'Bangalore Concert Decor Plus','PLUS',87000,'https://images.unsplash.com/photo-1506157786151-b8491531f063');

INSERT INTO food_vendors (city_id,event_type_id,name,tier,price_per_plate,image_url) VALUES
(1,1,'Kolkata Wedding Catering Standard','STANDARD',800,'https://images.unsplash.com/photo-1555244162-803834f70033'),
(1,1,'Kolkata Wedding Catering Premium','PREMIUM',1500,'https://images.unsplash.com/photo-1528605248644-14dd04022da1'),
(1,1,'Kolkata Wedding Catering Plus','PLUS',2500,'https://images.unsplash.com/photo-1504674900247-0877df9cc836'),
(1,2,'Kolkata Party Catering Standard','STANDARD',700,'https://images.unsplash.com/photo-1544025162-d76694265947'),
(1,2,'Kolkata Party Catering Premium','PREMIUM',1300,'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83'),
(1,2,'Kolkata Party Catering Plus','PLUS',2100,'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'),
(1,3,'Kolkata Concert Food Standard','STANDARD',600,'https://images.unsplash.com/photo-1521305916504-4a1121188589'),
(1,3,'Kolkata Concert Food Premium','PREMIUM',1200,'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'),
(1,3,'Kolkata Concert Food Plus','PLUS',1800,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'),
(2,1,'Mumbai Wedding Catering Standard','STANDARD',900,'https://images.unsplash.com/photo-1555244162-803834f70033'),
(2,1,'Mumbai Wedding Catering Premium','PREMIUM',1600,'https://images.unsplash.com/photo-1528605248644-14dd04022da1'),
(2,1,'Mumbai Wedding Catering Plus','PLUS',2600,'https://images.unsplash.com/photo-1504674900247-0877df9cc836'),
(2,2,'Mumbai Party Catering Standard','STANDARD',800,'https://images.unsplash.com/photo-1544025162-d76694265947'),
(2,2,'Mumbai Party Catering Premium','PREMIUM',1400,'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83'),
(2,2,'Mumbai Party Catering Plus','PLUS',2200,'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'),
(2,3,'Mumbai Concert Food Standard','STANDARD',700,'https://images.unsplash.com/photo-1521305916504-4a1121188589'),
(2,3,'Mumbai Concert Food Premium','PREMIUM',1300,'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'),
(2,3,'Mumbai Concert Food Plus','PLUS',1900,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'),
(3,1,'Bangalore Wedding Catering Standard','STANDARD',850,'https://images.unsplash.com/photo-1555244162-803834f70033'),
(3,1,'Bangalore Wedding Catering Premium','PREMIUM',1550,'https://images.unsplash.com/photo-1528605248644-14dd04022da1'),
(3,1,'Bangalore Wedding Catering Plus','PLUS',2550,'https://images.unsplash.com/photo-1504674900247-0877df9cc836'),
(3,2,'Bangalore Party Catering Standard','STANDARD',750,'https://images.unsplash.com/photo-1544025162-d76694265947'),
(3,2,'Bangalore Party Catering Premium','PREMIUM',1350,'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83'),
(3,2,'Bangalore Party Catering Plus','PLUS',2150,'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'),
(3,3,'Bangalore Concert Food Standard','STANDARD',650,'https://images.unsplash.com/photo-1521305916504-4a1121188589'),
(3,3,'Bangalore Concert Food Premium','PREMIUM',1250,'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'),
(3,3,'Bangalore Concert Food Plus','PLUS',1850,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd');
