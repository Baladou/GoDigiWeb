package com.microservice.posts.model;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Date;

@Data
@RequiredArgsConstructor
@Document
public class Post {

    @Id
    private String id;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;


    @LastModifiedBy
    private String lastModifiedBy;

    @NonNull
    private String username;
    @NonNull
    private String imageUrl; //for now post will contain only one image

    @NonNull
    private String caption;
}
