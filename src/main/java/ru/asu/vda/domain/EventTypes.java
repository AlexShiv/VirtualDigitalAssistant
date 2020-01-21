package ru.asu.vda.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A EventTypes.
 */
@Entity
@Table(name = "event_types")
public class EventTypes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_event_type")
    private String nameEventType;

    @OneToMany(mappedBy = "eventTypes")
    private Set<Events> events = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameEventType() {
        return nameEventType;
    }

    public EventTypes nameEventType(String nameEventType) {
        this.nameEventType = nameEventType;
        return this;
    }

    public void setNameEventType(String nameEventType) {
        this.nameEventType = nameEventType;
    }

    public Set<Events> getEvents() {
        return events;
    }

    public EventTypes events(Set<Events> events) {
        this.events = events;
        return this;
    }

    public EventTypes addEvents(Events events) {
        this.events.add(events);
        events.setEventTypes(this);
        return this;
    }

    public EventTypes removeEvents(Events events) {
        this.events.remove(events);
        events.setEventTypes(null);
        return this;
    }

    public void setEvents(Set<Events> events) {
        this.events = events;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EventTypes)) {
            return false;
        }
        return id != null && id.equals(((EventTypes) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EventTypes{" +
            "id=" + getId() +
            ", nameEventType='" + getNameEventType() + "'" +
            "}";
    }
}
