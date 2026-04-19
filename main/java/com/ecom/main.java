package com.ecommerce;

import com.ecommerce.model.*;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.*;
import java.util.Scanner;

public class Main {
    private static User currentUser = null;
    private static final Scanner sc = new Scanner(System.in);
    private static final UserRepository userRepo = new UserRepository();
    private static final ProductService productService = new ProductService();
    private static final CartService cartService = new CartService();
    private static final OrderService orderService = new OrderService();

    public static void main(String[] args) {
        System.out.println("🚀 Welcome to E-Commerce Microservice (OOP Demo)");

        while (true) {
            System.out.println("\n=== MAIN MENU ===");
            System.out.println("1. Register");
            System.out.println("2. Login");
            System.out.println("3. Browse Products");
            System.out.println("4. View Cart");
            System.out.println("5. Checkout");
            System.out.println("6. My Orders");
            System.out.println("7. Exit");
            System.out.print("Choose option: ");

            int choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1 -> register();
                case 2 -> login();
                case 3 -> browseProducts();
                case 4 -> viewCart();
                case 5 -> checkout();
                case 6 -> viewOrders();
                case 7 -> {
                    System.out.println("Thank you for using our system! 👋");
                    return;
                }
            }
        }
    }

    // Implement register(), login(), browseProducts(), etc. one by one
    private static void register() {
        System.out.print("Enter Name: ");
        String name = sc.nextLine();
        System.out.print("Enter Email: ");
        String email = sc.nextLine();
        System.out.print("Enter Password: ");
        String pass = sc.nextLine();

        User user = new User("U" + System.currentTimeMillis(), name, email, pass);
        userRepo.save(user);
        System.out.println("✅ Registration successful!");
    }

    private static void login() {
        System.out.print("Enter Email: ");
        String email = sc.nextLine();
        System.out.print("Enter Password: ");
        String pass = sc.nextLine();

        User user = userRepo.findByEmail(email);
        if (user != null && user.getPassword().equals(pass)) {
            currentUser = user;
            System.out.println("✅ Login successful! Welcome " + user.getName());
        } else {
            System.out.println("❌ Invalid credentials");
        }
    }

    private static void browseProducts() {
        System.out.println("\nAvailable Products:");
        productService.getAllProducts().forEach(p -> {
            System.out.println(p.getProductId() + " | " + p.getName() + " | ₹" + p.getPrice() + " | " + p.getCategory());
        });

        System.out.print("\nEnter Product ID to add to cart: ");
        String id = sc.nextLine();
        Product product = productService.getAllProducts().stream()
                .filter(p -> p.getProductId().equals(id))
                .findFirst().orElse(null);

        if (product != null) {
            System.out.print("Enter quantity: ");
            int qty = sc.nextInt();
            sc.nextLine();
            cartService.addToCart(product, qty);
        }
    }

    private static void viewCart() {
        List<CartItem> cart = cartService.getCartItems();
        if (cart.isEmpty()) {
            System.out.println("Cart is empty!");
            return;
        }
        cart.forEach(item -> System.out.println(item.getProduct().getName() + " x " + item.getQuantity() + " = ₹" + item.getTotalPrice()));
        System.out.println("Total: ₹" + cartService.getTotalAmount());
    }

    private static void checkout() {
        if (currentUser == null) {
            System.out.println("Please login first!");
            return;
        }
        if (cartService.getCartItems().isEmpty()) {
            System.out.println("Cart is empty!");
            return;
        }

        System.out.println("Choose Payment Method:");
        System.out.println("1. Credit Card");
        System.out.println("2. UPI");
        int choice = sc.nextInt();
        sc.nextLine();

        PaymentService payment = (choice == 1) ? new CreditCardPayment() : new UpiPayment();

        if (payment.processPayment(cartService.getTotalAmount(), currentUser.getEmail())) {
            orderService.placeOrder(currentUser, cartService);
        }
    }

    private static void viewOrders() {
        if (currentUser == null) {
            System.out.println("Please login first!");
            return;
        }
        currentUser.getOrders().forEach(order ->
            System.out.println("Order: " + order.getOrderId() + " | Total: ₹" + order.getTotalAmount() + " | Date: " + order.getOrderDate())
        );
    }
}