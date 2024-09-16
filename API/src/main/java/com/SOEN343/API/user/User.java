package com.SOEN343.API.user;

import jakarta.persistence.*;

//Database entity for user class
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String username;
    public Integer getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    
    
}
