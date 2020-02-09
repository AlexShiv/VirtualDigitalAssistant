package ru.asu.vda.repository;

import ru.asu.vda.domain.Faculties;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Faculties entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacultiesRepository extends JpaRepository<Faculties, Long> {

}
