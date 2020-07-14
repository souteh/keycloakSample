package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.StatutenumService;
import com.mycompany.myapp.domain.Statutenum;
import com.mycompany.myapp.repository.StatutenumRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Statutenum}.
 */
@Service
@Transactional
public class StatutenumServiceImpl implements StatutenumService {

    private final Logger log = LoggerFactory.getLogger(StatutenumServiceImpl.class);

    private final StatutenumRepository statutenumRepository;

    public StatutenumServiceImpl(StatutenumRepository statutenumRepository) {
        this.statutenumRepository = statutenumRepository;
    }

    @Override
    public Statutenum save(Statutenum statutenum) {
        log.debug("Request to save Statutenum : {}", statutenum);
        return statutenumRepository.save(statutenum);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Statutenum> findAll(Pageable pageable) {
        log.debug("Request to get all Statutenums");
        return statutenumRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Statutenum> findOne(Long id) {
        log.debug("Request to get Statutenum : {}", id);
        return statutenumRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Statutenum : {}", id);
        statutenumRepository.deleteById(id);
    }
}
