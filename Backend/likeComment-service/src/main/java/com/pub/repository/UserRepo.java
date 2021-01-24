package com.pub.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pub.model.User;

@Repository
public interface UserRepo extends MongoRepository<User, String>{

}
