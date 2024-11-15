package com.SOEN343.API.payment;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;

import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class StripeServiceAdapter implements IPaymentAdapter{


    ChargeCreateParams chargeParams;
    
    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {

        Stripe.apiKey = stripeApiKey;

    }

    public StripeServiceAdapter() {
        Stripe.apiKey = stripeApiKey;
        System.out.println(stripeApiKey);
    }

    public Charge chargeCard(String token, double amount) throws StripeException {

        int amountInCents = (int) (amount * 100);

        chargeParams = ChargeCreateParams.builder()
            .setAmount((long) amountInCents)  
            .setCurrency("cad")              
            .setSource(token)                 
            .setDescription("Order payment")  
            .build();

        return Charge.create(chargeParams);
    }
}