package com.SOEN343.API.email;

import javax.mail.Session;
import java.net.PasswordAuthentication;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SOEN343.API.order.dto.ParcelDetailsDto;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    public SmptpEmailFacade emailFacade;
    @PostMapping("/SendEmail")
    public ResponseEntity<Object> sendEmail(@RequestBody EmailDetails emailDetails) {


        try{
        
        SmptpEmailFacade emailFacade = new SmptpEmailFacade();
        emailFacade.sendToContactSupport(emailDetails);
        return ResponseEntity.ok().body("Success");


        }catch(Exception e){

            return ResponseEntity.status(420).body(null);
        }

    }

}
