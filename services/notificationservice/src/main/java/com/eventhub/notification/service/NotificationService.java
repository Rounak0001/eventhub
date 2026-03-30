package com.EventZen.notification.service;

import com.EventZen.notification.dto.NotificationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationService {

        private final EmailTemplateService templateService;

        @Value("${brevo.api-key:}")
        private String apiKey;

        @Value("${brevo.sender-email:}")
        private String senderEmail;

        @Value("${brevo.sender-name:EventZen}")
        private String senderName;

        private final WebClient webClient = WebClient.builder()
                        .baseUrl("https://api.brevo.com/v3/smtp/email")
                        .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .build();

        public Map<String, Object> send(NotificationRequest request) {
                System.out.println("SERVICE HIT");
                System.out.println("API KEY PRESENT = " + (apiKey != null && !apiKey.isBlank()));
                System.out.println("SENDER EMAIL = " + senderEmail);
                System.out.println("RECIPIENT = " + request.getEmail());
                System.out.println("EMAIL TYPE = " + request.getType());

                String subject = templateService.buildSubject(request.getType(), request.getData());
                String body = templateService.buildBody(request.getType(), request.getData());

                Map<String, Object> payload = Map.of(
                                "sender", Map.of(
                                                "name", senderName,
                                                "email", senderEmail),
                                "to", List.of(
                                                Map.of("email", request.getEmail())),
                                "subject", subject,
                                "htmlContent", body);

                try {
                        String response = webClient.post()
                                        .header("api-key", apiKey.trim())
                                        .bodyValue(payload)
                                        .retrieve()
                                        .bodyToMono(String.class)
                                        .block();

                        System.out.println("BREVO SUCCESS");
                        return Map.of(
                                        "status", "SUCCESS",
                                        "response", response == null ? "" : response);
                } catch (Exception e) {
                        System.out.println("BREVO FAILED");
                        e.printStackTrace();

                        return Map.of(
                                        "status", "FAILED",
                                        "error", e.getMessage());
                }
        }
}