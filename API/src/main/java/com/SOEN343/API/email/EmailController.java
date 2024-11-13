package com.SOEN343.API.email;

import javax.mail.Session;
import java.net.PasswordAuthentication;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {



    @Autowired
    public EmailController() {

    }

    public static void sendMail(String receipient){


    }

    }

