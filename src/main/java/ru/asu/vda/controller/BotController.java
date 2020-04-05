package ru.asu.vda.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.asu.vda.service.dto.Dialog;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/bot")
public class BotController {

    @PostMapping("")
    public ResponseEntity<Dialog> ask(@RequestBody Dialog message) {
        if (message.getMessage() == null || message.getMessage().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<String> answers = Arrays.asList("Да свершится предначертанное", "Лок тар огар", "Опять работать?", "Нужно больше золота", "Склоняюсь перед вашей волей");

        Dialog dialog = new Dialog(answers.get((int) (Math.random() * answers.size())));
        return ResponseEntity.ok(dialog);
    }
}
