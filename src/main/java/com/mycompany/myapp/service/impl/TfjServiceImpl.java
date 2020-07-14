package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TfjService;
import com.mycompany.myapp.domain.Tfj;
import com.mycompany.myapp.repository.TfjRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Tfj}.
 */
@Service
@Transactional
public class TfjServiceImpl implements TfjService {

    private final Logger log = LoggerFactory.getLogger(TfjServiceImpl.class);

    private final TfjRepository tfjRepository;

    public TfjServiceImpl(TfjRepository tfjRepository) {
        this.tfjRepository = tfjRepository;
    }

    @Override
    public Tfj save(Tfj tfj) {
        log.debug("Request to save Tfj : {}", tfj);
        return tfjRepository.save(tfj);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Tfj> findAll(Pageable pageable) {
        log.debug("Request to get all Tfjs");
        return tfjRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Tfj> findOne(Long id) {
        log.debug("Request to get Tfj : {}", id);
        return tfjRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tfj : {}", id);
        tfjRepository.deleteById(id);
    }
}
