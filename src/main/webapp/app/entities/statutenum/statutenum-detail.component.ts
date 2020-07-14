import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStatutenum } from 'app/shared/model/statutenum.model';

@Component({
  selector: 'jhi-statutenum-detail',
  templateUrl: './statutenum-detail.component.html',
})
export class StatutenumDetailComponent implements OnInit {
  statutenum: IStatutenum | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ statutenum }) => (this.statutenum = statutenum));
  }

  previousState(): void {
    window.history.back();
  }
}
