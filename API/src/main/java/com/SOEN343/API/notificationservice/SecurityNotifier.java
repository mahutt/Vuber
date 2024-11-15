package com.SOEN343.API.notificationservice;

import com.SOEN343.API.email.EmailDetails;
import com.SOEN343.API.email.SmtpEmailFacade;

public class SecurityNotifier implements Subscriber {

    public SmtpEmailFacade emailFacade;

    public SecurityNotifier() {
        this.emailFacade = new SmtpEmailFacade();
    }

    @Override
    public void update(Alert alert) {
        EmailDetails emailDetails = new EmailDetails(null, null, null, alert.message);
        emailFacade.sendToSecurity(emailDetails);
    }
}
