package ru.asu.vda.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.asu.vda.service.dto.Dialog;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/bot")
public class BotController {

    @PostMapping("")
    public ResponseEntity<Dialog> ask(@Valid @RequestBody Dialog message) {
/*        if (message.getMessage() == null || message.getMessage().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }*/

        Dialog dialog = new Dialog(message.getMessage());
        return ResponseEntity.ok(dialog);
    }
}
