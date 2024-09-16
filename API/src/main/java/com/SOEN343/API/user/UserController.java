package com.SOEN343.API.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


//Handle http requests related to User objects
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/createUser")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        return userService.newUser(user);

    }
    
    @PutMapping("/updateUser/{id}") //<--    The {id} is the @PathVariable parameter to this function
    public ResponseEntity<Object> updateUser(@PathVariable Integer id, @RequestBody User user) {
        return userService.updateUser(id, user);

    }
    
    @DeleteMapping("/deleteUser/{id}") //<--    The {id} is the @PathVariable parameter to this function
    public ResponseEntity<Object> updateUser(@PathVariable Integer id) {
        return userService.deleteUser(id);

    }
    @GetMapping("/getUserById/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Integer id){
        return userService.getUser(id);
    }


    

}
