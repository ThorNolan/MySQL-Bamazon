-- set-up for my Bamazon database --
DROP DATABASE IF EXISTS Bamazon_DB;
CREATE DATABASE Bamazon_DB;
USE Bamazon_DB;

-- table to store my products and serve as an inventory --
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(60) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Populate my table with products --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ruby", "Precious Gems", 835.99, 9),
        ("Pile of regular dirt", "Home & Garden", 9.99, 75),
        ("Someone elses dog", "Pets", 35.99, 1),
        ("Box Jellyfish", "Pets", 56.80, 3),
        ("Pile of magical dirt", "Home & Garden", 675.50, 7),
        ("Handgun (used in a real crime!)", "Memoribilia", 150.75, 1),
        ("Emerald", "Precious Gems", 1250.25, 6),
        ("All-Purpose Pet Snax", "Pets", 8.75, 200),
        ("Life-size Cutout of an Alpaca", "Memoribilia", 39.99, 12),
        ("Rock", "Precious Gems", 2.75, 500)

