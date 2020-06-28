package ru.asu.vda.repository;

import ru.asu.vda.domain.StatCorrectAnswers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the StatCorrectAnswers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatCorrectAnswersRepository extends JpaRepository<StatCorrectAnswers, Long> {

    Optional<StatCorrectAnswers> findByNameCriteria(String nameCriteria);

}
