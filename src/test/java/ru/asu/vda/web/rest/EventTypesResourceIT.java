package ru.asu.vda.web.rest;

import ru.asu.vda.VirtualDigitalAssistantApp;
import ru.asu.vda.domain.EventTypes;
import ru.asu.vda.repository.EventTypesRepository;
import ru.asu.vda.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static ru.asu.vda.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EventTypesResource} REST controller.
 */
@SpringBootTest(classes = VirtualDigitalAssistantApp.class)
public class EventTypesResourceIT {

    private static final String DEFAULT_NAME_EVENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_NAME_EVENT_TYPE = "BBBBBBBBBB";

    @Autowired
    private EventTypesRepository eventTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restEventTypesMockMvc;

    private EventTypes eventTypes;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventTypesResource eventTypesResource = new EventTypesResource(eventTypesRepository);
        this.restEventTypesMockMvc = MockMvcBuilders.standaloneSetup(eventTypesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EventTypes createEntity(EntityManager em) {
        EventTypes eventTypes = new EventTypes()
            .nameEventType(DEFAULT_NAME_EVENT_TYPE);
        return eventTypes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EventTypes createUpdatedEntity(EntityManager em) {
        EventTypes eventTypes = new EventTypes()
            .nameEventType(UPDATED_NAME_EVENT_TYPE);
        return eventTypes;
    }

    @BeforeEach
    public void initTest() {
        eventTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createEventTypes() throws Exception {
        int databaseSizeBeforeCreate = eventTypesRepository.findAll().size();

        // Create the EventTypes
        restEventTypesMockMvc.perform(post("/api/event-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventTypes)))
            .andExpect(status().isCreated());

        // Validate the EventTypes in the database
        List<EventTypes> eventTypesList = eventTypesRepository.findAll();
        assertThat(eventTypesList).hasSize(databaseSizeBeforeCreate + 1);
        EventTypes testEventTypes = eventTypesList.get(eventTypesList.size() - 1);
        assertThat(testEventTypes.getNameEventType()).isEqualTo(DEFAULT_NAME_EVENT_TYPE);
    }

    @Test
    @Transactional
    public void createEventTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventTypesRepository.findAll().size();

        // Create the EventTypes with an existing ID
        eventTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventTypesMockMvc.perform(post("/api/event-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventTypes)))
            .andExpect(status().isBadRequest());

        // Validate the EventTypes in the database
        List<EventTypes> eventTypesList = eventTypesRepository.findAll();
        assertThat(eventTypesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEventTypes() throws Exception {
        // Initialize the database
        eventTypesRepository.saveAndFlush(eventTypes);

        // Get all the eventTypesList
        restEventTypesMockMvc.perform(get("/api/event-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventTypes.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameEventType").value(hasItem(DEFAULT_NAME_EVENT_TYPE)));
    }
    
    @Test
    @Transactional
    public void getEventTypes() throws Exception {
        // Initialize the database
        eventTypesRepository.saveAndFlush(eventTypes);

        // Get the eventTypes
        restEventTypesMockMvc.perform(get("/api/event-types/{id}", eventTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eventTypes.getId().intValue()))
            .andExpect(jsonPath("$.nameEventType").value(DEFAULT_NAME_EVENT_TYPE));
    }

    @Test
    @Transactional
    public void getNonExistingEventTypes() throws Exception {
        // Get the eventTypes
        restEventTypesMockMvc.perform(get("/api/event-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEventTypes() throws Exception {
        // Initialize the database
        eventTypesRepository.saveAndFlush(eventTypes);

        int databaseSizeBeforeUpdate = eventTypesRepository.findAll().size();

        // Update the eventTypes
        EventTypes updatedEventTypes = eventTypesRepository.findById(eventTypes.getId()).get();
        // Disconnect from session so that the updates on updatedEventTypes are not directly saved in db
        em.detach(updatedEventTypes);
        updatedEventTypes
            .nameEventType(UPDATED_NAME_EVENT_TYPE);

        restEventTypesMockMvc.perform(put("/api/event-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEventTypes)))
            .andExpect(status().isOk());

        // Validate the EventTypes in the database
        List<EventTypes> eventTypesList = eventTypesRepository.findAll();
        assertThat(eventTypesList).hasSize(databaseSizeBeforeUpdate);
        EventTypes testEventTypes = eventTypesList.get(eventTypesList.size() - 1);
        assertThat(testEventTypes.getNameEventType()).isEqualTo(UPDATED_NAME_EVENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingEventTypes() throws Exception {
        int databaseSizeBeforeUpdate = eventTypesRepository.findAll().size();

        // Create the EventTypes

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventTypesMockMvc.perform(put("/api/event-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventTypes)))
            .andExpect(status().isBadRequest());

        // Validate the EventTypes in the database
        List<EventTypes> eventTypesList = eventTypesRepository.findAll();
        assertThat(eventTypesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEventTypes() throws Exception {
        // Initialize the database
        eventTypesRepository.saveAndFlush(eventTypes);

        int databaseSizeBeforeDelete = eventTypesRepository.findAll().size();

        // Delete the eventTypes
        restEventTypesMockMvc.perform(delete("/api/event-types/{id}", eventTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EventTypes> eventTypesList = eventTypesRepository.findAll();
        assertThat(eventTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
