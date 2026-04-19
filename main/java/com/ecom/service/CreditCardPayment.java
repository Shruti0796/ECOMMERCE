package com.ecommerce.service;

public class CreditCardPayment implements PaymentService {
    @Override
    public boolean processPayment(double amount, String userEmail) {
        System.out.println("✅ Credit Card Payment successful for ₹" + amount);
        return true;
    }
}