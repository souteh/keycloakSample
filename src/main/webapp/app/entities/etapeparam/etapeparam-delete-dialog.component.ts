import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtapeparam } from 'app/shared/model/etapeparam.model';
import { EtapeparamService } from './etapeparam.service';

@Component({
  templateUrl: './etapeparam-delete-dialog.component.html',
})
export class EtapeparamDeleteDialogComponent {
  etapeparam?: IEtapeparam;

  constructor(
    protected etapeparamService: EtapeparamService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.etapeparamService.delete(id).subscribe(() => {
      this.eventManager.broadcast('etapeparamListModification');
      this.activeModal.close();
    });
  }
}
