package com.app.controller;

import com.app.dto.EmailRequest;
import com.app.dto.RegisterUserResponse;
import com.app.model.User;
import java.util.List;


import com.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("user")
@CrossOrigin("http://localhost:5173")

public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getUser")
    public List<User> getAll(){
        return userService.getAllUsers();
    }

    @PostMapping("/getUserIDbyEmail")
    public ResponseEntity<String> getUserID(@RequestBody EmailRequest emailRequest){
        String id = userService.getUserIDbyEmail(emailRequest);
        return ResponseEntity.status(HttpStatus.OK).body(id);
    }

    @PostMapping("/register")
    public ResponseEntity<?> add(@RequestBody User user){
        RegisterUserResponse res = userService.addMyUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id){
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted with id " + id);
    }



}
