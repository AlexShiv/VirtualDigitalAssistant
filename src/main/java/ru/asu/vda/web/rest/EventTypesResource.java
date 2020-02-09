package ru.asu.vda.web.rest;

import ru.asu.vda.domain.EventTypes;
import ru.asu.vda.repository.EventTypesRepository;
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
 * REST controller for managing {@link ru.asu.vda.domain.EventTypes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EventTypesResource {

    private final Logger log = LoggerFactory.getLogger(EventTypesResource.class);

    private static final String ENTITY_NAME = "eventTypes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EventTypesRepository eventTypesRepository;

    public EventTypesResource(EventTypesRepository eventTypesRepository) {
        this.eventTypesRepository = eventTypesRepository;
    }

    /**
     * {@code POST  /event-types} : Create a new eventTypes.
     *
     * @param eventTypes the eventTypes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new eventTypes, or with status {@code 400 (Bad Request)} if the eventTypes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/event-types")
    public ResponseEntity<EventTypes> createEventTypes(@RequestBody EventTypes eventTypes) throws URISyntaxException {
        log.debug("REST request to save EventTypes : {}", eventTypes);
        if (eventTypes.getId() != null) {
            throw new BadRequestAlertException("A new eventTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventTypes result = eventTypesRepository.save(eventTypes);
        return ResponseEntity.created(new URI("/api/event-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /event-types} : Updates an existing eventTypes.
     *
     * @param eventTypes the eventTypes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eventTypes,
     * or with status {@code 400 (Bad Request)} if the eventTypes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the eventTypes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/event-types")
    public ResponseEntity<EventTypes> updateEventTypes(@RequestBody EventTypes eventTypes) throws URISyntaxException {
        log.debug("REST request to update EventTypes : {}", eventTypes);
        if (eventTypes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EventTypes result = eventTypesRepository.save(eventTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, eventTypes.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /event-types} : get all the eventTypes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of eventTypes in body.
     */
    @GetMapping("/event-types")
    public List<EventTypes> getAllEventTypes() {
        log.debug("REST request to get all EventTypes");
        return eventTypesRepository.findAll();
    }

    /**
     * {@code GET  /event-types/:id} : get the "id" eventTypes.
     *
     * @param id the id of the eventTypes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the eventTypes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/event-types/{id}")
    public ResponseEntity<EventTypes> getEventTypes(@PathVariable Long id) {
        log.debug("REST request to get EventTypes : {}", id);
        Optional<EventTypes> eventTypes = eventTypesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eventTypes);
    }

    /**
     * {@code DELETE  /event-types/:id} : delete the "id" eventTypes.
     *
     * @param id the id of the eventTypes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/event-types/{id}")
    public ResponseEntity<Void> deleteEventTypes(@PathVariable Long id) {
        log.debug("REST request to delete EventTypes : {}", id);
        eventTypesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
