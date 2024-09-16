package com.SOEN343.API.user;

//Repository for user class database objects
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User, Integer> {
    



}
