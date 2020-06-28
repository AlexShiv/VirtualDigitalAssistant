package ru.asu.vda.web.rest;

import ru.asu.vda.VirtualDigitalAssistantApp;
import ru.asu.vda.domain.Forms;
import ru.asu.vda.repository.ClientsRepository;
import ru.asu.vda.repository.EventsRepository;
import ru.asu.vda.repository.FormsRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static ru.asu.vda.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FormsResource} REST controller.
 */
@SpringBootTest(classes = VirtualDigitalAssistantApp.class)
public class FormsResourceIT {

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private FormsRepository formsRepository;
    @Autowired
    private ClientsRepository clientsRepository;
    @Autowired
    private EventsRepository eventsRepository;

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

    private MockMvc restFormsMockMvc;

    private Forms forms;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormsResource formsResource = new FormsResource(formsRepository, clientsRepository, eventsRepository);
        this.restFormsMockMvc = MockMvcBuilders.standaloneSetup(formsResource)
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
    public static Forms createEntity(EntityManager em) {
        Forms forms = new Forms()
            .createDate(DEFAULT_CREATE_DATE);
        return forms;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Forms createUpdatedEntity(EntityManager em) {
        Forms forms = new Forms()
            .createDate(UPDATED_CREATE_DATE);
        return forms;
    }

    @BeforeEach
    public void initTest() {
        forms = createEntity(em);
    }

    @Test
    @Transactional
    public void createForms() throws Exception {
        int databaseSizeBeforeCreate = formsRepository.findAll().size();

        // Create the Forms
        restFormsMockMvc.perform(post("/api/forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forms)))
            .andExpect(status().isCreated());

        // Validate the Forms in the database
        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeCreate + 1);
        Forms testForms = formsList.get(formsList.size() - 1);
        assertThat(testForms.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
    }

    @Test
    @Transactional
    public void createFormsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formsRepository.findAll().size();

        // Create the Forms with an existing ID
        forms.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormsMockMvc.perform(post("/api/forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forms)))
            .andExpect(status().isBadRequest());

        // Validate the Forms in the database
        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllForms() throws Exception {
        // Initialize the database
        formsRepository.saveAndFlush(forms);

        // Get all the formsList
        restFormsMockMvc.perform(get("/api/forms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(forms.getId().intValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())));
    }

    @Test
    @Transactional
    public void getForms() throws Exception {
        // Initialize the database
        formsRepository.saveAndFlush(forms);

        // Get the forms
        restFormsMockMvc.perform(get("/api/forms/{id}", forms.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(forms.getId().intValue()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingForms() throws Exception {
        // Get the forms
        restFormsMockMvc.perform(get("/api/forms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateForms() throws Exception {
        // Initialize the database
        formsRepository.saveAndFlush(forms);

        int databaseSizeBeforeUpdate = formsRepository.findAll().size();

        // Update the forms
        Forms updatedForms = formsRepository.findById(forms.getId()).get();
        // Disconnect from session so that the updates on updatedForms are not directly saved in db
        em.detach(updatedForms);
        updatedForms
            .createDate(UPDATED_CREATE_DATE);

        restFormsMockMvc.perform(put("/api/forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedForms)))
            .andExpect(status().isOk());

        // Validate the Forms in the database
        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeUpdate);
        Forms testForms = formsList.get(formsList.size() - 1);
        assertThat(testForms.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingForms() throws Exception {
        int databaseSizeBeforeUpdate = formsRepository.findAll().size();

        // Create the Forms

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormsMockMvc.perform(put("/api/forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forms)))
            .andExpect(status().isBadRequest());

        // Validate the Forms in the database
        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteForms() throws Exception {
        // Initialize the database
        formsRepository.saveAndFlush(forms);

        int databaseSizeBeforeDelete = formsRepository.findAll().size();

        // Delete the forms
        restFormsMockMvc.perform(delete("/api/forms/{id}", forms.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
