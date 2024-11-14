package com.SOEN343.API.notificationservice;

public class UserNotifier implements Subscriber {

    @Override
    public void update(Alert alert) {
        if (alert.type == AlertType.FAILED_LOGIN) {
            // @todo send message to user using email provider
            System.out.println("UserNotifier attempted login notification: " + alert.message);
        }
    }

}
