package com.SOEN343.API.notificationservice;

public class SecurityNotifier implements Subscriber {

    @Override
    public void update(String email) {
        // @todo send notification to devs or security team using email provider
        System.out.println("Notification: " + email);
    }
}
