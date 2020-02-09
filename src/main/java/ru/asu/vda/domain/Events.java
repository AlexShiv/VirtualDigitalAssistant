package ru.asu.vda.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Events.
 */
@Entity
@Table(name = "events")
public class Events implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_event")
    private String nameEvent;

    @Column(name = "description")
    private String description;

    @Column(name = "begin_date")
    private Instant beginDate;

    @Column(name = "end_date")
    private Instant endDate;

    @OneToOne
    @JoinColumn(unique = true)
    private Clients client;

    @OneToMany(mappedBy = "event")
    private Set<Forms> forms = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("events")
    private EventTypes eventTypes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameEvent() {
        return nameEvent;
    }

    public Events nameEvent(String nameEvent) {
        this.nameEvent = nameEvent;
        return this;
    }

    public void setNameEvent(String nameEvent) {
        this.nameEvent = nameEvent;
    }

    public String getDescription() {
        return description;
    }

    public Events description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getBeginDate() {
        return beginDate;
    }

    public Events beginDate(Instant beginDate) {
        this.beginDate = beginDate;
        return this;
    }

    public void setBeginDate(Instant beginDate) {
        this.beginDate = beginDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Events endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Clients getClient() {
        return client;
    }

    public Events client(Clients clients) {
        this.client = clients;
        return this;
    }

    public void setClient(Clients clients) {
        this.client = clients;
    }

    public Set<Forms> getForms() {
        return forms;
    }

    public Events forms(Set<Forms> forms) {
        this.forms = forms;
        return this;
    }

    public Events addForms(Forms forms) {
        this.forms.add(forms);
        forms.setEvent(this);
        return this;
    }

    public Events removeForms(Forms forms) {
        this.forms.remove(forms);
        forms.setEvent(null);
        return this;
    }

    public void setForms(Set<Forms> forms) {
        this.forms = forms;
    }

    public EventTypes getEventTypes() {
        return eventTypes;
    }

    public Events eventTypes(EventTypes eventTypes) {
        this.eventTypes = eventTypes;
        return this;
    }

    public void setEventTypes(EventTypes eventTypes) {
        this.eventTypes = eventTypes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Events)) {
            return false;
        }
        return id != null && id.equals(((Events) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Events{" +
            "id=" + getId() +
            ", nameEvent='" + getNameEvent() + "'" +
            ", description='" + getDescription() + "'" +
            ", beginDate='" + getBeginDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
