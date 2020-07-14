import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActionparam } from 'app/shared/model/actionparam.model';

@Component({
  selector: 'jhi-actionparam-detail',
  templateUrl: './actionparam-detail.component.html',
})
export class ActionparamDetailComponent implements OnInit {
  actionparam: IActionparam | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ actionparam }) => (this.actionparam = actionparam));
  }

  previousState(): void {
    window.history.back();
  }
}
