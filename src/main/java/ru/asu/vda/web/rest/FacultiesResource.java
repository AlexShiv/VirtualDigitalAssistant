package ru.asu.vda.web.rest;

import ru.asu.vda.domain.Faculties;
import ru.asu.vda.repository.FacultiesRepository;
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
 * REST controller for managing {@link ru.asu.vda.domain.Faculties}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FacultiesResource {

    private final Logger log = LoggerFactory.getLogger(FacultiesResource.class);

    private static final String ENTITY_NAME = "faculties";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FacultiesRepository facultiesRepository;

    public FacultiesResource(FacultiesRepository facultiesRepository) {
        this.facultiesRepository = facultiesRepository;
    }

    /**
     * {@code POST  /faculties} : Create a new faculties.
     *
     * @param faculties the faculties to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new faculties, or with status {@code 400 (Bad Request)} if the faculties has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/faculties")
    public ResponseEntity<Faculties> createFaculties(@RequestBody Faculties faculties) throws URISyntaxException {
        log.debug("REST request to save Faculties : {}", faculties);
        if (faculties.getId() != null) {
            throw new BadRequestAlertException("A new faculties cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Faculties result = facultiesRepository.save(faculties);
        return ResponseEntity.created(new URI("/api/faculties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /faculties} : Updates an existing faculties.
     *
     * @param faculties the faculties to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated faculties,
     * or with status {@code 400 (Bad Request)} if the faculties is not valid,
     * or with status {@code 500 (Internal Server Error)} if the faculties couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/faculties")
    public ResponseEntity<Faculties> updateFaculties(@RequestBody Faculties faculties) throws URISyntaxException {
        log.debug("REST request to update Faculties : {}", faculties);
        if (faculties.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Faculties result = facultiesRepository.save(faculties);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, faculties.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /faculties} : get all the faculties.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of faculties in body.
     */
    @GetMapping("/faculties")
    public List<Faculties> getAllFaculties() {
        log.debug("REST request to get all Faculties");
        return facultiesRepository.findAll();
    }

    /**
     * {@code GET  /faculties/:id} : get the "id" faculties.
     *
     * @param id the id of the faculties to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the faculties, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/faculties/{id}")
    public ResponseEntity<Faculties> getFaculties(@PathVariable Long id) {
        log.debug("REST request to get Faculties : {}", id);
        Optional<Faculties> faculties = facultiesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(faculties);
    }

    /**
     * {@code DELETE  /faculties/:id} : delete the "id" faculties.
     *
     * @param id the id of the faculties to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/faculties/{id}")
    public ResponseEntity<Void> deleteFaculties(@PathVariable Long id) {
        log.debug("REST request to delete Faculties : {}", id);
        facultiesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
