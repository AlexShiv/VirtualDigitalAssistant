package ru.asu.vda.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Forms.
 */
@Entity
@Table(name = "forms")
public class Forms implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "create_date")
    private Instant createDate;

    @ManyToOne
    @JsonIgnoreProperties("forms")
    private Events event;

    @ManyToOne
    @JsonIgnoreProperties("forms")
    private Clients client;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Forms createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Events getEvent() {
        return event;
    }

    public Forms event(Events events) {
        this.event = events;
        return this;
    }

    public void setEvent(Events events) {
        this.event = events;
    }

    public Clients getClient() {
        return client;
    }

    public Forms client(Clients clients) {
        this.client = clients;
        return this;
    }

    public void setClient(Clients clients) {
        this.client = clients;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Forms)) {
            return false;
        }
        return id != null && id.equals(((Forms) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Forms{" +
            "id=" + getId() +
            ", createDate='" + getCreateDate() + "'" +
            "}";
    }
}
