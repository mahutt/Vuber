package com.SOEN343.API.QuoteService;

import org.springframework.stereotype.Service;

import com.SOEN343.API.order.dto.ParcelDetailsDto;

@Service
public class QuoteCalculator {
    
    private IQuoteStrategy strategy;
    private QuoteStragyFactory factory;

    public QuoteCalculator(QuoteStragyFactory factory){
        this.factory = factory;
    }

    public void setSrategy(int numberOfOrders){
        if(numberOfOrders<3){
            System.out.print("\n\n***BASIC***\n\n");
            strategy = factory.create("basic");
        }
        else{
            System.out.print("\n\n***DISCOUNT***\n\n");
            strategy = factory.create("discounted");
        }
    }

    public double execute(ParcelDetailsDto[] parcels){
        return this.strategy.calculateQuote(parcels);
    }
}
