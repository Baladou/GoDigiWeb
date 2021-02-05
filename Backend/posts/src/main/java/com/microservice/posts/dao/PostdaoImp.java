package com.microservice.posts.dao;

import com.microservice.posts.model.Post;
import com.microservice.posts.web.exceptions.NotAllowedException;
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


    public Post createPost(String email,MultipartFile image,String caption) {


        String filePath= null;
        try {
            filePath = CreateImage(image);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Post post = new Post(email,filePath,caption);
       //Post post= new Post("user","https","hello");
        post = Postdao.save(post);
       /* postEventSender.sendPostCreated(post);*/

       /* log.info("post {} is saved successfully for user {}",
                post.getId(), post.getUsername());*/

        return post;
    }

    public void deletePost(String postId, String email) {
        log.info("deleting post {}", postId);

        Postdao
                .findById(postId)
                .map(post -> {
                   if(!post.getEmail().equals(email)) {
                        log.warn("user {} is not allowed to delete post id {}", email, postId);
                        throw new NotAllowedException(email, "post id " + postId, "delete");
                    }

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

    public List<Post> postsByEmail(String email) {

        return Postdao.findByEmailOrderByCreatedAtDesc(email);
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


    public Post  updatePost(String id, MultipartFile image, String caption,String email){
        log.info("received a request to create a post for image {}", caption);

        return Postdao.findById(id)
                .map(post -> {
                    if(!post.getEmail().equals(email)) {
                        log.warn("user {} is not allowed to delete post id {}", email, id);
                        throw new NotAllowedException(email, "post id " + id, "delete");
                    }

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
