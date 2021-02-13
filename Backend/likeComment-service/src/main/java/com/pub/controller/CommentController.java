package com.pub.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.pub.model.Comment;
import com.pub.model.User;
import com.pub.service.CommentService;

@RestController

public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@PostMapping({"/comment"})
	public ResponseEntity<Comment> commenter(@RequestBody Comment comment){
		comment.setDate(new Date());
        System.out.println("dfqfs");

		System.out.println(comment);
        User user = new User();
        user.setUser_name((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        //user.setUser_id((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        System.out.println((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        System.out.println(user.getUser_name());
        //System.out.println(user.getUser_id());
		System.out.println(user+"-----------------------");
		comment.setUserid(user);
		Comment resultComment=commentService.commentePost(comment);
		return new ResponseEntity<Comment>(resultComment,HttpStatus.CREATED);
	}
	
	@GetMapping({"/comment"})
	public ResponseEntity<List<Comment>> getAll(){
		List<Comment> resComments=commentService.getAll();
		return new ResponseEntity<List<Comment>>(resComments,HttpStatus.OK);
	}
	
	@GetMapping("/comment/{id}")
	public ResponseEntity<Optional<Comment>> getCommentById(@PathVariable String id){
		Optional<Comment> resultOptional=commentService.getCommentById(id);
		return new ResponseEntity<Optional<Comment>>(resultOptional,HttpStatus.OK);
	}
	
	
	@PatchMapping({"/comment/{idComment}"})
	public ResponseEntity<Comment> updateComment(@PathVariable String idComment,@RequestBody Comment comment){
		Optional<Comment> resOptional=commentService.getCommentById(idComment);
		resOptional.get().setComment(comment.getComment());
		Comment resComment=commentService.updateComment(resOptional.get());
		return new ResponseEntity<Comment>(resComment,HttpStatus.OK);
	}
	
	@DeleteMapping({"/comment/{id}"})
	public ResponseEntity<Void> removeComment(@PathVariable String id){
		commentService.deleteComment(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		
	}
}
