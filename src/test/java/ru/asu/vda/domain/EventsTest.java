package ru.asu.vda.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ru.asu.vda.web.rest.TestUtil;

public class EventsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Events.class);
        Events events1 = new Events();
        events1.setId(1L);
        Events events2 = new Events();
        events2.setId(events1.getId());
        assertThat(events1).isEqualTo(events2);
        events2.setId(2L);
        assertThat(events1).isNotEqualTo(events2);
        events1.setId(null);
        assertThat(events1).isNotEqualTo(events2);
    }
}
