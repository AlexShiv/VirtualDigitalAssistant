package ru.asu.vda.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ru.asu.vda.web.rest.TestUtil;

public class FacultiesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Faculties.class);
        Faculties faculties1 = new Faculties();
        faculties1.setId(1L);
        Faculties faculties2 = new Faculties();
        faculties2.setId(faculties1.getId());
        assertThat(faculties1).isEqualTo(faculties2);
        faculties2.setId(2L);
        assertThat(faculties1).isNotEqualTo(faculties2);
        faculties1.setId(null);
        assertThat(faculties1).isNotEqualTo(faculties2);
    }
}
