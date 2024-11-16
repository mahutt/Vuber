package com.SOEN343.API.QuoteService;

import org.springframework.stereotype.Service;

import com.SOEN343.API.order.dto.ParcelDetailsDto;

@Service
public class QuoteCalculator {

    private IQuoteStrategy strategy;

    public void setStrategy(IQuoteStrategy strategy) {
        this.strategy = strategy;
    }

    public double execute(ParcelDetailsDto[] parcels) {
        return this.strategy.calculateQuote(parcels);
    }
}
