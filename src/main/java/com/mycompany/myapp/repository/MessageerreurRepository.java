package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Messageerreur;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Messageerreur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageerreurRepository extends JpaRepository<Messageerreur, Long>, JpaSpecificationExecutor<Messageerreur> {
}
