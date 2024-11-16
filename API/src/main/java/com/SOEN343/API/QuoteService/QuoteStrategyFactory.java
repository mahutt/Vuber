package com.SOEN343.API.QuoteService;

import org.springframework.stereotype.Service;

@Service
public class QuoteStrategyFactory {
    public IQuoteStrategy create(String type) {
        if (type.equals("basic")) {
            System.out.println("\n\nif");
            return new BasicQuoteService();
        } else if (type.equals("discounted")) {
            System.out.println("\n\nelseif");
            return new DiscountedQuoteService();
        } else {
            System.out.println("\n\nelse");
            return new BasicQuoteService();
        }
    }
}
