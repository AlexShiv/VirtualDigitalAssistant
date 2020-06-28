package ru.asu.vda.repository;

import ru.asu.vda.domain.StatCorrectAnswers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StatCorrectAnswers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatCorrectAnswersRepository extends JpaRepository<StatCorrectAnswers, Long> {

}
