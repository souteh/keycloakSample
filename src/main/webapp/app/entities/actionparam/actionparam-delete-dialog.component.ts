import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IActionparam } from 'app/shared/model/actionparam.model';
import { ActionparamService } from './actionparam.service';

@Component({
  templateUrl: './actionparam-delete-dialog.component.html',
})
export class ActionparamDeleteDialogComponent {
  actionparam?: IActionparam;

  constructor(
    protected actionparamService: ActionparamService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.actionparamService.delete(id).subscribe(() => {
      this.eventManager.broadcast('actionparamListModification');
      this.activeModal.close();
    });
  }
}
