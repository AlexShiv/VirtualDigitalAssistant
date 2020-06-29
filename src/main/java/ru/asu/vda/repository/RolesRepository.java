package ru.asu.vda.repository;

import ru.asu.vda.domain.Roles;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Roles entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {

    Optional<Roles> findByNameRole(String nameRole);

}
