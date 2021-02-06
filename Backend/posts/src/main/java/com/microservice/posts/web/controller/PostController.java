package com.microservice.posts.web.controller;


import com.microservice.posts.dao.PostdaoImp;
import com.microservice.posts.model.Post;
import com.microservice.posts.payload.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.*;
import java.net.URI;
import java.util.List;

@Slf4j
@RestController
public class PostController {
    public static String uploadDirectory = System.getProperty("user.dir") + "/uploads";
    @Autowired
    private PostdaoImp postService;














    @PostMapping("/posts")
    public ResponseEntity<?> createPost(
                                        @RequestParam("caption")  String caption,
                                        final @RequestParam("image") MultipartFile image,@RequestParam("email")  String email ) throws IOException {



        Post post = postService.createPost(email,image,caption);


        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/posts/{id}")
                .buildAndExpand(post.getId()).toUri();

        return ResponseEntity
                .created(location)
                .body(new ApiResponse(true, "Post created successfully"));
    }


    @DeleteMapping("/posts/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable("id") String id,@PathVariable("email") String email/*@AuthenticationPrincipal Principal user*/) {
        log.info("received a delete request for post id {} from user {}", id);
        postService.deletePost(id,email);
    }

    @GetMapping("/OnePost/posts/{id}")
    public ResponseEntity<?> PostById(@PathVariable("id") String id/*@AuthenticationPrincipal Principal user*/) {
       // log.info("received a delete request for post id {} from user {}", id);
        Post post=postService.postsById(id);
        return ResponseEntity.ok(post);
    }




    /*
    @GetMapping("/posts/me")
    public ResponseEntity<?> findCurrentUserPosts(@AuthenticationPrincipal Principal principal) {
        log.info("retrieving posts for user {}", principal.getName());

        List<Post> posts = postService.postsByUsername(principal.getName());
        log.info("found {} posts for user {}", posts.size(), principal.getName());

        return ResponseEntity.ok(posts);
    }

*/
    @GetMapping("/posts/{email}")
    public ResponseEntity<?> findUserPosts(@PathVariable("email") String email) {
        log.info("retrieving posts for user {}", email);

        List<Post> posts = postService.postsByEmail(email);
        log.info("found {} posts for user {}", posts.size(), email);

        return ResponseEntity.ok(posts);
    }

    /*@PostMapping("/posts/in")
    public ResponseEntity<?> findPostsByIdIn(@RequestBody List<String> ids) {
        log.info("retrieving posts for {} ids", ids.size());

        List<Post> posts = postService.postsByIdIn(ids);
        log.info("found {} posts", posts.size());

        return ResponseEntity.ok(posts);
    }*/

    @PutMapping("/posts/{id}")
    public ResponseEntity<?> updatePost( @RequestParam("caption")  String caption,
                              final @RequestParam("image") MultipartFile image, @PathVariable("id") String id,@RequestParam("email")  String email) {

        Post post = postService.updatePost(id,image,caption,email);
        return ResponseEntity.ok(post);
    }

}
