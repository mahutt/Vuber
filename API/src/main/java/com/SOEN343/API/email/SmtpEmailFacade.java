package com.SOEN343.API.email;

public class SmtpEmailFacade {
    SmtpEmailer emailer = SmtpEmailer.getInstance();

    public void sendToContactSupport(EmailDetails details) {
        String to = "xvinivuberx@gmail.com";
        String from = "xvinivuberx@gmail.com";
        String host = "smtp.gmail.com";
        // emailer.sendEmail(details, to, from, host);
    }

    public void sendToSecurity(EmailDetails details) {
        String to = "tommy.mahut@gmail.com"; // security email
        String from = "xvinivuberx@gmail.com";
        String host = "smtp.gmail.com";
        // emailer.sendEmail(details, to, from, host);
    }

    public void sendToUser(EmailDetails details, String userEmail) {
        String to = userEmail;
        String from = "xvinivuberx@gmail.com";
        String host = "smtp.gmail.com";
        // emailer.sendEmail(details, to, from, host);
    }
}