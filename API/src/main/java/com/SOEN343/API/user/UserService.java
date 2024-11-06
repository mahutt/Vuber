package com.SOEN343.API.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;

//Logic for user class
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<Object> getAuthenticatedUser() {
        return ResponseEntity.ok("Authenticated User");
    }

    public ResponseEntity<Object> newUser(User user) {
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    public List<User> getUsers() {
        return this.userRepository.findAll();
    }

    public ResponseEntity<Object> updateUser(Integer id, User updateUser) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (!optionalUser.isPresent()) {

            return ResponseEntity.notFound().build();
        }

        User currentUser = optionalUser.get();
        currentUser.setUsername(updateUser.getUsername());

        userRepository.save(currentUser);
        return ResponseEntity.ok(currentUser);
    }

    public ResponseEntity<Object> deleteUser(Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        userRepository.deleteById(id);
        return ResponseEntity.ok().build();

    }

    public ResponseEntity<Object> getUser(Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        User user = optionalUser.get();

        return ResponseEntity.ok(user);
    }
}
