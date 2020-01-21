package ru.asu.vda.web.rest;

import ru.asu.vda.VirtualDigitalAssistantApp;
import ru.asu.vda.domain.Teachers;
import ru.asu.vda.repository.TeachersRepository;
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
 * Integration tests for the {@link TeachersResource} REST controller.
 */
@SpringBootTest(classes = VirtualDigitalAssistantApp.class)
public class TeachersResourceIT {

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PATRONYMIC = "AAAAAAAAAA";
    private static final String UPDATED_PATRONYMIC = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_DECAN = false;
    private static final Boolean UPDATED_IS_DECAN = true;

    @Autowired
    private TeachersRepository teachersRepository;

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

    private MockMvc restTeachersMockMvc;

    private Teachers teachers;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeachersResource teachersResource = new TeachersResource(teachersRepository);
        this.restTeachersMockMvc = MockMvcBuilders.standaloneSetup(teachersResource)
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
    public static Teachers createEntity(EntityManager em) {
        Teachers teachers = new Teachers()
            .surname(DEFAULT_SURNAME)
            .name(DEFAULT_NAME)
            .patronymic(DEFAULT_PATRONYMIC)
            .isDecan(DEFAULT_IS_DECAN);
        return teachers;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Teachers createUpdatedEntity(EntityManager em) {
        Teachers teachers = new Teachers()
            .surname(UPDATED_SURNAME)
            .name(UPDATED_NAME)
            .patronymic(UPDATED_PATRONYMIC)
            .isDecan(UPDATED_IS_DECAN);
        return teachers;
    }

    @BeforeEach
    public void initTest() {
        teachers = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeachers() throws Exception {
        int databaseSizeBeforeCreate = teachersRepository.findAll().size();

        // Create the Teachers
        restTeachersMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachers)))
            .andExpect(status().isCreated());

        // Validate the Teachers in the database
        List<Teachers> teachersList = teachersRepository.findAll();
        assertThat(teachersList).hasSize(databaseSizeBeforeCreate + 1);
        Teachers testTeachers = teachersList.get(teachersList.size() - 1);
        assertThat(testTeachers.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testTeachers.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTeachers.getPatronymic()).isEqualTo(DEFAULT_PATRONYMIC);
        assertThat(testTeachers.isIsDecan()).isEqualTo(DEFAULT_IS_DECAN);
    }

    @Test
    @Transactional
    public void createTeachersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teachersRepository.findAll().size();

        // Create the Teachers with an existing ID
        teachers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeachersMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachers)))
            .andExpect(status().isBadRequest());

        // Validate the Teachers in the database
        List<Teachers> teachersList = teachersRepository.findAll();
        assertThat(teachersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTeachers() throws Exception {
        // Initialize the database
        teachersRepository.saveAndFlush(teachers);

        // Get all the teachersList
        restTeachersMockMvc.perform(get("/api/teachers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teachers.getId().intValue())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].patronymic").value(hasItem(DEFAULT_PATRONYMIC)))
            .andExpect(jsonPath("$.[*].isDecan").value(hasItem(DEFAULT_IS_DECAN.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getTeachers() throws Exception {
        // Initialize the database
        teachersRepository.saveAndFlush(teachers);

        // Get the teachers
        restTeachersMockMvc.perform(get("/api/teachers/{id}", teachers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teachers.getId().intValue()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.patronymic").value(DEFAULT_PATRONYMIC))
            .andExpect(jsonPath("$.isDecan").value(DEFAULT_IS_DECAN.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTeachers() throws Exception {
        // Get the teachers
        restTeachersMockMvc.perform(get("/api/teachers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeachers() throws Exception {
        // Initialize the database
        teachersRepository.saveAndFlush(teachers);

        int databaseSizeBeforeUpdate = teachersRepository.findAll().size();

        // Update the teachers
        Teachers updatedTeachers = teachersRepository.findById(teachers.getId()).get();
        // Disconnect from session so that the updates on updatedTeachers are not directly saved in db
        em.detach(updatedTeachers);
        updatedTeachers
            .surname(UPDATED_SURNAME)
            .name(UPDATED_NAME)
            .patronymic(UPDATED_PATRONYMIC)
            .isDecan(UPDATED_IS_DECAN);

        restTeachersMockMvc.perform(put("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeachers)))
            .andExpect(status().isOk());

        // Validate the Teachers in the database
        List<Teachers> teachersList = teachersRepository.findAll();
        assertThat(teachersList).hasSize(databaseSizeBeforeUpdate);
        Teachers testTeachers = teachersList.get(teachersList.size() - 1);
        assertThat(testTeachers.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testTeachers.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTeachers.getPatronymic()).isEqualTo(UPDATED_PATRONYMIC);
        assertThat(testTeachers.isIsDecan()).isEqualTo(UPDATED_IS_DECAN);
    }

    @Test
    @Transactional
    public void updateNonExistingTeachers() throws Exception {
        int databaseSizeBeforeUpdate = teachersRepository.findAll().size();

        // Create the Teachers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTeachersMockMvc.perform(put("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachers)))
            .andExpect(status().isBadRequest());

        // Validate the Teachers in the database
        List<Teachers> teachersList = teachersRepository.findAll();
        assertThat(teachersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTeachers() throws Exception {
        // Initialize the database
        teachersRepository.saveAndFlush(teachers);

        int databaseSizeBeforeDelete = teachersRepository.findAll().size();

        // Delete the teachers
        restTeachersMockMvc.perform(delete("/api/teachers/{id}", teachers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Teachers> teachersList = teachersRepository.findAll();
        assertThat(teachersList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
