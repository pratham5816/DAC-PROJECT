package com.app.service;


import com.app.exception.UserAlreadyExists;
import com.app.exception.UserNotFound;
import com.app.model.User;
import com.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User deleteUserById(Integer id) {
        Optional<User> temp = userRepository.findById(id);

        if(temp.isPresent()) {
            userRepository.deleteById(id);
            return temp.get();
        } else {
            return null; // or throw an exception if preferred
        }
    }

    public List<User> getAllUsers() {
        return  userRepository.findAll();
    }

    @Transactional
    public void deleteUser(Integer id){

        Optional<User> temp = userRepository.findById(id);

        if(temp.isEmpty()) throw new UserNotFound(id.toString());
        else{
            userRepository.delete(temp.get());
        } 
          // sends 404 if user not found in db and with custom exception               
        // else delete user from db.
        
    }

    @Transactional
    public User addMyUser(User user) {  ///  "present" "absent"

        List<User> temp = userRepository.findByEmail(user.getEmail());

        if(!temp.isEmpty()){
            throw new UserAlreadyExists(user.getEmail());
        }

        return userRepository.save(user);
    }
}
