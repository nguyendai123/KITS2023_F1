package com.thanhson.bookhup.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping("/{id}")
    public ResponseEntity<ResponseSuccess<User>> updateUser(@PathVariable("id") Long id,
            @RequestBody User userInfoRequest) {
        User userResponse = userService.updateUser(id, userInfoRequest);
        ResponseSuccess<User> responseSuccess = new ResponseSuccess<>();
        responseSuccess.setMessage("Updated user successfully.");
        responseSuccess.setData(userResponse);
        return ResponseEntity.ok(responseSuccess);
    }
}
