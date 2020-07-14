package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.ActionparamService;
import com.mycompany.myapp.domain.Actionparam;
import com.mycompany.myapp.repository.ActionparamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Actionparam}.
 */
@Service
@Transactional
public class ActionparamServiceImpl implements ActionparamService {

    private final Logger log = LoggerFactory.getLogger(ActionparamServiceImpl.class);

    private final ActionparamRepository actionparamRepository;

    public ActionparamServiceImpl(ActionparamRepository actionparamRepository) {
        this.actionparamRepository = actionparamRepository;
    }

    @Override
    public Actionparam save(Actionparam actionparam) {
        log.debug("Request to save Actionparam : {}", actionparam);
        return actionparamRepository.save(actionparam);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Actionparam> findAll(Pageable pageable) {
        log.debug("Request to get all Actionparams");
        return actionparamRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Actionparam> findOne(Long id) {
        log.debug("Request to get Actionparam : {}", id);
        return actionparamRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Actionparam : {}", id);
        actionparamRepository.deleteById(id);
    }
}
