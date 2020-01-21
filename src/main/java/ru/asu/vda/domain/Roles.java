package ru.asu.vda.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Roles.
 */
@Entity
@Table(name = "roles")
public class Roles implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_role")
    private String nameRole;

    @OneToMany(mappedBy = "role")
    private Set<Clients> clients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameRole() {
        return nameRole;
    }

    public Roles nameRole(String nameRole) {
        this.nameRole = nameRole;
        return this;
    }

    public void setNameRole(String nameRole) {
        this.nameRole = nameRole;
    }

    public Set<Clients> getClients() {
        return clients;
    }

    public Roles clients(Set<Clients> clients) {
        this.clients = clients;
        return this;
    }

    public Roles addClients(Clients clients) {
        this.clients.add(clients);
        clients.setRole(this);
        return this;
    }

    public Roles removeClients(Clients clients) {
        this.clients.remove(clients);
        clients.setRole(null);
        return this;
    }

    public void setClients(Set<Clients> clients) {
        this.clients = clients;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Roles)) {
            return false;
        }
        return id != null && id.equals(((Roles) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Roles{" +
            "id=" + getId() +
            ", nameRole='" + getNameRole() + "'" +
            "}";
    }
}
