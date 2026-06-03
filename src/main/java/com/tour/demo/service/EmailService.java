package com.tour.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${BREVO_API_KEY}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendMail(String to, String subject, String text){

        String url = "https://api.brevo.com/v3/smtp/email";

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.set("api-key", apiKey);

        Map<String, Object> body = Map.of(
            "sender", Map.of(
                "name", "Sunturist",
                "email", "sunturist.notifications@gmail.com"
            ),
            "to", List.of(
                Map.of("email", to)
            ),
            "subject", subject,
            "textContent", text
        );

        HttpEntity<Map<String, Object>> entity =
            new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
            restTemplate.postForEntity(
                url,
                entity,
                String.class
            );

        System.out.println(response.getBody());
    }

}
