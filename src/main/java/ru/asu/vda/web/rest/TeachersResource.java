package ru.asu.vda.web.rest;

import ru.asu.vda.domain.Teachers;
import ru.asu.vda.repository.TeachersRepository;
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
 * REST controller for managing {@link ru.asu.vda.domain.Teachers}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TeachersResource {

    private final Logger log = LoggerFactory.getLogger(TeachersResource.class);

    private static final String ENTITY_NAME = "teachers";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TeachersRepository teachersRepository;

    public TeachersResource(TeachersRepository teachersRepository) {
        this.teachersRepository = teachersRepository;
    }

    /**
     * {@code POST  /teachers} : Create a new teachers.
     *
     * @param teachers the teachers to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new teachers, or with status {@code 400 (Bad Request)} if the teachers has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/teachers")
    public ResponseEntity<Teachers> createTeachers(@RequestBody Teachers teachers) throws URISyntaxException {
        log.debug("REST request to save Teachers : {}", teachers);
        if (teachers.getId() != null) {
            throw new BadRequestAlertException("A new teachers cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Teachers result = teachersRepository.save(teachers);
        return ResponseEntity.created(new URI("/api/teachers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /teachers} : Updates an existing teachers.
     *
     * @param teachers the teachers to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated teachers,
     * or with status {@code 400 (Bad Request)} if the teachers is not valid,
     * or with status {@code 500 (Internal Server Error)} if the teachers couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/teachers")
    public ResponseEntity<Teachers> updateTeachers(@RequestBody Teachers teachers) throws URISyntaxException {
        log.debug("REST request to update Teachers : {}", teachers);
        if (teachers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Teachers result = teachersRepository.save(teachers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, teachers.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /teachers} : get all the teachers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of teachers in body.
     */
    @GetMapping("/teachers")
    public List<Teachers> getAllTeachers() {
        log.debug("REST request to get all Teachers");
        return teachersRepository.findAll();
    }

    /**
     * {@code GET  /teachers/:id} : get the "id" teachers.
     *
     * @param id the id of the teachers to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the teachers, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/teachers/{id}")
    public ResponseEntity<Teachers> getTeachers(@PathVariable Long id) {
        log.debug("REST request to get Teachers : {}", id);
        Optional<Teachers> teachers = teachersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(teachers);
    }

    /**
     * {@code DELETE  /teachers/:id} : delete the "id" teachers.
     *
     * @param id the id of the teachers to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/teachers/{id}")
    public ResponseEntity<Void> deleteTeachers(@PathVariable Long id) {
        log.debug("REST request to delete Teachers : {}", id);
        teachersRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
