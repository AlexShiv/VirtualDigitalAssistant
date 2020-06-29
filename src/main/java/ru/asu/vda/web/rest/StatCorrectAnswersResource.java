package ru.asu.vda.web.rest;

import ru.asu.vda.domain.StatCorrectAnswers;
import ru.asu.vda.repository.StatCorrectAnswersRepository;
import ru.asu.vda.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ru.asu.vda.domain.StatCorrectAnswers}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StatCorrectAnswersResource {

    private final Logger log = LoggerFactory.getLogger(StatCorrectAnswersResource.class);

    private static final String ENTITY_NAME = "statCorrectAnswers";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StatCorrectAnswersRepository statCorrectAnswersRepository;

    public StatCorrectAnswersResource(StatCorrectAnswersRepository statCorrectAnswersRepository) {
        this.statCorrectAnswersRepository = statCorrectAnswersRepository;
    }

    /**
     * {@code POST  /stat-correct-answers} : Create a new statCorrectAnswers.
     *
     * @param statCorrectAnswers the statCorrectAnswers to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new statCorrectAnswers, or with status {@code 400 (Bad Request)} if the statCorrectAnswers has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stat-correct-answers")
    public ResponseEntity<StatCorrectAnswers> createStatCorrectAnswers(@RequestBody StatCorrectAnswers statCorrectAnswers) throws URISyntaxException {
        log.debug("REST request to save StatCorrectAnswers : {}", statCorrectAnswers);
        if (statCorrectAnswers.getId() != null) {
            throw new BadRequestAlertException("A new statCorrectAnswers cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StatCorrectAnswers result = statCorrectAnswersRepository.save(statCorrectAnswers);
        return ResponseEntity.created(new URI("/api/stat-correct-answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stat-correct-answers} : Updates an existing statCorrectAnswers.
     *
     * @param statCorrectAnswers the statCorrectAnswers to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated statCorrectAnswers,
     * or with status {@code 400 (Bad Request)} if the statCorrectAnswers is not valid,
     * or with status {@code 500 (Internal Server Error)} if the statCorrectAnswers couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stat-correct-answers")
    public ResponseEntity<StatCorrectAnswers> updateStatCorrectAnswers(@RequestBody StatCorrectAnswers statCorrectAnswers) throws URISyntaxException {
        log.debug("REST request to update StatCorrectAnswers : {}", statCorrectAnswers);
        if (statCorrectAnswers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StatCorrectAnswers result = statCorrectAnswersRepository.save(statCorrectAnswers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, statCorrectAnswers.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /stat-correct-answers} : get all the statCorrectAnswers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of statCorrectAnswers in body.
     */
    @GetMapping("/stat-correct-answers")
    public List<StatCorrectAnswers> getAllStatCorrectAnswers() {
        log.debug("REST request to get all StatCorrectAnswers");
        return statCorrectAnswersRepository.findAll();
    }

    /**
     * {@code GET  /stat-correct-answers/:id} : get the "id" statCorrectAnswers.
     *
     * @param id the id of the statCorrectAnswers to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the statCorrectAnswers, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stat-correct-answers/{id}")
    public ResponseEntity<StatCorrectAnswers> getStatCorrectAnswers(@PathVariable Long id) {
        log.debug("REST request to get StatCorrectAnswers : {}", id);
        Optional<StatCorrectAnswers> statCorrectAnswers = statCorrectAnswersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(statCorrectAnswers);
    }

    /**
     * {@code DELETE  /stat-correct-answers/:id} : delete the "id" statCorrectAnswers.
     *
     * @param id the id of the statCorrectAnswers to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stat-correct-answers/{id}")
    public ResponseEntity<Void> deleteStatCorrectAnswers(@PathVariable Long id) {
        log.debug("REST request to delete StatCorrectAnswers : {}", id);
        statCorrectAnswersRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
