package com.krishantha.rentcloud.authorizationserver.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.krishantha.rentcloud.authorizationserver.model.Role;
import com.krishantha.rentcloud.authorizationserver.model.User;
import com.krishantha.rentcloud.authorizationserver.model.UserDto;
import com.krishantha.rentcloud.authorizationserver.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collections;
import java.util.Optional;
@CrossOrigin
@Service
public class AuthUserService {
    @Autowired
    private UserDetailRepository userRepository;

//    @Autowired
//    private RoleRepository userRoleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(UserDto userDto) {
        User authUser = new ObjectMapper().convertValue(userDto, User.class);
        authUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        authUser.setAccountNonExpired(true);
        authUser.setAccountNonLocked(true);
        authUser.setCredentialsNonExpired(true);
        authUser.setEnabled(true);


//        Role role=new Role();
//        authUser.setRoles(Collections.singletonList(userRoleRepo.findByRoleNameContaining("USER")));
        Optional<User> optUser = userRepository.findByUsernameOrEmail(userDto.getUsername(), userDto.getEmail());
        if (!optUser.isPresent()) {
            return userRepository.save(authUser);
        }
        throw new RuntimeException("User already exist");
    }
}