package com.app.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    private final String baseUrl;

    public RestClientConfig(@Value("${matrix.service.url}") String baseUrl) {
        this.baseUrl = baseUrl;
    }

    @Bean
    RestClient restClient(RestClient.Builder builder) {
        return builder.baseUrl(baseUrl).build();
    }

}
