package com.SOEN343.API.payment;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

public interface IPaymentAdapter {
    
    public Charge chargeCard(String token, double amount) throws StripeException;

}
