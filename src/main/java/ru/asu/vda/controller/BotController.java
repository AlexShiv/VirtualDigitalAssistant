package ru.asu.vda.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.asu.vda.service.dto.Dialog;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

import static java.lang.Math.random;

@RestController
@RequestMapping("/api/bot")
public class BotController {

    @PostMapping("")
    public ResponseEntity<Dialog> ask(@Valid @RequestBody Dialog message) {
        Dialog dialog;
        switch (message.getMessage().toLowerCase()){
            case "привет":
                dialog = new Dialog("привет, мой друг");
                break;
            case "как дела":
                dialog = new Dialog("все класс, как у тебя?");
                break;
            default:
                List<String> answers = Arrays.asList("Да свершится предначертанное", "Лок тар огар", "Опять работать?", "Нужно больше золота", "Склоняюсь перед вашей волей");
                dialog = new Dialog(answers.get((int) (random() * answers.size())));
        }
        return ResponseEntity.ok(dialog);
    }
}
