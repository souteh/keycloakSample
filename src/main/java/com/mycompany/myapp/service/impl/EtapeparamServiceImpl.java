package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.EtapeparamService;
import com.mycompany.myapp.domain.Etapeparam;
import com.mycompany.myapp.repository.EtapeparamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Etapeparam}.
 */
@Service
@Transactional
public class EtapeparamServiceImpl implements EtapeparamService {

    private final Logger log = LoggerFactory.getLogger(EtapeparamServiceImpl.class);

    private final EtapeparamRepository etapeparamRepository;

    public EtapeparamServiceImpl(EtapeparamRepository etapeparamRepository) {
        this.etapeparamRepository = etapeparamRepository;
    }

    @Override
    public Etapeparam save(Etapeparam etapeparam) {
        log.debug("Request to save Etapeparam : {}", etapeparam);
        return etapeparamRepository.save(etapeparam);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Etapeparam> findAll(Pageable pageable) {
        log.debug("Request to get all Etapeparams");
        return etapeparamRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Etapeparam> findOne(Long id) {
        log.debug("Request to get Etapeparam : {}", id);
        return etapeparamRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Etapeparam : {}", id);
        etapeparamRepository.deleteById(id);
    }
}
