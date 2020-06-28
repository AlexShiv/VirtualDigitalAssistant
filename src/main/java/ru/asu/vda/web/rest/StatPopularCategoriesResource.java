package ru.asu.vda.web.rest;

import ru.asu.vda.domain.StatPopularCategories;
import ru.asu.vda.repository.StatPopularCategoriesRepository;
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
 * REST controller for managing {@link ru.asu.vda.domain.StatPopularCategories}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StatPopularCategoriesResource {

    private final Logger log = LoggerFactory.getLogger(StatPopularCategoriesResource.class);

    private static final String ENTITY_NAME = "statPopularCategories";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StatPopularCategoriesRepository statPopularCategoriesRepository;

    public StatPopularCategoriesResource(StatPopularCategoriesRepository statPopularCategoriesRepository) {
        this.statPopularCategoriesRepository = statPopularCategoriesRepository;
    }

    /**
     * {@code POST  /stat-popular-categories} : Create a new statPopularCategories.
     *
     * @param statPopularCategories the statPopularCategories to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new statPopularCategories, or with status {@code 400 (Bad Request)} if the statPopularCategories has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stat-popular-categories")
    public ResponseEntity<StatPopularCategories> createStatPopularCategories(@RequestBody StatPopularCategories statPopularCategories) throws URISyntaxException {
        log.debug("REST request to save StatPopularCategories : {}", statPopularCategories);
        if (statPopularCategories.getId() != null) {
            throw new BadRequestAlertException("A new statPopularCategories cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StatPopularCategories result = statPopularCategoriesRepository.save(statPopularCategories);
        return ResponseEntity.created(new URI("/api/stat-popular-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stat-popular-categories} : Updates an existing statPopularCategories.
     *
     * @param statPopularCategories the statPopularCategories to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated statPopularCategories,
     * or with status {@code 400 (Bad Request)} if the statPopularCategories is not valid,
     * or with status {@code 500 (Internal Server Error)} if the statPopularCategories couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stat-popular-categories")
    public ResponseEntity<StatPopularCategories> updateStatPopularCategories(@RequestBody StatPopularCategories statPopularCategories) throws URISyntaxException {
        log.debug("REST request to update StatPopularCategories : {}", statPopularCategories);
        if (statPopularCategories.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StatPopularCategories result = statPopularCategoriesRepository.save(statPopularCategories);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, statPopularCategories.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /stat-popular-categories} : get all the statPopularCategories.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of statPopularCategories in body.
     */
    @GetMapping("/stat-popular-categories")
    public List<StatPopularCategories> getAllStatPopularCategories() {
        log.debug("REST request to get all StatPopularCategories");
        return statPopularCategoriesRepository.findAll();
    }

    /**
     * {@code GET  /stat-popular-categories/:id} : get the "id" statPopularCategories.
     *
     * @param id the id of the statPopularCategories to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the statPopularCategories, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stat-popular-categories/{id}")
    public ResponseEntity<StatPopularCategories> getStatPopularCategories(@PathVariable Long id) {
        log.debug("REST request to get StatPopularCategories : {}", id);
        Optional<StatPopularCategories> statPopularCategories = statPopularCategoriesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(statPopularCategories);
    }

    /**
     * {@code DELETE  /stat-popular-categories/:id} : delete the "id" statPopularCategories.
     *
     * @param id the id of the statPopularCategories to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stat-popular-categories/{id}")
    public ResponseEntity<Void> deleteStatPopularCategories(@PathVariable Long id) {
        log.debug("REST request to delete StatPopularCategories : {}", id);
        statPopularCategoriesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
