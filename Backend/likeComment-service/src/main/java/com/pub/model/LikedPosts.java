package com.pub.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class LikedPosts {
	
	@Id
	private String idPost;
	private List<User> userId;
	
	
	public String getIdPost() {
		return idPost;
	}
	public void setIdPost(String idPost) {
		this.idPost = idPost;
	}
	public List<User> getUserId() {
		return userId;
	}
	public void setUserId(List<User> userId) {
		this.userId = userId;
	}
	
	
	public LikedPosts(String idPost, List<User> userId) {
		super();
		this.idPost = idPost;
		this.userId = userId;
	}
	public LikedPosts() {
		super();
	}
	@Override
	public String toString() {
		return "LikedPosts [idPost=" + idPost + ", userId=" + userId +"]";
	}

	
	
}
