package ru.asu.vda.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A StatPopularCategories.
 */
@Entity
@Table(name = "stat_popular_categories")
public class StatPopularCategories implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_category")
    private String nameCategory;

    @Column(name = "count_answers")
    private Long countAnswers;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameCategory() {
        return nameCategory;
    }

    public StatPopularCategories nameCategory(String nameCategory) {
        this.nameCategory = nameCategory;
        return this;
    }

    public void setNameCategory(String nameCategory) {
        this.nameCategory = nameCategory;
    }

    public Long getCountAnswers() {
        return countAnswers;
    }

    public StatPopularCategories countAnswers(Long countAnswers) {
        this.countAnswers = countAnswers;
        return this;
    }

    public void setCountAnswers(Long countAnswers) {
        this.countAnswers = countAnswers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StatPopularCategories)) {
            return false;
        }
        return id != null && id.equals(((StatPopularCategories) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StatPopularCategories{" +
            "id=" + getId() +
            ", nameCategory='" + getNameCategory() + "'" +
            ", countAnswers=" + getCountAnswers() +
            "}";
    }
}
