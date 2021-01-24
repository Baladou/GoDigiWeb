package com.freindShip.freindShip.service.impl;

import com.freindShip.freindShip.model.Friend;
import com.freindShip.freindShip.repository.FrindRepo;
import com.freindShip.freindShip.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FriendServiceImpl implements FriendService {

    @Autowired
    private FrindRepo frindRepo;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public ResponseEntity<List<Friend>> getUserFriendsList(String id) {
       /* Query query = new Query();
        query.addCriteria(Criteria.where("fromUser").is(id));
        query.addCriteria(Criteria.where("status").is(1));

        List<Friend> friends = mongoTemplate.find(query, Friend.class);*/
        List<Friend> result= frindRepo.findFriendByFromUserAndStatus(id,1);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Friend> addFriend(Friend friend) {
        friend.setStatus(0);
        Friend result= frindRepo.save(friend);
        return new ResponseEntity<>(result,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Friend> blockFriends(Friend friend) {
        Friend result= frindRepo.findFriendsByFromUserAndToUser(friend.getFromUser(), friend.getToUser());
        result.setStatus(3);
        frindRepo.save(result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity deleteFriends(Friend friend) {
        //frindRepo.fi
        Friend result= frindRepo.findFriendsByFromUserAndToUser(friend.getFromUser(), friend.getToUser());
        result.setStatus(2);

        frindRepo.save(result);


       // frindRepo.delete(friend);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Friend> acceptedFriends(Friend friend) {
        //friend.setAccepted(true);

        Friend result= frindRepo.findFriendsByFromUserAndToUser(friend.getFromUser(), friend.getToUser());
        result.setStatus(1);
        frindRepo.save(result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
