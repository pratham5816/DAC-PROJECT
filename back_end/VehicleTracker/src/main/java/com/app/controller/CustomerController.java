package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.CustomerService;
import com.app.model.Customer;


@RestController
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


}
