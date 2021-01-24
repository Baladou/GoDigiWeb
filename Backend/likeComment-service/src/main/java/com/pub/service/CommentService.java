package com.pub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pub.model.Comment;
import com.pub.repository.CommentRepo;

@Service
public class CommentService {
	
	@Autowired
	private CommentRepo commentRepo;
	
	public Comment commentePost(Comment comment) {
		return commentRepo.insert(comment);
	}
	
	public List<Comment> getAll(){
		return commentRepo.findAll();
	}
	
	public Optional<Comment> getCommentById(String id){
		return commentRepo.findById(id);
	}
	
	public Comment updateComment (Comment comment) {
		return commentRepo.save(comment);
	}
	
	public void deleteComment(String id) {
		 commentRepo.deleteById(id);
	}
}
