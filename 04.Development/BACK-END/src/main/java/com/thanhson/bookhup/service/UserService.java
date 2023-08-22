package com.thanhson.bookhup.service;


import com.thanhson.bookhup.model.Group;
import com.thanhson.bookhup.model.User;
import com.thanhson.bookhup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long userID) {
        return userRepository.getById(userID);
    }
}
