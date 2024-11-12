package com.SOEN343.API.QuoteService;

import org.springframework.stereotype.Service;

import com.SOEN343.API.order.dto.ParcelDetailsDto;

@Service
public class QuoteCalculator {
    
    private IQuoteStrategy strategy;

    public void setSrategy(int numberOfOrders){
        if(numberOfOrders<3){
            strategy = new BasicQuoteService();
        }
        else{
            System.out.print("\n\n***DISCOUNT***\n\n");
            strategy = new DiscountedQuoteService();
        }
    }

    public double execute(ParcelDetailsDto[] parcels){
        return this.strategy.calculateQuote(parcels);
    }
}
