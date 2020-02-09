package ru.asu.vda.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Groups.
 */
@Entity
@Table(name = "groups")
public class Groups implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_group")
    private String nameGroup;

    @OneToMany(mappedBy = "groups")
    private Set<Clients> clients = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("groups")
    private Faculties faculty;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameGroup() {
        return nameGroup;
    }

    public Groups nameGroup(String nameGroup) {
        this.nameGroup = nameGroup;
        return this;
    }

    public void setNameGroup(String nameGroup) {
        this.nameGroup = nameGroup;
    }

    public Set<Clients> getClients() {
        return clients;
    }

    public Groups clients(Set<Clients> clients) {
        this.clients = clients;
        return this;
    }

    public Groups addClients(Clients clients) {
        this.clients.add(clients);
        clients.setGroups(this);
        return this;
    }

    public Groups removeClients(Clients clients) {
        this.clients.remove(clients);
        clients.setGroups(null);
        return this;
    }

    public void setClients(Set<Clients> clients) {
        this.clients = clients;
    }

    public Faculties getFaculty() {
        return faculty;
    }

    public Groups faculty(Faculties faculties) {
        this.faculty = faculties;
        return this;
    }

    public void setFaculty(Faculties faculties) {
        this.faculty = faculties;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Groups)) {
            return false;
        }
        return id != null && id.equals(((Groups) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Groups{" +
            "id=" + getId() +
            ", nameGroup='" + getNameGroup() + "'" +
            "}";
    }
}
