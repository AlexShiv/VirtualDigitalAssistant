package ru.asu.vda.repository;

import ru.asu.vda.domain.StatPopularCategories;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the StatPopularCategories entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatPopularCategoriesRepository extends JpaRepository<StatPopularCategories, Long> {

    Optional<StatPopularCategories> findByNameCategory(String nameCategory);

}
