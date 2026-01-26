package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterCustomerResponse {
    private int id;
    private String name;
    private String email;
}
