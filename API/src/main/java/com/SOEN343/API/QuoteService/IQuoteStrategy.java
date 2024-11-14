package com.SOEN343.API.QuoteService;

import com.SOEN343.API.order.dto.ParcelDetailsDto;

public interface IQuoteStrategy {
    public double calculateQuote(ParcelDetailsDto[] parcels);
}


