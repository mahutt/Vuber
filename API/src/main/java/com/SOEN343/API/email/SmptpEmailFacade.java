package com.SOEN343.API.email;

public class SmptpEmailFacade{

    SmptpEmailer emailer = SmptpEmailer.getInstance();


    
    public void sendToContactSupport(EmailDetails details){
        
        //Hiding complex details. 
        
        String to = "xvinivuberx@gmail.com";

        String from = "xvinivuberx@gmail.com";

        String host = "smtp.gmail.com";

        emailer.sendEmail(details, to, from, host);
    }

}