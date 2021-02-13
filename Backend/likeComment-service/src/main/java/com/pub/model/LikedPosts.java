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
	private List<String> username;
	
	
	
	
	public List<String> getUsername() {
		return username;
	}
	public void setUsername(List<String> username) {
		this.username = username;
	}
	public String getIdPost() {
		return idPost;
	}
	public void setIdPost(String idPost) {
		this.idPost = idPost;
	}

	

	public LikedPosts(String idPost, List<String> username) {
		super();
		this.idPost = idPost;
		this.username = username;
	}
	public LikedPosts() {
		super();
	}
	@Override
	public String toString() {
		return "LikedPosts [idPost=" + idPost + ", username=" + username + "]";
	}
	
	


	
	
}
