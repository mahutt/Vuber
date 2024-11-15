package com.SOEN343.API.config;

import com.stripe.Stripe;

public class StripeConfig {
    public static void initialize() {
        Stripe.apiKey = System.getenv("STRIPE_SECRET_KEY");
    }
}