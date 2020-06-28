package ru.asu.vda.web.rest;

import ru.asu.vda.VirtualDigitalAssistantApp;
import ru.asu.vda.domain.StatCorrectAnswers;
import ru.asu.vda.repository.StatCorrectAnswersRepository;
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
 * Integration tests for the {@link StatCorrectAnswersResource} REST controller.
 */
@SpringBootTest(classes = VirtualDigitalAssistantApp.class)
public class StatCorrectAnswersResourceIT {

    private static final String DEFAULT_NAME_CRITERIA = "AAAAAAAAAA";
    private static final String UPDATED_NAME_CRITERIA = "BBBBBBBBBB";

    private static final Long DEFAULT_COUNT_RESULT = 1L;
    private static final Long UPDATED_COUNT_RESULT = 2L;

    @Autowired
    private StatCorrectAnswersRepository statCorrectAnswersRepository;

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

    private MockMvc restStatCorrectAnswersMockMvc;

    private StatCorrectAnswers statCorrectAnswers;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StatCorrectAnswersResource statCorrectAnswersResource = new StatCorrectAnswersResource(statCorrectAnswersRepository);
        this.restStatCorrectAnswersMockMvc = MockMvcBuilders.standaloneSetup(statCorrectAnswersResource)
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
    public static StatCorrectAnswers createEntity(EntityManager em) {
        StatCorrectAnswers statCorrectAnswers = new StatCorrectAnswers()
            .nameCriteria(DEFAULT_NAME_CRITERIA)
            .countResult(DEFAULT_COUNT_RESULT);
        return statCorrectAnswers;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StatCorrectAnswers createUpdatedEntity(EntityManager em) {
        StatCorrectAnswers statCorrectAnswers = new StatCorrectAnswers()
            .nameCriteria(UPDATED_NAME_CRITERIA)
            .countResult(UPDATED_COUNT_RESULT);
        return statCorrectAnswers;
    }

    @BeforeEach
    public void initTest() {
        statCorrectAnswers = createEntity(em);
    }

    @Test
    @Transactional
    public void createStatCorrectAnswers() throws Exception {
        int databaseSizeBeforeCreate = statCorrectAnswersRepository.findAll().size();

        // Create the StatCorrectAnswers
        restStatCorrectAnswersMockMvc.perform(post("/api/stat-correct-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statCorrectAnswers)))
            .andExpect(status().isCreated());

        // Validate the StatCorrectAnswers in the database
        List<StatCorrectAnswers> statCorrectAnswersList = statCorrectAnswersRepository.findAll();
        assertThat(statCorrectAnswersList).hasSize(databaseSizeBeforeCreate + 1);
        StatCorrectAnswers testStatCorrectAnswers = statCorrectAnswersList.get(statCorrectAnswersList.size() - 1);
        assertThat(testStatCorrectAnswers.getNameCriteria()).isEqualTo(DEFAULT_NAME_CRITERIA);
        assertThat(testStatCorrectAnswers.getCountResult()).isEqualTo(DEFAULT_COUNT_RESULT);
    }

    @Test
    @Transactional
    public void createStatCorrectAnswersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = statCorrectAnswersRepository.findAll().size();

        // Create the StatCorrectAnswers with an existing ID
        statCorrectAnswers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatCorrectAnswersMockMvc.perform(post("/api/stat-correct-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statCorrectAnswers)))
            .andExpect(status().isBadRequest());

        // Validate the StatCorrectAnswers in the database
        List<StatCorrectAnswers> statCorrectAnswersList = statCorrectAnswersRepository.findAll();
        assertThat(statCorrectAnswersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStatCorrectAnswers() throws Exception {
        // Initialize the database
        statCorrectAnswersRepository.saveAndFlush(statCorrectAnswers);

        // Get all the statCorrectAnswersList
        restStatCorrectAnswersMockMvc.perform(get("/api/stat-correct-answers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statCorrectAnswers.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameCriteria").value(hasItem(DEFAULT_NAME_CRITERIA)))
            .andExpect(jsonPath("$.[*].countResult").value(hasItem(DEFAULT_COUNT_RESULT.intValue())));
    }
    
    @Test
    @Transactional
    public void getStatCorrectAnswers() throws Exception {
        // Initialize the database
        statCorrectAnswersRepository.saveAndFlush(statCorrectAnswers);

        // Get the statCorrectAnswers
        restStatCorrectAnswersMockMvc.perform(get("/api/stat-correct-answers/{id}", statCorrectAnswers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(statCorrectAnswers.getId().intValue()))
            .andExpect(jsonPath("$.nameCriteria").value(DEFAULT_NAME_CRITERIA))
            .andExpect(jsonPath("$.countResult").value(DEFAULT_COUNT_RESULT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStatCorrectAnswers() throws Exception {
        // Get the statCorrectAnswers
        restStatCorrectAnswersMockMvc.perform(get("/api/stat-correct-answers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStatCorrectAnswers() throws Exception {
        // Initialize the database
        statCorrectAnswersRepository.saveAndFlush(statCorrectAnswers);

        int databaseSizeBeforeUpdate = statCorrectAnswersRepository.findAll().size();

        // Update the statCorrectAnswers
        StatCorrectAnswers updatedStatCorrectAnswers = statCorrectAnswersRepository.findById(statCorrectAnswers.getId()).get();
        // Disconnect from session so that the updates on updatedStatCorrectAnswers are not directly saved in db
        em.detach(updatedStatCorrectAnswers);
        updatedStatCorrectAnswers
            .nameCriteria(UPDATED_NAME_CRITERIA)
            .countResult(UPDATED_COUNT_RESULT);

        restStatCorrectAnswersMockMvc.perform(put("/api/stat-correct-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStatCorrectAnswers)))
            .andExpect(status().isOk());

        // Validate the StatCorrectAnswers in the database
        List<StatCorrectAnswers> statCorrectAnswersList = statCorrectAnswersRepository.findAll();
        assertThat(statCorrectAnswersList).hasSize(databaseSizeBeforeUpdate);
        StatCorrectAnswers testStatCorrectAnswers = statCorrectAnswersList.get(statCorrectAnswersList.size() - 1);
        assertThat(testStatCorrectAnswers.getNameCriteria()).isEqualTo(UPDATED_NAME_CRITERIA);
        assertThat(testStatCorrectAnswers.getCountResult()).isEqualTo(UPDATED_COUNT_RESULT);
    }

    @Test
    @Transactional
    public void updateNonExistingStatCorrectAnswers() throws Exception {
        int databaseSizeBeforeUpdate = statCorrectAnswersRepository.findAll().size();

        // Create the StatCorrectAnswers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStatCorrectAnswersMockMvc.perform(put("/api/stat-correct-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statCorrectAnswers)))
            .andExpect(status().isBadRequest());

        // Validate the StatCorrectAnswers in the database
        List<StatCorrectAnswers> statCorrectAnswersList = statCorrectAnswersRepository.findAll();
        assertThat(statCorrectAnswersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStatCorrectAnswers() throws Exception {
        // Initialize the database
        statCorrectAnswersRepository.saveAndFlush(statCorrectAnswers);

        int databaseSizeBeforeDelete = statCorrectAnswersRepository.findAll().size();

        // Delete the statCorrectAnswers
        restStatCorrectAnswersMockMvc.perform(delete("/api/stat-correct-answers/{id}", statCorrectAnswers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StatCorrectAnswers> statCorrectAnswersList = statCorrectAnswersRepository.findAll();
        assertThat(statCorrectAnswersList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
