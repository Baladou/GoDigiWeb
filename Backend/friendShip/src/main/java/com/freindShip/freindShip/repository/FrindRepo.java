package com.freindShip.freindShip.repository;

import com.freindShip.freindShip.model.Friend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FrindRepo extends MongoRepository<Friend, String> {

 //public List<Friend> findFriendById(String id);
 public List<Friend> findFriendByFromUserAndStatus(String id,int status);
 public  Friend findFriendsByFromUserAndToUser(String fromId,String toId);

}
