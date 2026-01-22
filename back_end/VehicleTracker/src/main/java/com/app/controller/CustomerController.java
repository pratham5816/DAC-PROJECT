package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.service.CustomerService;
import com.app.model.Customer;


@RestController
@RequestMapping("Customer")
@CrossOrigin("http://localhost:5173")

public class CustomerController {
    
    @Autowired
    private CustomerService customerService;

    @GetMapping("/getCustomers")
    public List<Customer> getAll(){
        return customerService.getAllCustomers();
    }

    @PostMapping("/addCustomer")
    public ResponseEntity<Customer> add(@RequestBody Customer customer){
        Customer savedCustomer = customerService.addMyCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomer);
    }
    
    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id){
        customerService.deleteById(id);
        return ResponseEntity.ok("Request Accepted id " + id);
    }


//    @GetMapping("/validateCusmoter")
//    public ResponseEntity<Boolean> checkUser(@RequestBody Customer customer){
//
//    }


}
