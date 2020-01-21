package ru.asu.vda.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ru.asu.vda.web.rest.TestUtil;

public class FormsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Forms.class);
        Forms forms1 = new Forms();
        forms1.setId(1L);
        Forms forms2 = new Forms();
        forms2.setId(forms1.getId());
        assertThat(forms1).isEqualTo(forms2);
        forms2.setId(2L);
        assertThat(forms1).isNotEqualTo(forms2);
        forms1.setId(null);
        assertThat(forms1).isNotEqualTo(forms2);
    }
}
