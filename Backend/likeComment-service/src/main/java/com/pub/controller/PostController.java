package com.pub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pub.model.Post;
import com.pub.model.User;
import com.pub.service.PostService;

@RestController
@RequestMapping({"/posts"})
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@PostMapping({""})
	public ResponseEntity<Post> post(@RequestBody Post post) {
		 Post result= postService.post(post);
		return new ResponseEntity<>(result,HttpStatus.CREATED);
	}
	
	@GetMapping({""})
	public ResponseEntity<List<Post>> getPosts(){
		List<Post> result= postService.getPosts();
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping({"/{id}"})
	public ResponseEntity<List<Post>> getPostsByUser(User user){
		List<Post> resultList=postService.getPostsByUser(user);
		return new ResponseEntity<List<Post>>(resultList,HttpStatus.OK);
	}

}
