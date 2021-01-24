package com.pub.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.bson.codecs.CollectibleCodec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pub.model.LikedPosts;
import com.pub.model.Post;
import com.pub.repository.LikedRepo;

@Service
public class LikedService {
	
	@Autowired
	private LikedRepo likedRepo;
	
	public LikedPosts like(LikedPosts likeps){
		return likedRepo.save(likeps);
	}
	
	public List<LikedPosts> get(){
		return likedRepo.findAll();	
	}
	
	public Optional<LikedPosts> findById(String id) {
		return likedRepo.findById(id);
	}
	

	
}
