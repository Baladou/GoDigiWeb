package com.pub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pub.model.User;
import com.pub.repository.UserRepo;

@Service
public class UserService {
	
	@Autowired
	private UserRepo userRepo;
	
	public User insertUser(User user) {
		return userRepo.insert(user);
	}
	
	public List<User> getUsers(){
		return userRepo.findAll();
	}
	
	public Optional<User> getUserById(String id) {
		return userRepo.findById(id);
	}
	
	public void remove(String id) {
		userRepo.deleteById(id);
	}
	
	public User updateUser(User user) {
		return userRepo.save(user);
	}
}
