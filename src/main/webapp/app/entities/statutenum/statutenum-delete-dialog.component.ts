import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStatutenum } from 'app/shared/model/statutenum.model';
import { StatutenumService } from './statutenum.service';

@Component({
  templateUrl: './statutenum-delete-dialog.component.html',
})
export class StatutenumDeleteDialogComponent {
  statutenum?: IStatutenum;

  constructor(
    protected statutenumService: StatutenumService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.statutenumService.delete(id).subscribe(() => {
      this.eventManager.broadcast('statutenumListModification');
      this.activeModal.close();
    });
  }
}
