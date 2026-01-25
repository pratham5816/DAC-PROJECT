package com.app.service;


import com.app.dto.EmailRequest;
import com.app.exception.UserAlreadyExists;
import com.app.exception.UserNotFound;
import com.app.model.User;
import com.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder , UserRepository userRepository) {
            this.userRepository = userRepository;
         this.passwordEncoder = passwordEncoder;
         // after researching constructor injection makes more sence  rather than @autowired for mandatory dependencies.
    }


    public String getUserIDbyEmail(EmailRequest emailRequest) {

        emailRequest.setEmail(emailRequest.getEmail().trim());

        Optional<User> temp = userRepository.findByEmail(emailRequest.getEmail());

        if(temp.isEmpty()) throw new UserNotFound(emailRequest);     // handler with parameter EmailRequest will handler.

        return String.valueOf(temp.get().getId());
    }

    @Transactional
    public User deleteUserById(Integer id) {
        Optional<User> temp = userRepository.findById(id);

        if (temp.isPresent()) {
            userRepository.deleteById(id);
            return temp.get();
        } else {
            return null; // or throw an exception if preferred
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    @Transactional
    public void deleteUser(Integer id) {

        Optional<User> temp = userRepository.findById(id);

        if (temp.isEmpty()) throw new UserNotFound(id);
        else {
            userRepository.delete(temp.get());
        }
        // sends 404 if user not found in db and with custom exception
        // else delete user from db.

    }

    @Transactional
    public User addMyUser(User user) {  ///  "present" "absent"

        Optional<User> temp = userRepository.findByEmail(user.getEmail());

        if (!temp.isEmpty()) {
            throw new UserAlreadyExists(user.getEmail());
        }

        // encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
}
