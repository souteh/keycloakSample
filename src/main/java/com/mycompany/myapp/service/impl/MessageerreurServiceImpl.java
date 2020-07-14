package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.MessageerreurService;
import com.mycompany.myapp.domain.Messageerreur;
import com.mycompany.myapp.repository.MessageerreurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Messageerreur}.
 */
@Service
@Transactional
public class MessageerreurServiceImpl implements MessageerreurService {

    private final Logger log = LoggerFactory.getLogger(MessageerreurServiceImpl.class);

    private final MessageerreurRepository messageerreurRepository;

    public MessageerreurServiceImpl(MessageerreurRepository messageerreurRepository) {
        this.messageerreurRepository = messageerreurRepository;
    }

    @Override
    public Messageerreur save(Messageerreur messageerreur) {
        log.debug("Request to save Messageerreur : {}", messageerreur);
        return messageerreurRepository.save(messageerreur);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Messageerreur> findAll(Pageable pageable) {
        log.debug("Request to get all Messageerreurs");
        return messageerreurRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Messageerreur> findOne(Long id) {
        log.debug("Request to get Messageerreur : {}", id);
        return messageerreurRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Messageerreur : {}", id);
        messageerreurRepository.deleteById(id);
    }
}
