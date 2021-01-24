package com.microservice.posts.dao;

import com.microservice.posts.model.Post;
import com.microservice.posts.web.exceptions.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Paths;
import java.util.List;

@Service
@Slf4j
public class PostdaoImp {
    public static String uploadDirectory = System.getProperty("user.dir") + "/uploads";
    @Autowired
    private PostDao Postdao;


    //private PostEventSender postEventSender;


    public Post createPost(MultipartFile image,String caption) {


        String filePath= null;
        try {
            filePath = CreateImage(image);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Post post = new Post(filePath,caption);
       //Post post= new Post("user","https","hello");
        post = Postdao.save(post);
       /* postEventSender.sendPostCreated(post);*/

       /* log.info("post {} is saved successfully for user {}",
                post.getId(), post.getUsername());*/

        return post;
    }

    public void deletePost(String postId, String username) {
        log.info("deleting post {}", postId);

        Postdao
                .findById(postId)
                .map(post -> {
                 /*   if(!post.getUsername().equals(username)) {
                        log.warn("user {} is not allowed to delete post id {}", username, postId);
                        throw new NotAllowedException(username, "post id " + postId, "delete");
                    }*/

                    Postdao.delete(post);

                   // boolean status = false;

                    File fileToDelete = new File(post.getImageUrl());
                    boolean status = fileToDelete.delete();
                    System.out.println(this.getClass().getSimpleName() + ":deleting file... " + post.getImageUrl());
                    System.out.println("Success: " + status + " fileToDelete: " + fileToDelete);

                    //postEventSender.sendPostDeleted(post);
                    return post;
                })
                .orElseThrow(() -> {
                    log.warn("post not found id {}", postId);
                    return new ResourceNotFoundException(postId);
                });
    }

    public List<Post> postsByUsername(String username) {
        return Postdao.findByUsernameOrderByCreatedAtDesc(username);
    }

    public List<Post> postsByIdIn(List<String> ids) {

        return Postdao.findByIdInOrderByCreatedAtDesc(ids);
    }

    public Post postsById(String id) {

        return Postdao.findById(id).orElseThrow(() ->new ResourceNotFoundException(id) );
    }

    public List<Post> Allposts() {

        return Postdao.findAll();
    }


    public Post  updatePost(String id, MultipartFile image, String caption){
        log.info("received a request to create a post for image {}", caption);

        return Postdao.findById(id)
                .map(post -> {

                        File fileToDelete = new File(post.getImageUrl());
                        boolean status = fileToDelete.delete();

                    String filePath= null;
                    try {
                        filePath = CreateImage(image);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }


                    post.setImageUrl(filePath);
                    post.setCaption(caption);

                    return Postdao.save(post);
                })
                .orElseThrow(() -> {
                    log.warn("post not found id {}", id);
                    return new ResourceNotFoundException(id);
                });
    }
    String CreateImage(MultipartFile image) throws IOException {

            String fileName = image.getOriginalFilename();
            String filePath = Paths.get(uploadDirectory, fileName).toString();


            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
            stream.write(image.getBytes());
            stream.close();
            return filePath;




    }
}
