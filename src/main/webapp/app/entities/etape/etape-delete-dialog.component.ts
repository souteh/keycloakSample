import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtape } from 'app/shared/model/etape.model';
import { EtapeService } from './etape.service';

@Component({
  templateUrl: './etape-delete-dialog.component.html',
})
export class EtapeDeleteDialogComponent {
  etape?: IEtape;

  constructor(protected etapeService: EtapeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.etapeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('etapeListModification');
      this.activeModal.close();
    });
  }
}
