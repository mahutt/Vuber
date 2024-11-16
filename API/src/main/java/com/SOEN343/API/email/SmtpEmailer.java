package com.SOEN343.API.email;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SmtpEmailer {

    private static SmtpEmailer instance;

    private SmtpEmailer() {
    }

    public static SmtpEmailer getInstance() {
        if (instance == null) {
            instance = new SmtpEmailer();
        }

        return instance;
    }

    public synchronized void sendEmail(EmailDetails emailDetails, String t, String f, String h) {

        String to = t;

        String from = f;

        String host = h;

        Properties properties = System.getProperties();

        // Setup mail server
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication("xvinivuberx@gmail.com", "jmjw kygl qoxk qqly\n" + //
                        "");
            }

        });

        // Used to debug SMTP issues
        session.setDebug(true);

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            // Set Subject: header field
            message.setSubject("This is the Subject Line!");

            // Now set the actual message
            // message.setText("This is actual message");

            // Send the actual HTML message.
            message.setContent(
                    "<html>" +
                            "<head>" +
                            "<style>" +
                            "body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f7fa; color: #333; }"
                            +
                            ".container { width: 100%; max-width: 650px; margin: 20px auto; padding: 25px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border: 2px solid #1E88E5; }"
                            +
                            ".header { background-color: #1E88E5; color: white; text-align: center; border-radius: 8px 8px 0 0; }"
                            +
                            ".header h1 { margin: 0; font-size: 28px; font-weight: 600; }" +
                            ".content { padding: 20px; line-height: 1.6; }" +
                            ".content p { margin: 10px 0; font-size: 16px; }" +
                            ".content strong { color: #333; font-weight: 500; }" +
                            ".footer { font-size: 14px; color: #777; text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px solid #e4e7eb; }"
                            +
                            ".button { background-color: white; color: #1E88E5; padding: 12px 20px; font-size: 16px; border-radius: 25px; border: 2px solid #1E88E5; text-decoration: none; display: inline-block; margin-top: 20px; text-align: center; }"
                            +
                            ".button:hover { background-color: #1E88E5; color: white; }" +
                            "</style>" +
                            "</head>" +
                            "<body>" +
                            "<div class='container'>" +
                            "<div class='header'>" +
                            "<h1>" + emailDetails.Name + " has contacted us!</h1>" +
                            "</div>" +
                            "<div class='content'>" +
                            "<p><strong>Phone Number:</strong> " + emailDetails.PhoneNum + "</p>" +
                            "<p><strong>Email Address:</strong> " + emailDetails.Email + "</p>" +
                            "<p><strong>Message:</strong> " + emailDetails.Message + "</p>" +
                            "<a href='mailto:" + emailDetails.Email + "' class='button'>Reply to " + emailDetails.Name
                            + "</a>" +
                            "</div>" +
                            "<div class='footer'>" +
                            "<p>Thank you for reaching out. We will get back to you as soon as possible.</p>" +
                            "</div>" +
                            "</div>" +
                            "</body>" +
                            "</html>",
                    "text/html");

            System.out.println("sending...");
            // Send message
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }

    }

}
