package com.krishantha.rentcloud.authorizationserver.controller;

import com.krishantha.rentcloud.authorizationserver.model.User;
import com.krishantha.rentcloud.authorizationserver.model.UserDto;
import com.krishantha.rentcloud.authorizationserver.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/oauth/users")
public class UserController {

    @Autowired
    private AuthUserService authUserService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)

    public User register(@RequestBody UserDto userDto) {


        return authUserService.register(userDto);
    }

}