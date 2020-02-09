package ru.asu.vda.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Clients.
 */
@Entity
@Table(name = "clients")
public class Clients implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "surname")
    private String surname;

    @Column(name = "name")
    private String name;

    @Column(name = "patronymic")
    private String patronymic;

    @Column(name = "phone")
    private String phone;

    @OneToMany(mappedBy = "client")
    private Set<Forms> forms = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("clients")
    private Groups groups;

    @ManyToOne
    @JsonIgnoreProperties("clients")
    private Roles role;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSurname() {
        return surname;
    }

    public Clients surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public Clients name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public Clients patronymic(String patronymic) {
        this.patronymic = patronymic;
        return this;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    public String getPhone() {
        return phone;
    }

    public Clients phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<Forms> getForms() {
        return forms;
    }

    public Clients forms(Set<Forms> forms) {
        this.forms = forms;
        return this;
    }

    public Clients addForms(Forms forms) {
        this.forms.add(forms);
        forms.setClient(this);
        return this;
    }

    public Clients removeForms(Forms forms) {
        this.forms.remove(forms);
        forms.setClient(null);
        return this;
    }

    public void setForms(Set<Forms> forms) {
        this.forms = forms;
    }

    public Groups getGroups() {
        return groups;
    }

    public Clients groups(Groups groups) {
        this.groups = groups;
        return this;
    }

    public void setGroups(Groups groups) {
        this.groups = groups;
    }

    public Roles getRole() {
        return role;
    }

    public Clients role(Roles roles) {
        this.role = roles;
        return this;
    }

    public void setRole(Roles roles) {
        this.role = roles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Clients)) {
            return false;
        }
        return id != null && id.equals(((Clients) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Clients{" +
            "id=" + getId() +
            ", surname='" + getSurname() + "'" +
            ", name='" + getName() + "'" +
            ", patronymic='" + getPatronymic() + "'" +
            ", phone='" + getPhone() + "'" +
            "}";
    }
}
