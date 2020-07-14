import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITfj } from 'app/shared/model/tfj.model';
import { TfjService } from './tfj.service';

@Component({
  templateUrl: './tfj-delete-dialog.component.html',
})
export class TfjDeleteDialogComponent {
  tfj?: ITfj;

  constructor(protected tfjService: TfjService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tfjService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tfjListModification');
      this.activeModal.close();
    });
  }
}
