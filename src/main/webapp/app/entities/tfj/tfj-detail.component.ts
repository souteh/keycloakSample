import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITfj } from 'app/shared/model/tfj.model';

@Component({
  selector: 'jhi-tfj-detail',
  templateUrl: './tfj-detail.component.html',
})
export class TfjDetailComponent implements OnInit {
  tfj: ITfj | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tfj }) => (this.tfj = tfj));
  }

  previousState(): void {
    window.history.back();
  }
}
