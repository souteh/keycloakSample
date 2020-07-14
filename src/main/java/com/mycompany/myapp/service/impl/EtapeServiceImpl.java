package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.EtapeService;
import com.mycompany.myapp.domain.Etape;
import com.mycompany.myapp.repository.EtapeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Etape}.
 */
@Service
@Transactional
public class EtapeServiceImpl implements EtapeService {

    private final Logger log = LoggerFactory.getLogger(EtapeServiceImpl.class);

    private final EtapeRepository etapeRepository;

    public EtapeServiceImpl(EtapeRepository etapeRepository) {
        this.etapeRepository = etapeRepository;
    }

    @Override
    public Etape save(Etape etape) {
        log.debug("Request to save Etape : {}", etape);
        return etapeRepository.save(etape);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Etape> findAll(Pageable pageable) {
        log.debug("Request to get all Etapes");
        return etapeRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Etape> findOne(Long id) {
        log.debug("Request to get Etape : {}", id);
        return etapeRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Etape : {}", id);
        etapeRepository.deleteById(id);
    }
}