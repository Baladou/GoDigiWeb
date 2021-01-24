package com.pub.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pub.model.Comment;

@Repository
public interface CommentRepo extends MongoRepository<Comment, String>{
	
}
