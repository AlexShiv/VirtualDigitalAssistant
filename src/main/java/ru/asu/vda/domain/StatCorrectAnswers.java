package ru.asu.vda.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A StatCorrectAnswers.
 */
@Entity
@Table(name = "stat_correct_answers")
public class StatCorrectAnswers implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_criteria")
    private String nameCriteria;

    @Column(name = "count_result")
    private Long countResult;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameCriteria() {
        return nameCriteria;
    }

    public StatCorrectAnswers nameCriteria(String nameCriteria) {
        this.nameCriteria = nameCriteria;
        return this;
    }

    public void setNameCriteria(String nameCriteria) {
        this.nameCriteria = nameCriteria;
    }

    public Long getCountResult() {
        return countResult;
    }

    public StatCorrectAnswers countResult(Long countResult) {
        this.countResult = countResult;
        return this;
    }

    public void setCountResult(Long countResult) {
        this.countResult = countResult;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StatCorrectAnswers)) {
            return false;
        }
        return id != null && id.equals(((StatCorrectAnswers) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StatCorrectAnswers{" +
            "id=" + getId() +
            ", nameCriteria='" + getNameCriteria() + "'" +
            ", countResult=" + getCountResult() +
            "}";
    }
}
