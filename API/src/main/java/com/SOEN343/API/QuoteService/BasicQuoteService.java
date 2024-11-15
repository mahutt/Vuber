package com.SOEN343.API.QuoteService;

import com.SOEN343.API.order.dto.ParcelDetailsDto;
import com.SOEN343.API.order.dto.SizeDto;

public class BasicQuoteService implements IQuoteStrategy{

    private static final double BASE_RATE_PER_KG = 5.0; 
    private static final double BASE_RATE_PER_LBS = 2.5;
    private static final double BASE_RATE_PER_CM3 = 0.01; 
    private static final double BASE_RATE_PER_INCH = 2.5;


    public double calculateQuote(ParcelDetailsDto[] parceList) {
        double finalWeightCost =0;
        double finalSizeCost =0;

        for(var parcelDetails : parceList){
            double weightCost;

            if(parcelDetails.getWeightUnit().equals("lb")){
                weightCost = calculateWeightCostByLBS(parcelDetails.getWeight());
                finalWeightCost +=weightCost;
            }
            else if(parcelDetails.getWeightUnit().equals("kg")){
                weightCost = calculateWeightCostByKG(parcelDetails.getWeight());
                finalWeightCost +=weightCost;
            }
            else{
                weightCost = 0;
                finalWeightCost +=weightCost;
            }
    
            double sizeCost;
    
            if(parcelDetails.getSizeUnit().equals("in")){
                sizeCost = calculateSizeCostByINCHES(parcelDetails.getSize());
                finalSizeCost+=sizeCost;
                
            }
            else if(parcelDetails.getSizeUnit().equals("cm")){
                sizeCost = calculateSizeCostByCM(parcelDetails.getSize());
                finalSizeCost+=sizeCost;
            }
            else{
                sizeCost = 0;
                finalSizeCost+=sizeCost;
            }
        }

        
        

        return (finalWeightCost + finalSizeCost);
    }
    private double calculateWeightCostByKG(double weight) {
        
        
        return weight * BASE_RATE_PER_KG;
    }

    private double calculateWeightCostByLBS(double weight) {
        
        
        return weight * BASE_RATE_PER_LBS;
    }
    
    private double calculateSizeCostByINCHES(SizeDto size) {
        int volume = size.getWidth() * size.getHeight() * size.getLength();
        return volume * BASE_RATE_PER_INCH;
    }

    private double calculateSizeCostByCM(SizeDto size) {
        int volume = size.getWidth() * size.getHeight() * size.getLength();
        return volume * BASE_RATE_PER_CM3;
    }
    

}