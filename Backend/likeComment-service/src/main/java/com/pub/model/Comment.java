package com.pub.model;


import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Comment {
	
	@Id
	private String id; 
	private Post postid;
	private User userid;
	private String comment;
	private Date date;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		id = id;
	}
	public Post getPostid() {
		return postid;
	}
	public void setPostid(Post postid) {
		this.postid = postid;
	}
	public User getUserid() {
		return userid;
	}
	public void setUserid(User userid) {
		this.userid = userid;
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
	public Comment(String id, Post postid, User userid, String comment, Date date) {
		super();
		id = id;
		this.postid = postid;
		this.userid = userid;
		this.comment = comment;
		this.date = date;
	}
	public Comment() {
		super();
	}
	@Override
	public String toString() {
		return "Comment [Id=" + id + ", postid=" + postid + ", userid=" + userid + ", comment=" + comment + ", date="
				+ date + "]";
	}

	
}
