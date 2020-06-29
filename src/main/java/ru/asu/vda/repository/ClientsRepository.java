package ru.asu.vda.repository;

import ru.asu.vda.domain.Clients;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Clients entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientsRepository extends JpaRepository<Clients, Long> {

    Optional<Clients> findByPhone(String phone);

}
