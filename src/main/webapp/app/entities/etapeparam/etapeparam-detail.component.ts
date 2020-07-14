import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtapeparam } from 'app/shared/model/etapeparam.model';

@Component({
  selector: 'jhi-etapeparam-detail',
  templateUrl: './etapeparam-detail.component.html',
})
export class EtapeparamDetailComponent implements OnInit {
  etapeparam: IEtapeparam | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etapeparam }) => (this.etapeparam = etapeparam));
  }

  previousState(): void {
    window.history.back();
  }
}
