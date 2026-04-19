CREATE DATABASE IF NOT EXISTS ecom_db;
USE ecom_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100),
    role ENUM('ADMIN', 'CUSTOMER') DEFAULT 'CUSTOMER'
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category VARCHAR(50) NOT NULL,
    brand VARCHAR(50),
    size VARCHAR(20),
    color VARCHAR(30),
    warranty VARCHAR(50),
    description TEXT
);

-- Orders and Order Items Tables
CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Sample Data
INSERT INTO users (username, password, full_name, email, role) 
VALUES ('admin', 'admin123', 'Admin User', 'admin@ecom.com', 'ADMIN');

INSERT INTO products (name, price, stock, category, brand, description, warranty) VALUES
('Samsung Galaxy S24', 79999.00, 15, 'Electronics', 'Samsung', 'Latest flagship phone', '1 Year'),
('Nike Air Max Sneakers', 5499.00, 30, 'Fashion', 'Nike', 'Premium running shoes', NULL),
('Dell Laptop i7', 65999.00, 8, 'Electronics', 'Dell', 'High performance laptop', '1 Year'),
('Levi\'s Jeans', 2499.00, 25, 'Fashion', 'Levi\'s', 'Classic blue jeans', NULL);

SELECT 'Database and sample data created successfully!' AS Message;