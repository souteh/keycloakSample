import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMessageerreur } from 'app/shared/model/messageerreur.model';
import { MessageerreurService } from './messageerreur.service';

@Component({
  templateUrl: './messageerreur-delete-dialog.component.html',
})
export class MessageerreurDeleteDialogComponent {
  messageerreur?: IMessageerreur;

  constructor(
    protected messageerreurService: MessageerreurService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.messageerreurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('messageerreurListModification');
      this.activeModal.close();
    });
  }
}
