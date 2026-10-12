package com.bank.controller;

import org.springframework.web.bind.annotation.*;

import com.bank.dto.ChatRequest;
import com.bank.dto.ChatResponse;
import com.bank.service.GeminiService;

@RestController
@RequestMapping("/api/chat")
//@RequestMapping("/chat")
//@CrossOrigin(origins = "*")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String reply =
                geminiService.askGemini(request.getMessage());

        return new ChatResponse(reply);

    }

}