package com.microservice.posts;

import com.microservice.posts.web.controller.PostController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import java.io.File;

@EnableDiscoveryClient
@SpringBootApplication
@EnableMongoAuditing
public class PostsApplication {

    public static void main(String[] args) {
        new File(PostController.uploadDirectory).mkdir();
        SpringApplication.run(PostsApplication.class, args);

    }

}
