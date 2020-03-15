package ru.asu.vda.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Dialog {

    @JsonProperty(value = "message")
    private String answer;

    public Dialog(String answer) {
        this.answer = answer;
    }

    public String getAnswer() {
        return answer;
    }

    public Dialog setAnswer(String answer) {
        this.answer = answer;
        return this;
    }
}
