package com.krishantha.rentcloud.authorizationserver.repository;

import com.krishantha.rentcloud.authorizationserver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin
@Repository
public interface UserDetailRepository extends JpaRepository<User,Integer> {


    Optional<User> findByUsername(String name);
    Optional<User> findByUsernameOrEmail(String name,String email);
}
