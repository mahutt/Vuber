package com.SOEN343.API.QuoteService;

import org.springframework.stereotype.Service;

@Service
public class QuoteStrategyFactory {
    public IQuoteStrategy create(String type) {
        if (type.equals("basic")) {
            return new BasicQuoteService();
        } else if (type.equals("discounted")) {
            return new DiscountedQuoteService();
        } else {
            return new BasicQuoteService();
        }
    }
}
