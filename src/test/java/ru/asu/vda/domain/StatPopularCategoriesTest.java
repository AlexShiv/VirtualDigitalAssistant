package ru.asu.vda.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ru.asu.vda.web.rest.TestUtil;

public class StatPopularCategoriesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StatPopularCategories.class);
        StatPopularCategories statPopularCategories1 = new StatPopularCategories();
        statPopularCategories1.setId(1L);
        StatPopularCategories statPopularCategories2 = new StatPopularCategories();
        statPopularCategories2.setId(statPopularCategories1.getId());
        assertThat(statPopularCategories1).isEqualTo(statPopularCategories2);
        statPopularCategories2.setId(2L);
        assertThat(statPopularCategories1).isNotEqualTo(statPopularCategories2);
        statPopularCategories1.setId(null);
        assertThat(statPopularCategories1).isNotEqualTo(statPopularCategories2);
    }
}
