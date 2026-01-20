package com.controller;

import com.app.model.User;
import java.util.List;


import com.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:5500")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getUser")
    public List<User> getAll(){
        return userService.getAllUsers();
    }

    @PostMapping("/addUser")
    public BodyBuilder add(@RequestBody User user){
        userService.addMyUser(user);
        return ResponseEntity.status(203);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id){
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted with id " + id);
    }



}
