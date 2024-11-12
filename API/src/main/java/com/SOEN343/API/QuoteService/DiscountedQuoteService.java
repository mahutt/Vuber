package com.SOEN343.API.QuoteService;

import com.SOEN343.API.order.dto.ParcelDetailsDto;
import com.SOEN343.API.order.dto.SizeDto;

public class DiscountedQuoteService implements IQuoteStrategy {
    private static final double BASE_RATE_PER_KG = 5.0; 
    private static final double BASE_RATE_PER_LBS = 2.5;
    private static final double BASE_RATE_PER_CM3 = 0.01; 
    private static final double BASE_RATE_PER_INCH = 0.05;
    private static final double STANDARD_DISCOUNT = 0.8;
    
    private static final double LARGE_VOLUME_DISCOUNT = 0.7;
    private static final double HEAVY_WEIGHT_DISCOUNT = 0.6; 

    public double calculateQuote(ParcelDetailsDto[] parcelList) {
        double finalWeightCost = 0;
        double finalSizeCost = 0;

        for (var parcelDetails : parcelList) {
            double weightCost = calculateWeightCost(parcelDetails);
            finalWeightCost += weightCost;

            double sizeCost = calculateSizeCost(parcelDetails);
            finalSizeCost += sizeCost;
        }

        double totalCost = finalWeightCost + finalSizeCost;
        
        //Change in Algo, we now have a discount -> different strategy
        double discount = determineDiscount(finalWeightCost, finalSizeCost);

        System.out.print("FROM DISCOUNTED Total Cost: "+totalCost * discount);
        return totalCost * discount;
    }

    private double determineDiscount(double finalWeightCost, double finalSizeCost) {

        if (finalWeightCost > 200 || finalSizeCost > 500) {
            return HEAVY_WEIGHT_DISCOUNT;
        } else if (finalSizeCost > 300) {
            return LARGE_VOLUME_DISCOUNT;
        } else {
            return STANDARD_DISCOUNT;
        }
    }

    private double calculateWeightCost(ParcelDetailsDto parcelDetails) {
        double weightCost;
        double weight = parcelDetails.getWeight();

        if (parcelDetails.getWeightUnit().equalsIgnoreCase("lb")) {
            weightCost = weight * BASE_RATE_PER_LBS;
        } else if (parcelDetails.getWeightUnit().equalsIgnoreCase("kg")) {
            weightCost = weight * BASE_RATE_PER_KG;
        } else {
            weightCost = 0; 
        }

        return weightCost;
    }

    private double calculateSizeCost(ParcelDetailsDto parcelDetails) {
        double sizeCost;
        SizeDto size = parcelDetails.getSize();
        int volume = size.getWidth() * size.getHeight() * size.getLength();

        if (parcelDetails.getSizeUnit().equalsIgnoreCase("in")) {
            sizeCost = volume * BASE_RATE_PER_INCH;
        } else if (parcelDetails.getSizeUnit().equalsIgnoreCase("cm")) {
            sizeCost = volume * BASE_RATE_PER_CM3;
        } else {
            sizeCost = 0; // Unknown size unit
        }

        return sizeCost;
    }


}
