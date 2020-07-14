package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.ActionService;
import com.mycompany.myapp.domain.Action;
import com.mycompany.myapp.repository.ActionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Action}.
 */
@Service
@Transactional
public class ActionServiceImpl implements ActionService {

    private final Logger log = LoggerFactory.getLogger(ActionServiceImpl.class);

    private final ActionRepository actionRepository;

    public ActionServiceImpl(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    @Override
    public Action save(Action action) {
        log.debug("Request to save Action : {}", action);
        return actionRepository.save(action);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Action> findAll(Pageable pageable) {
        log.debug("Request to get all Actions");
        return actionRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Action> findOne(Long id) {
        log.debug("Request to get Action : {}", id);
        return actionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Action : {}", id);
        actionRepository.deleteById(id);
    }
}
