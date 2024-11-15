package com.SOEN343.API.email;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    public SmtpEmailFacade emailFacade;

    @PostMapping("/SendEmail")
    public ResponseEntity<Object> sendEmail(@RequestBody EmailDetails emailDetails) {

        try {
            SmtpEmailFacade emailFacade = new SmtpEmailFacade();
            emailFacade.sendToContactSupport(emailDetails);
            return ResponseEntity.ok().body("Success");
        } catch (Exception e) {
            return ResponseEntity.status(420).body(null);
        }
    }

}
