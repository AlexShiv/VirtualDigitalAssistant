package ru.asu.vda.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ru.asu.vda.web.rest.TestUtil;

public class StatCorrectAnswersTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StatCorrectAnswers.class);
        StatCorrectAnswers statCorrectAnswers1 = new StatCorrectAnswers();
        statCorrectAnswers1.setId(1L);
        StatCorrectAnswers statCorrectAnswers2 = new StatCorrectAnswers();
        statCorrectAnswers2.setId(statCorrectAnswers1.getId());
        assertThat(statCorrectAnswers1).isEqualTo(statCorrectAnswers2);
        statCorrectAnswers2.setId(2L);
        assertThat(statCorrectAnswers1).isNotEqualTo(statCorrectAnswers2);
        statCorrectAnswers1.setId(null);
        assertThat(statCorrectAnswers1).isNotEqualTo(statCorrectAnswers2);
    }
}
