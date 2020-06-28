package ru.asu.vda.web.rest;

import ru.asu.vda.VirtualDigitalAssistantApp;
import ru.asu.vda.domain.StatPopularCategories;
import ru.asu.vda.repository.StatPopularCategoriesRepository;
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
 * Integration tests for the {@link StatPopularCategoriesResource} REST controller.
 */
@SpringBootTest(classes = VirtualDigitalAssistantApp.class)
public class StatPopularCategoriesResourceIT {

    private static final String DEFAULT_NAME_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_NAME_CATEGORY = "BBBBBBBBBB";

    private static final Long DEFAULT_COUNT_ANSWERS = 1L;
    private static final Long UPDATED_COUNT_ANSWERS = 2L;

    @Autowired
    private StatPopularCategoriesRepository statPopularCategoriesRepository;

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

    private MockMvc restStatPopularCategoriesMockMvc;

    private StatPopularCategories statPopularCategories;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StatPopularCategoriesResource statPopularCategoriesResource = new StatPopularCategoriesResource(statPopularCategoriesRepository);
        this.restStatPopularCategoriesMockMvc = MockMvcBuilders.standaloneSetup(statPopularCategoriesResource)
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
    public static StatPopularCategories createEntity(EntityManager em) {
        StatPopularCategories statPopularCategories = new StatPopularCategories()
            .nameCategory(DEFAULT_NAME_CATEGORY)
            .countAnswers(DEFAULT_COUNT_ANSWERS);
        return statPopularCategories;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StatPopularCategories createUpdatedEntity(EntityManager em) {
        StatPopularCategories statPopularCategories = new StatPopularCategories()
            .nameCategory(UPDATED_NAME_CATEGORY)
            .countAnswers(UPDATED_COUNT_ANSWERS);
        return statPopularCategories;
    }

    @BeforeEach
    public void initTest() {
        statPopularCategories = createEntity(em);
    }

    @Test
    @Transactional
    public void createStatPopularCategories() throws Exception {
        int databaseSizeBeforeCreate = statPopularCategoriesRepository.findAll().size();

        // Create the StatPopularCategories
        restStatPopularCategoriesMockMvc.perform(post("/api/stat-popular-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statPopularCategories)))
            .andExpect(status().isCreated());

        // Validate the StatPopularCategories in the database
        List<StatPopularCategories> statPopularCategoriesList = statPopularCategoriesRepository.findAll();
        assertThat(statPopularCategoriesList).hasSize(databaseSizeBeforeCreate + 1);
        StatPopularCategories testStatPopularCategories = statPopularCategoriesList.get(statPopularCategoriesList.size() - 1);
        assertThat(testStatPopularCategories.getNameCategory()).isEqualTo(DEFAULT_NAME_CATEGORY);
        assertThat(testStatPopularCategories.getCountAnswers()).isEqualTo(DEFAULT_COUNT_ANSWERS);
    }

    @Test
    @Transactional
    public void createStatPopularCategoriesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = statPopularCategoriesRepository.findAll().size();

        // Create the StatPopularCategories with an existing ID
        statPopularCategories.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatPopularCategoriesMockMvc.perform(post("/api/stat-popular-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statPopularCategories)))
            .andExpect(status().isBadRequest());

        // Validate the StatPopularCategories in the database
        List<StatPopularCategories> statPopularCategoriesList = statPopularCategoriesRepository.findAll();
        assertThat(statPopularCategoriesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStatPopularCategories() throws Exception {
        // Initialize the database
        statPopularCategoriesRepository.saveAndFlush(statPopularCategories);

        // Get all the statPopularCategoriesList
        restStatPopularCategoriesMockMvc.perform(get("/api/stat-popular-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statPopularCategories.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameCategory").value(hasItem(DEFAULT_NAME_CATEGORY)))
            .andExpect(jsonPath("$.[*].countAnswers").value(hasItem(DEFAULT_COUNT_ANSWERS.intValue())));
    }
    
    @Test
    @Transactional
    public void getStatPopularCategories() throws Exception {
        // Initialize the database
        statPopularCategoriesRepository.saveAndFlush(statPopularCategories);

        // Get the statPopularCategories
        restStatPopularCategoriesMockMvc.perform(get("/api/stat-popular-categories/{id}", statPopularCategories.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(statPopularCategories.getId().intValue()))
            .andExpect(jsonPath("$.nameCategory").value(DEFAULT_NAME_CATEGORY))
            .andExpect(jsonPath("$.countAnswers").value(DEFAULT_COUNT_ANSWERS.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStatPopularCategories() throws Exception {
        // Get the statPopularCategories
        restStatPopularCategoriesMockMvc.perform(get("/api/stat-popular-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStatPopularCategories() throws Exception {
        // Initialize the database
        statPopularCategoriesRepository.saveAndFlush(statPopularCategories);

        int databaseSizeBeforeUpdate = statPopularCategoriesRepository.findAll().size();

        // Update the statPopularCategories
        StatPopularCategories updatedStatPopularCategories = statPopularCategoriesRepository.findById(statPopularCategories.getId()).get();
        // Disconnect from session so that the updates on updatedStatPopularCategories are not directly saved in db
        em.detach(updatedStatPopularCategories);
        updatedStatPopularCategories
            .nameCategory(UPDATED_NAME_CATEGORY)
            .countAnswers(UPDATED_COUNT_ANSWERS);

        restStatPopularCategoriesMockMvc.perform(put("/api/stat-popular-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStatPopularCategories)))
            .andExpect(status().isOk());

        // Validate the StatPopularCategories in the database
        List<StatPopularCategories> statPopularCategoriesList = statPopularCategoriesRepository.findAll();
        assertThat(statPopularCategoriesList).hasSize(databaseSizeBeforeUpdate);
        StatPopularCategories testStatPopularCategories = statPopularCategoriesList.get(statPopularCategoriesList.size() - 1);
        assertThat(testStatPopularCategories.getNameCategory()).isEqualTo(UPDATED_NAME_CATEGORY);
        assertThat(testStatPopularCategories.getCountAnswers()).isEqualTo(UPDATED_COUNT_ANSWERS);
    }

    @Test
    @Transactional
    public void updateNonExistingStatPopularCategories() throws Exception {
        int databaseSizeBeforeUpdate = statPopularCategoriesRepository.findAll().size();

        // Create the StatPopularCategories

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStatPopularCategoriesMockMvc.perform(put("/api/stat-popular-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statPopularCategories)))
            .andExpect(status().isBadRequest());

        // Validate the StatPopularCategories in the database
        List<StatPopularCategories> statPopularCategoriesList = statPopularCategoriesRepository.findAll();
        assertThat(statPopularCategoriesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStatPopularCategories() throws Exception {
        // Initialize the database
        statPopularCategoriesRepository.saveAndFlush(statPopularCategories);

        int databaseSizeBeforeDelete = statPopularCategoriesRepository.findAll().size();

        // Delete the statPopularCategories
        restStatPopularCategoriesMockMvc.perform(delete("/api/stat-popular-categories/{id}", statPopularCategories.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StatPopularCategories> statPopularCategoriesList = statPopularCategoriesRepository.findAll();
        assertThat(statPopularCategoriesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
