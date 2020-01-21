package ru.asu.vda.repository;

import ru.asu.vda.domain.EventTypes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EventTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventTypesRepository extends JpaRepository<EventTypes, Long> {

}
