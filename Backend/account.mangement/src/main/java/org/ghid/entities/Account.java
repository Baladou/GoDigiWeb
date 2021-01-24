package org.ghid.entities;

import java.awt.Image;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.xml.crypto.Data;

import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;



@Document
public  class Account   {
	@Id
	private String id;
	
	private String iduser;
	private String userName;
	private String profilePicture;
	private String dateNessence;
	
	
	
	public Account(String id, String iduser, String userName, String profilePicture, String dateNessence) {
		super();
		this.id = id;
		this.iduser = iduser;
		this.userName = userName;
		this.profilePicture = profilePicture;
		this.dateNessence = dateNessence;
	}



	public Account() {
		super();
	}



	public String getId() {
		return id;
	}



	public void setId(String id) {
		this.id = id;
	}



	public String getIduser() {
		return iduser;
	}



	public void setIduser(String iduser) {
		this.iduser = iduser;
	}



	public String getUserName() {
		return userName;
	}



	public void setUserName(String userName) {
		this.userName = userName;
	}



	public String getProfilePicture() {
		return profilePicture;
	}



	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}



	public String getDateNessence() {
		return dateNessence;
	}



	public void setDateNessence(String dateNessence) {
		this.dateNessence = dateNessence;
	}
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
