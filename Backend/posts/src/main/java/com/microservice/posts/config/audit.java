package com.microservice.posts.config;


import org.springframework.data.domain.AuditorAware;

import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
class UserAuditing implements AuditorAware<String> {


    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.empty();
    }
}
