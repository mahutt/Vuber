package com.SOEN343.API.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.SOEN343.API.user.dto.SignUpDto;
import com.auth0.jwt.exceptions.InvalidClaimException;

import java.util.*;

//Logic for user class
@Service
public class UserService implements UserDetailsService {
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByName(username);
    }

    public UserDetails signUp(SignUpDto data) throws InvalidClaimException {
        if (userRepository.findByName(data.name()) != null) {
            throw new InvalidClaimException("Username already exists");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.name(), encryptedPassword);
        return userRepository.save(newUser);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            var user = authentication.getPrincipal();
            if (user instanceof User) {
                User authenticatedUser = (User) user;
                return authenticatedUser;
            }
        }
        return null;
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

}
