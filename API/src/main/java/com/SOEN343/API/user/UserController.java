package com.SOEN343.API.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SOEN343.API.config.auth.TokenProvider;
import com.SOEN343.API.user.dto.*;

//Handle http requests related to User objects
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
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
                return ResponseEntity.ok(new UserDto(authenticatedUser.getId(), authenticatedUser.getUsername()));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> createUser(@RequestBody @Valid SignUpDto data) {
        UserDetails details = userService.signUp(data);
        return ResponseEntity.status(HttpStatus.CREATED).body((User) details);
    }

    @PostMapping("/signin")
    public ResponseEntity<SignInResponseDto> signIn(@RequestBody @Valid SignInDto data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.name(), data.password());
        var authUser = authenticationManager.authenticate(usernamePassword);
        User user = (User) authUser.getPrincipal();
        String accessToken = tokenService.generateAccessToken(user);
        return ResponseEntity.ok(new SignInResponseDto(accessToken, user));
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

}
