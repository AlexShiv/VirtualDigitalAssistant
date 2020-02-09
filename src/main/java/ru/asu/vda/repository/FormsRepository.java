package ru.asu.vda.repository;

import ru.asu.vda.domain.Forms;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Forms entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormsRepository extends JpaRepository<Forms, Long> {

}
