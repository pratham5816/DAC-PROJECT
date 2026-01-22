package com.app.service;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import com.app.exception.CustomerAlreadyExists;
import com.app.exception.CustomerNotFound;
import com.app.model.Customer;
import com.app.repository.CustomerRepository;

@Service
public class CustomerService {


    private final PasswordEncoder passwordEncoder;

    public CustomerService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    private CustomerRepository customerRepository;


    public List<Customer> getAllCustomers(){
        return customerRepository.findAll(); 
    }


   @Transactional
    public Customer addMyCustomer(Customer customer){
        customer.setName(customer.getName().trim().toLowerCase());

       List<Customer> temp =  customerRepository.findByEmail(customer.getEmail());
       if(!temp.isEmpty()) throw new CustomerAlreadyExists(customer.getEmail());
       customer.setPassword(passwordEncoder.encode(customer.getPassword()));
       return customerRepository.save(customer);
    }

    @Transactional
    public void deleteById(Integer id){
        Optional<Customer> cus = customerRepository.findById(id);
        if(cus.isEmpty()) throw new CustomerNotFound(id);
        customerRepository.deleteById(id);
    }

}
