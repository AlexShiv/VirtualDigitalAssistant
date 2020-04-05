package ru.asu.vda.service.dto;

public class Dialog {

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
