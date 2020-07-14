import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMessageerreur } from 'app/shared/model/messageerreur.model';

@Component({
  selector: 'jhi-messageerreur-detail',
  templateUrl: './messageerreur-detail.component.html',
})
export class MessageerreurDetailComponent implements OnInit {
  messageerreur: IMessageerreur | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ messageerreur }) => (this.messageerreur = messageerreur));
  }

  previousState(): void {
    window.history.back();
  }
}
