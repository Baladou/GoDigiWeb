package com.pub.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.pub.model.LikedPosts;
import com.pub.model.Post;

@Repository
public interface LikedRepo extends MongoRepository<LikedPosts, String> {
	

}
