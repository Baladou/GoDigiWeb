package com.pub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class Post {
	
	@Id
	private String id;
	@DBRef
	private User user;
	private String post;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getPost() {
		return post;
	}
	public void setPost(String post) {
		this.post = post;
	}
	public Post(String id, User user, String post) {
		super();
		this.id = id;
		this.user = user;
		this.post = post;
	}
	public Post() {
		super();
	}
	@Override
	public String toString() {
		return "Post [id=" + id + ", user=" + user + ", post=" + post + "]";
	}
	
	

}
