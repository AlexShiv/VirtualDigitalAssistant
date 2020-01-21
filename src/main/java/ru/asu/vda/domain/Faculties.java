package ru.asu.vda.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Faculties.
 */
@Entity
@Table(name = "faculties")
public class Faculties implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_faculty")
    private String nameFaculty;

    @OneToMany(mappedBy = "faculty")
    private Set<Groups> groups = new HashSet<>();

    @OneToMany(mappedBy = "faculties")
    private Set<Teachers> teachers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameFaculty() {
        return nameFaculty;
    }

    public Faculties nameFaculty(String nameFaculty) {
        this.nameFaculty = nameFaculty;
        return this;
    }

    public void setNameFaculty(String nameFaculty) {
        this.nameFaculty = nameFaculty;
    }

    public Set<Groups> getGroups() {
        return groups;
    }

    public Faculties groups(Set<Groups> groups) {
        this.groups = groups;
        return this;
    }

    public Faculties addGroups(Groups groups) {
        this.groups.add(groups);
        groups.setFaculty(this);
        return this;
    }

    public Faculties removeGroups(Groups groups) {
        this.groups.remove(groups);
        groups.setFaculty(null);
        return this;
    }

    public void setGroups(Set<Groups> groups) {
        this.groups = groups;
    }

    public Set<Teachers> getTeachers() {
        return teachers;
    }

    public Faculties teachers(Set<Teachers> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Faculties addTeachers(Teachers teachers) {
        this.teachers.add(teachers);
        teachers.setFaculties(this);
        return this;
    }

    public Faculties removeTeachers(Teachers teachers) {
        this.teachers.remove(teachers);
        teachers.setFaculties(null);
        return this;
    }

    public void setTeachers(Set<Teachers> teachers) {
        this.teachers = teachers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Faculties)) {
            return false;
        }
        return id != null && id.equals(((Faculties) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Faculties{" +
            "id=" + getId() +
            ", nameFaculty='" + getNameFaculty() + "'" +
            "}";
    }
}
