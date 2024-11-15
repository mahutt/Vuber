package com.SOEN343.API.email;

public class SmtpEmailFacade {
    SmptpEmailer emailer = SmptpEmailer.getInstance();

    public void sendToContactSupport(EmailDetails details) {
        String to = "xvinivuberx@gmail.com";
        String from = "xvinivuberx@gmail.com";
        String host = "smtp.gmail.com";
        emailer.sendEmail(details, to, from, host);
    }

    public void sendToSecurity(EmailDetails details) {
        String to = "tommy.mahut@gmail.com"; // security email
        String from = "xvinivuberx@gmail.com";
        String host = "smtp.gmail.com";
        emailer.sendEmail(details, to, from, host);
    }
}