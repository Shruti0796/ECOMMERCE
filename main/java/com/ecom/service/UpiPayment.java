package com.ecommerce.service;

public class UpiPayment implements PaymentService {
    @Override
    public boolean processPayment(double amount, String userEmail) {
        System.out.println("✅ UPI Payment successful for ₹" + amount);
        return true;
    }
}