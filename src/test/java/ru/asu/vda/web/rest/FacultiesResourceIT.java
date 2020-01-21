package ru.asu.vda.web.rest;

import ru.asu.vda.VirtualDigitalAssistantApp;
import ru.asu.vda.domain.Faculties;
import ru.asu.vda.repository.FacultiesRepository;
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
 * Integration tests for the {@link FacultiesResource} REST controller.
 */
@SpringBootTest(classes = VirtualDigitalAssistantApp.class)
public class FacultiesResourceIT {

    private static final String DEFAULT_NAME_FACULTY = "AAAAAAAAAA";
    private static final String UPDATED_NAME_FACULTY = "BBBBBBBBBB";

    @Autowired
    private FacultiesRepository facultiesRepository;

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

    private MockMvc restFacultiesMockMvc;

    private Faculties faculties;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FacultiesResource facultiesResource = new FacultiesResource(facultiesRepository);
        this.restFacultiesMockMvc = MockMvcBuilders.standaloneSetup(facultiesResource)
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
    public static Faculties createEntity(EntityManager em) {
        Faculties faculties = new Faculties()
            .nameFaculty(DEFAULT_NAME_FACULTY);
        return faculties;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Faculties createUpdatedEntity(EntityManager em) {
        Faculties faculties = new Faculties()
            .nameFaculty(UPDATED_NAME_FACULTY);
        return faculties;
    }

    @BeforeEach
    public void initTest() {
        faculties = createEntity(em);
    }

    @Test
    @Transactional
    public void createFaculties() throws Exception {
        int databaseSizeBeforeCreate = facultiesRepository.findAll().size();

        // Create the Faculties
        restFacultiesMockMvc.perform(post("/api/faculties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faculties)))
            .andExpect(status().isCreated());

        // Validate the Faculties in the database
        List<Faculties> facultiesList = facultiesRepository.findAll();
        assertThat(facultiesList).hasSize(databaseSizeBeforeCreate + 1);
        Faculties testFaculties = facultiesList.get(facultiesList.size() - 1);
        assertThat(testFaculties.getNameFaculty()).isEqualTo(DEFAULT_NAME_FACULTY);
    }

    @Test
    @Transactional
    public void createFacultiesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facultiesRepository.findAll().size();

        // Create the Faculties with an existing ID
        faculties.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacultiesMockMvc.perform(post("/api/faculties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faculties)))
            .andExpect(status().isBadRequest());

        // Validate the Faculties in the database
        List<Faculties> facultiesList = facultiesRepository.findAll();
        assertThat(facultiesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFaculties() throws Exception {
        // Initialize the database
        facultiesRepository.saveAndFlush(faculties);

        // Get all the facultiesList
        restFacultiesMockMvc.perform(get("/api/faculties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(faculties.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameFaculty").value(hasItem(DEFAULT_NAME_FACULTY)));
    }
    
    @Test
    @Transactional
    public void getFaculties() throws Exception {
        // Initialize the database
        facultiesRepository.saveAndFlush(faculties);

        // Get the faculties
        restFacultiesMockMvc.perform(get("/api/faculties/{id}", faculties.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(faculties.getId().intValue()))
            .andExpect(jsonPath("$.nameFaculty").value(DEFAULT_NAME_FACULTY));
    }

    @Test
    @Transactional
    public void getNonExistingFaculties() throws Exception {
        // Get the faculties
        restFacultiesMockMvc.perform(get("/api/faculties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFaculties() throws Exception {
        // Initialize the database
        facultiesRepository.saveAndFlush(faculties);

        int databaseSizeBeforeUpdate = facultiesRepository.findAll().size();

        // Update the faculties
        Faculties updatedFaculties = facultiesRepository.findById(faculties.getId()).get();
        // Disconnect from session so that the updates on updatedFaculties are not directly saved in db
        em.detach(updatedFaculties);
        updatedFaculties
            .nameFaculty(UPDATED_NAME_FACULTY);

        restFacultiesMockMvc.perform(put("/api/faculties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFaculties)))
            .andExpect(status().isOk());

        // Validate the Faculties in the database
        List<Faculties> facultiesList = facultiesRepository.findAll();
        assertThat(facultiesList).hasSize(databaseSizeBeforeUpdate);
        Faculties testFaculties = facultiesList.get(facultiesList.size() - 1);
        assertThat(testFaculties.getNameFaculty()).isEqualTo(UPDATED_NAME_FACULTY);
    }

    @Test
    @Transactional
    public void updateNonExistingFaculties() throws Exception {
        int databaseSizeBeforeUpdate = facultiesRepository.findAll().size();

        // Create the Faculties

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacultiesMockMvc.perform(put("/api/faculties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faculties)))
            .andExpect(status().isBadRequest());

        // Validate the Faculties in the database
        List<Faculties> facultiesList = facultiesRepository.findAll();
        assertThat(facultiesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFaculties() throws Exception {
        // Initialize the database
        facultiesRepository.saveAndFlush(faculties);

        int databaseSizeBeforeDelete = facultiesRepository.findAll().size();

        // Delete the faculties
        restFacultiesMockMvc.perform(delete("/api/faculties/{id}", faculties.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Faculties> facultiesList = facultiesRepository.findAll();
        assertThat(facultiesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
