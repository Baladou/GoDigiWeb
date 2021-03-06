package com.pub.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pub.model.LikedPosts;
import com.pub.model.Post;
import com.pub.model.User;
import com.pub.service.LikedService;

@RestController
public class LikeController {
	
	@Autowired
	private LikedService likedService;
	
	@PutMapping({"post/like"})
	public ResponseEntity<LikedPosts> like(@RequestBody LikedPosts likepost) {
		System.out.println(getLikedPost(likepost).getBody().equals(Optional.empty()));
		
		if(!getLikedPost(likepost).getBody().equals(Optional.empty())) {
			System.out.println("dadadad");
			List<String> users=new ArrayList<>();
			System.out.println("dadadadaaaaaaaaaaaaaaa");
			System.out.println("--------"+getLikedPost(likepost).getBody().get().getUsername());
			System.out.println("ppppppppppppppp");
			if(getLikedPost(likepost).getBody().get().getUsername()!=null) {
			for(int i=0;i<getLikedPost(likepost).getBody().get().getUsername().size();i++) {
				users.add(getLikedPost(likepost).getBody().get().getUsername().get(i));
				System.out.println("tttttttttt");

			}
			}
			
			System.out.println("1111111");

			users.add((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
			likepost.setUsername(users);
		}

		
		LikedPosts res=likedService.like(likepost);
		return new ResponseEntity<LikedPosts>(res,HttpStatus.CREATED);
	}
	
	@PutMapping({"post/unlike"})
	public ResponseEntity<LikedPosts> unlike(@RequestBody LikedPosts unlikepost) {
		if(getLikedPost(unlikepost)!=null) {
			List<String> users=new ArrayList<>();
			for(int i=0;i<getLikedPost(unlikepost).getBody().get().getUsername().size();i++) {
				
				if(!getLikedPost(unlikepost).getBody().get().getUsername().get(i).equals((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal())) {
					users.add(getLikedPost(unlikepost).getBody().get().getUsername().get(i));
				}
			}
			unlikepost.setUsername(users);
		}
		LikedPosts res=likedService.like(unlikepost);
		return new ResponseEntity<LikedPosts>(res,HttpStatus.CREATED);
	}
	
	@GetMapping({"posts/likes"})
	public ResponseEntity<List<LikedPosts>> getLikedPosts(){
		List<LikedPosts> resLikedPosts=likedService.get();
		return new ResponseEntity<List<LikedPosts>>(resLikedPosts,HttpStatus.OK);
	}
	
	@GetMapping({"post/likes"})
	public ResponseEntity<Optional<LikedPosts>> getLikedPost(@RequestBody LikedPosts id){
		String idString=id.getIdPost();
		Optional<LikedPosts> resLikedPosts=likedService.findById(idString);
		return new ResponseEntity<Optional<LikedPosts>>(resLikedPosts,HttpStatus.OK);
	}
	


}
