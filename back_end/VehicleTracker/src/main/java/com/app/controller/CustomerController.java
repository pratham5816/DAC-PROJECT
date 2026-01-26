package com.app.controller;

import java.util.List;

import com.app.dto.RegisterCustomerResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.service.CustomerService;
import com.app.model.Customer;


@RestController
@RequestMapping("customer")
@CrossOrigin("http://localhost:5173")
public class CustomerController {
    

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/getCustomers")
    public List<Customer> getAll(){
        return customerService.getAllCustomers();
    }

    @PostMapping("/register")
    public ResponseEntity<?> add(@RequestBody Customer customer){
        RegisterCustomerResponse savedCustomer = customerService.addMyCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomer);
    }
    
    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id){
        customerService.deleteById(id);
        return ResponseEntity.ok("Request Accepted id " + id);
    }

}
