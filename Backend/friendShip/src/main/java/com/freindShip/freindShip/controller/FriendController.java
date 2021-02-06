package com.freindShip.freindShip.controller;

import com.freindShip.freindShip.model.Friend;
import com.freindShip.freindShip.model.UserAuth;
import com.freindShip.freindShip.repository.FrindRepo;
import com.freindShip.freindShip.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/friends"})
public class FriendController {
    @Autowired
    private FriendService friendService;

    @GetMapping({"/{id}"})
    public ResponseEntity<List<Friend>>  getUserFriendsList(@PathVariable String id){
        UserAuth user = new UserAuth();
               user.setUser_name((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        System.out.println((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        System.out.println(user.getUser_name());
        return friendService.getUserFriendsList(id);
    }


    @PostMapping({""})
    public ResponseEntity<Friend> addFriend( @RequestBody Friend friend) {
        return  friendService.addFriend(friend);
    }

    @PutMapping({""})
    public ResponseEntity<Friend> blockFriends(@RequestBody Friend friend){
        return  friendService.blockFriends(friend);
    }
    @DeleteMapping({""})
    public ResponseEntity deleteFriends(@RequestBody Friend friend){
        return   friendService.deleteFriends(friend);
    }

    @PutMapping({"/AcceptedFriend"})
    public ResponseEntity<Friend> acceptedFriends(@RequestBody Friend friend){
        return friendService.acceptedFriends(friend);
    }




}
