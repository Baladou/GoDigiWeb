package com.pub.model;


import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Comment {
	
	@Id
	private String id; 
	private String postid;
	private String username;
	private String comment;
	private Date date;
	
	
	
	
	public String getPostid() {
		return postid;
	}
	public void setPostid(String postid) {
		this.postid = postid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		id = id;
	}

	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}

	public Comment() {
		super();
	}
	
	
	public Comment(String id, String postid, String username, String comment, Date date) {
		super();
		this.id = id;
		this.postid = postid;
		this.username = username;
		this.comment = comment;
		this.date = date;
	}
	@Override
	public String toString() {
		return "Comment [id=" + id + ", postid=" + postid + ", username=" + username + ", comment=" + comment
				+ ", date=" + date + "]";
	}


	
}
