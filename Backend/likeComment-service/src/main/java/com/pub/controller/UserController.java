package com.pub.controller;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pub.model.User;
import com.pub.service.UserService;

@RestController
@RequestMapping({"/users"})
public class UserController {
	
	@Autowired
	private UserService userService;

	@PostMapping({""})
	public ResponseEntity<User> insert(@RequestBody User user) {
		System.out.print(user);
		 User result= userService.insertUser(user);
		 return new ResponseEntity<>(result,HttpStatus.CREATED);
	}
	
	@GetMapping({""})
	public ResponseEntity<List<User>> get(){
		List<User> result=userService.getUsers();
		return new ResponseEntity<List<User>>(result,HttpStatus.OK);
	}
	
	@GetMapping({"/{id}"})
	public ResponseEntity<Optional<User>> getById(@PathVariable String id){
		Optional<User> result=userService.getUserById(id);
		return new ResponseEntity<Optional<User>>(result,HttpStatus.OK);
	}
	
	@DeleteMapping({"/{id}"})
	public ResponseEntity<Void> remove(@PathVariable String id){
		userService.remove(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@PutMapping({"/{id}"})
	public ResponseEntity<Void> update(@RequestBody User user, @PathVariable String id){
		user.setId(id);
		userService.updateUser(user);
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
}
