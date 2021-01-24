package com.pub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.pub.model.Post;
import com.pub.model.User;
import com.pub.repository.PostRepo;

@Service
public class PostService {
	
	@Autowired
	private PostRepo postRepo;
	
	public Post post(Post post) {
		return postRepo.insert(post);
	}
	
	public List<Post> getPosts(){
		return postRepo.findAll();
	}
	
	public List<Post> getPostsByUser(User user){
		return postRepo.findPostByUser(user);
	}
}
