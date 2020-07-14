package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Tfj;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Tfj entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TfjRepository extends JpaRepository<Tfj, Long>, JpaSpecificationExecutor<Tfj> {
}
