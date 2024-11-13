package com.SOEN343.API.notificationservice;

public class Alert {
    String message;
    AlertType type;

    public Alert(String message, AlertType type) {
        this.message = message;
        this.type = type;
    }
}
