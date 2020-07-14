package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Actionparam;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Actionparam entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActionparamRepository extends JpaRepository<Actionparam, Long>, JpaSpecificationExecutor<Actionparam> {
}
