package ru.asu.vda.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Documents.
 */
@Entity
@Table(name = "documents")
public class Documents implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_document")
    private String nameDocument;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "change_date")
    private Instant changeDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameDocument() {
        return nameDocument;
    }

    public Documents nameDocument(String nameDocument) {
        this.nameDocument = nameDocument;
        return this;
    }

    public void setNameDocument(String nameDocument) {
        this.nameDocument = nameDocument;
    }

    public String getContent() {
        return content;
    }

    public Documents content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Documents createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getChangeDate() {
        return changeDate;
    }

    public Documents changeDate(Instant changeDate) {
        this.changeDate = changeDate;
        return this;
    }

    public void setChangeDate(Instant changeDate) {
        this.changeDate = changeDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Documents)) {
            return false;
        }
        return id != null && id.equals(((Documents) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Documents{" +
            "id=" + getId() +
            ", nameDocument='" + getNameDocument() + "'" +
            ", content='" + getContent() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", changeDate='" + getChangeDate() + "'" +
            "}";
    }
}
