package com.microservice.posts.web.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.FORBIDDEN)
public class NotAllowedException extends RuntimeException {

    public NotAllowedException(String email, String resource, String operation) {
        super(String.format("user %s is not allowed to %s resource %s",
                email, operation, resource));
    }
}
