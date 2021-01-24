package com.freindShip.freindShip.service;

import com.freindShip.freindShip.model.Friend;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
public interface FriendService {
    public ResponseEntity<List<Friend>> getUserFriendsList(String id);
    public ResponseEntity<Friend> addFriend( @RequestBody Friend friend);
    public ResponseEntity<Friend> blockFriends(@RequestBody Friend friend);
    public ResponseEntity deleteFriends(@RequestBody Friend friend);
    public ResponseEntity<Friend> acceptedFriends(@RequestBody Friend friend);

}
