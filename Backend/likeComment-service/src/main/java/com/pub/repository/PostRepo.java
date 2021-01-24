package com.pub.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pub.model.Post;
import com.pub.model.User;

@Repository
public interface PostRepo extends MongoRepository<Post, String>{
	public List<Post> findPostByUser(User user);
}
