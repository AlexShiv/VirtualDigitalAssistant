package ru.asu.vda.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.asu.vda.domain.StatCorrectAnswers;
import ru.asu.vda.repository.StatCorrectAnswersRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/stat")
public class StatisticsController {
    private final StatCorrectAnswersRepository correctAnswersRepository;

    public StatisticsController(StatCorrectAnswersRepository correctAnswersRepository) {
        this.correctAnswersRepository = correctAnswersRepository;
    }

    @GetMapping("/answers")
    public ResponseEntity<HttpStatus> statCorrectAnswer(@RequestParam boolean value) {
        StatCorrectAnswers statCorrectAnswers;
        Optional<StatCorrectAnswers> res;
        if (value) {
            res = correctAnswersRepository.findByNameCriteria("good");
            statCorrectAnswers = res.orElseGet(() -> correctAnswersRepository.save(new StatCorrectAnswers().nameCriteria("good").countResult(0L)));
        } else {
            res = correctAnswersRepository.findByNameCriteria("bad");
            statCorrectAnswers = res.orElseGet(() -> correctAnswersRepository.save(new StatCorrectAnswers().nameCriteria("bad").countResult(0L)));
        }
        statCorrectAnswers.setCountResult(statCorrectAnswers.getCountResult() + 1);
        correctAnswersRepository.save(statCorrectAnswers);
        return ResponseEntity.ok().build();
    }
}
