package com.SOEN343.API.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SOEN343.API.config.auth.TokenProvider;
import com.SOEN343.API.notificationservice.*;
import com.SOEN343.API.user.dto.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final AlertService alertService;

    @Autowired
    public UserController(UserService userService, AlertService alertService) {
        this.userService = userService;
        this.alertService = alertService;
        this.alertService.subscribe(new SecurityNotifier());
    }

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider tokenService;

    @GetMapping("/all")
    public ResponseEntity<Object> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/current")
    public ResponseEntity<UserDto> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            var user = authentication.getPrincipal();
            if (user instanceof User) {
                User authenticatedUser = (User) user;
                return ResponseEntity.ok(new UserDto(authenticatedUser));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> createUser(@RequestBody @Valid SignUpDto data) {
        if (userService.loadUserByUsername(data.name()) != null) {
            alertService.failedSignup(data.name());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
        userService.signUp(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/signin")
    public ResponseEntity<SignInResponseDto> signIn(@RequestBody @Valid SignInDto data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.name(), data.password());
        try {
            var authUser = authenticationManager.authenticate(usernamePassword);
            User user = (User) authUser.getPrincipal();
            UserDto userDto = new UserDto(user);
            String accessToken = tokenService.generateAccessToken(user);
            return ResponseEntity.ok(new SignInResponseDto(accessToken, userDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PutMapping("/updateUser/{id}") // <-- The {id} is the @PathVariable parameter to this function
    public ResponseEntity<Object> updateUser(@PathVariable Integer id, @RequestBody User user) {
        return userService.updateUser(id, user);

    }

    @DeleteMapping("/deleteUser/{id}") // <-- The {id} is the @PathVariable parameter to this function
    public ResponseEntity<Object> updateUser(@PathVariable Integer id) {
        return userService.deleteUser(id);

    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Integer id) {
        return userService.getUser(id);
    }

    @GetMapping("/{id}/orders")
    public ResponseEntity<Object> getUserOrders(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user.getOrders());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().build();
    }

}