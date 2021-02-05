package com.microservice.posts.dao;

import com.microservice.posts.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostDao extends MongoRepository<Post, String> {
    List<Post> findByEmailOrderByCreatedAtDesc(String email);
    List<Post> findByIdInOrderByCreatedAtDesc(List<String> ids);
   // List<Post> findAll();

}