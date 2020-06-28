package ru.asu.vda.repository;

import ru.asu.vda.domain.Events;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Events entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventsRepository extends JpaRepository<Events, Long> {

    Boolean existsEventsByNameEvent(String nameEvent);
    Events getByNameEvent(String nameEvent);
}
