package com.SOEN343.API.notificationservice;

import com.SOEN343.API.email.EmailDetails;
import com.SOEN343.API.email.SmtpEmailFacade;

public class UserNotifier implements Subscriber {

    private SmtpEmailFacade emailFacade;

    public UserNotifier() {
        this.emailFacade = new SmtpEmailFacade();
    }

    @Override
    public void update(Alert alert) {
        if (alert.type == AlertType.FAILED_LOGIN) {
            EmailDetails emailDetails = new EmailDetails(null, null, null,
                    "There was a failed login attempt on your account. Reach contact support if this wasn't you.");
            emailFacade.sendToUser(emailDetails, alert.message);
        }
    }

}
