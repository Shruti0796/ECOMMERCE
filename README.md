# NEXUS - E-Commerce Product Management System

A comprehensive **E-Commerce Product Management System** built in Java demonstrating strong Object-Oriented Programming (OOP) concepts and JDBC database integration.

# Project Overview

NEXUS is a feature-rich e-commerce application that simulates a modern online shopping platform similar to Amazon and Myntra. It allows users to browse products, manage shopping cart, place orders, and complete checkout with a simulated payment experience.

The project is developed following **layered architecture** and strictly adheres to OOP principles as per academic requirements.

# Features

### User Features
- User Registration and Login
- Browse products by categories (Men's Fashion, Women's Fashion, Kids, Footwear, Perfumes, Accessories)
- Add products to cart with quantity selection
- View and manage shopping cart
- Place orders and checkout
- Simulated Razorpay-style payment gateway

### Admin Features
- Product management (View, Add, Update, Delete)
- Order management

### Technical Features
- Full CRUD operations on Products and Orders
- Role-based access (Customer & Admin)
- Real-time cart total calculation
- Stock management
- Clean layered architecture

## 🛠️ Technologies Used

- **Programming Language**: Java (JDK 21)
- **Database**: MySQL 8.0
- **Database Connectivity**: JDBC
- **Build Tool**: Maven
- **Frontend**: Java Swing (Modern GUI with card-based design)
- **IDE**: VS Code / IntelliJ IDEA

## 🎯 OOP Concepts Demonstrated

- **Inheritance**: `Product` abstract class extended by `ElectronicsProduct` and `FashionProduct`
- **Polymorphism**: Method overriding (`getProductTypeInfo()`)
- **Abstraction**: Abstract classes and interfaces
- **Encapsulation**: Private fields with proper getters and setters
- **Composition**: Order contains OrderItems
- **Layered Architecture**: Model → DAO → Service → Presentation

## 🗄️ Database

- MySQL Database (`ecom_db`)
- Tables: `users`, `products`, `orders`, `order_items`
- Proper foreign key relationships

## How to Run

1. Import the project in VS Code / IntelliJ IDEA
2. Set up MySQL and run `database_schema.sql`
3. Update database credentials in `DBConnection.java`
4. Run `Main.java` (Console) or `EcommerceGUI.java` (GUI)

## Future Enhancements

- Integration with React.js frontend
- Real payment gateway integration (Razorpay/Stripe)
- Product image upload
- Advanced search and filtering
- Order tracking system
You can now copy the above README directly.
