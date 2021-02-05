package com.microservice.posts.config;

class BearerTokenWrapper {
    private String token;


    // setters and getters


    public BearerTokenWrapper() {
    }

    public BearerTokenWrapper(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
