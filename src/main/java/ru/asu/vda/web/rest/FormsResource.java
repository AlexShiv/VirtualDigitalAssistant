package ru.asu.vda.web.rest;

import ru.asu.vda.domain.Forms;
import ru.asu.vda.repository.FormsRepository;
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
 * REST controller for managing {@link ru.asu.vda.domain.Forms}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FormsResource {

    private final Logger log = LoggerFactory.getLogger(FormsResource.class);

    private static final String ENTITY_NAME = "forms";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FormsRepository formsRepository;

    public FormsResource(FormsRepository formsRepository) {
        this.formsRepository = formsRepository;
    }

    /**
     * {@code POST  /forms} : Create a new forms.
     *
     * @param forms the forms to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new forms, or with status {@code 400 (Bad Request)} if the forms has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/forms")
    public ResponseEntity<Forms> createForms(@RequestBody Forms forms) throws URISyntaxException {
        log.debug("REST request to save Forms : {}", forms);
        if (forms.getId() != null) {
            throw new BadRequestAlertException("A new forms cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Forms result = formsRepository.save(forms);
        return ResponseEntity.created(new URI("/api/forms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /forms} : Updates an existing forms.
     *
     * @param forms the forms to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated forms,
     * or with status {@code 400 (Bad Request)} if the forms is not valid,
     * or with status {@code 500 (Internal Server Error)} if the forms couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/forms")
    public ResponseEntity<Forms> updateForms(@RequestBody Forms forms) throws URISyntaxException {
        log.debug("REST request to update Forms : {}", forms);
        if (forms.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Forms result = formsRepository.save(forms);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, forms.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /forms} : get all the forms.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of forms in body.
     */
    @GetMapping("/forms")
    public List<Forms> getAllForms() {
        log.debug("REST request to get all Forms");
        return formsRepository.findAll();
    }

    /**
     * {@code GET  /forms/:id} : get the "id" forms.
     *
     * @param id the id of the forms to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the forms, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/forms/{id}")
    public ResponseEntity<Forms> getForms(@PathVariable Long id) {
        log.debug("REST request to get Forms : {}", id);
        Optional<Forms> forms = formsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(forms);
    }

    /**
     * {@code DELETE  /forms/:id} : delete the "id" forms.
     *
     * @param id the id of the forms to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/forms/{id}")
    public ResponseEntity<Void> deleteForms(@PathVariable Long id) {
        log.debug("REST request to delete Forms : {}", id);
        formsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
