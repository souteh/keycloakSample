import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMessageerreur, Messageerreur } from 'app/shared/model/messageerreur.model';
import { MessageerreurService } from './messageerreur.service';
import { IAction } from 'app/shared/model/action.model';
import { ActionService } from 'app/entities/action/action.service';

@Component({
  selector: 'jhi-messageerreur-update',
  templateUrl: './messageerreur-update.component.html',
})
export class MessageerreurUpdateComponent implements OnInit {
  isSaving = false;
  actions: IAction[] = [];

  editForm = this.fb.group({
    id: [],
    idmessage: [null, [Validators.required]],
    description: [null, [Validators.maxLength(254)]],
    idaction: [],
  });

  constructor(
    protected messageerreurService: MessageerreurService,
    protected actionService: ActionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ messageerreur }) => {
      this.updateForm(messageerreur);

      this.actionService.query().subscribe((res: HttpResponse<IAction[]>) => (this.actions = res.body || []));
    });
  }

  updateForm(messageerreur: IMessageerreur): void {
    this.editForm.patchValue({
      id: messageerreur.id,
      idmessage: messageerreur.idmessage,
      description: messageerreur.description,
      idaction: messageerreur.idaction,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const messageerreur = this.createFromForm();
    if (messageerreur.id !== undefined) {
      this.subscribeToSaveResponse(this.messageerreurService.update(messageerreur));
    } else {
      this.subscribeToSaveResponse(this.messageerreurService.create(messageerreur));
    }
  }

  private createFromForm(): IMessageerreur {
    return {
      ...new Messageerreur(),
      id: this.editForm.get(['id'])!.value,
      idmessage: this.editForm.get(['idmessage'])!.value,
      description: this.editForm.get(['description'])!.value,
      idaction: this.editForm.get(['idaction'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessageerreur>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IAction): any {
    return item.id;
  }
}
