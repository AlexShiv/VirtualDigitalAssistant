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
        Dialog dialog = new Dialog("");
        String mes = message.getMessage().toLowerCase();
        if (mes.contains("прив") || mes.contains("здравс")) {
            dialog = new Dialog("привет, мой друг");
        } else if (mes.contains("как дела")) {
            dialog = new Dialog("все класс, как у тебя?");
        } else if (mes.contains("распис")){
            dialog = new Dialog("Расписание вы можете посмотреть -> http://raspisanie.asu.edu.ru/student");
//            List<String> answers = Arrays.asList("Да свершится предначертанное", "Лок тар огар", "Опять работать?", "Нужно больше золота", "Склоняюсь перед вашей волей");
//            dialog = new Dialog(answers.get((int) (random() * answers.size())));
        } else if (mes.contains("сети")) {
            dialog = new Dialog("Социальные сети: vk - https://vk.com/asu_edu_ru , instagram - https://www.instagram.com/agu_astrakhan30/ , facebook - https://www.facebook.com/asu30/ , одноклассники - https://ok.ru/asu.edu30?st._aid=ExternalGroupWidget_OpenGroup");
        } else if (mes.contains("контакт")) {
            dialog = new Dialog("Контактная информация: ЮРИДИЧЕСКИЙ АДРЕС: 414056, Россия, г. Астрахань, ул. Татищева, 20а, Астраханский государственный университет. Телефоны: 8 (8512) 24-64-00. Факс: 8 (8512) 24-68-64. E-mail: asu@asu.edu.ru. Приёмная комиссия: Телефоны: 8 (8512) 24-64-07, 8 (8512) 24-64-08, 8 (8512) 24-64-09. E-mail: metodika@asu.edu.ru. Более подробно –> http://asu.edu.ru/universitet/5-kontaktnaia-informaciia.html");
        } else {
            dialog = new Dialog("пожалуйста, переформулируйте вопрос");
        }
        return ResponseEntity.ok(dialog);
    }
}
