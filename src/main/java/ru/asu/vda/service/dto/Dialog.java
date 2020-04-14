package ru.asu.vda.service.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class Dialog {

    @NotNull(message = "error.notNull")
    @NotEmpty(message = "error.notEmpty")
    private String message;

    public Dialog() {
    }

    public Dialog(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
