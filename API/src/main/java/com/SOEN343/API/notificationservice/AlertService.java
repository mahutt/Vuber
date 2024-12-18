package com.SOEN343.API.notificationservice;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;

@Service
public class AlertService {
    private final List<Subscriber> subscribers = new CopyOnWriteArrayList<>();
    private final List<Alert> alerts = new CopyOnWriteArrayList<>();

    public void subscribe(Subscriber subscriber) {
        subscribers.add(subscriber);
    }

    public void unsubscribe(Subscriber subscriber) {
        subscribers.remove(subscriber);
    }

    public void notifySubscribers(Alert alert) {
        for (Subscriber subscriber : subscribers) {
            subscriber.update(alert);
        }
    }

    public void addAlert(Alert alert) {
        alerts.add(alert);
        notifySubscribers(alert);
    }
}
