package ru.asu.vda.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ru.asu.vda.VirtualDigitalAssistantApp;
import ru.asu.vda.service.dto.Dialog;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(classes = VirtualDigitalAssistantApp.class)
public class BotControllerTest {

    @Autowired
    private BotController botController;

    @Test
    public void stubBotTest() {
        ResponseEntity<Dialog> responseEntity = botController.ask(new Dialog("Hi"));
        assertThat(responseEntity.getStatusCode()).isEqualByComparingTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isNotNull();
        assertThat(responseEntity.getBody().getMessage()).isNotEmpty();
        assertThat(responseEntity.getBody().getMessage()).isEqualTo("Hi");
    }
}
