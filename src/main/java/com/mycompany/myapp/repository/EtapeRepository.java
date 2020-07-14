package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Etape;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Etape entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtapeRepository extends JpaRepository<Etape, Long>, JpaSpecificationExecutor<Etape> {
}
