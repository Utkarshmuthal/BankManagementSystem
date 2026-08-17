package com.bank.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public GeminiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String askGemini(String message) {

        String prompt = """
                You are PrimeBank AI Assistant.

                Only answer questions related to banking.

                You can answer questions about:

                - Savings Account
                - Current Account
                - Fixed Deposit
                - Loans
                - Debit Card
                - Credit Card
                - Fund Transfer
                - UPI
                - Internet Banking
                - Mobile Banking
                - Customer Support
                - Banking Security

                If the user asks anything unrelated to banking,
                politely reply:

                "I can only assist with PrimeBank banking services."

                User Question:
                """ + message;

        String url =
        		"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key="
        		+ apiKey;

        Map<String, Object> body = Map.of(
                "contents",
                List.of(
                        Map.of(
                                "parts",
                                List.of(
                                        Map.of("text", prompt)))));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        try {

            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            request,
                            Map.class);

            Map candidate =
                    (Map) ((List) response.getBody().get("candidates")).get(0);

            Map content =
                    (Map) candidate.get("content");

            Map part =
                    (Map) ((List) content.get("parts")).get(0);

            return part.get("text").toString();

        } catch (org.springframework.web.client.HttpStatusCodeException e) {

            System.out.println("Status Code: " + e.getStatusCode());
            System.out.println("Response Body:");
            System.out.println(e.getResponseBodyAsString());

            return e.getResponseBodyAsString();

        } catch (Exception e) {

            e.printStackTrace();

            return e.getMessage();

        }

    }

}