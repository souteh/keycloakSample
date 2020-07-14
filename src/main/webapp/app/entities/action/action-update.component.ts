import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAction, Action } from 'app/shared/model/action.model';
import { ActionService } from './action.service';
import { IEtape } from 'app/shared/model/etape.model';
import { EtapeService } from 'app/entities/etape/etape.service';

@Component({
  selector: 'jhi-action-update',
  templateUrl: './action-update.component.html',
})
export class ActionUpdateComponent implements OnInit {
  isSaving = false;
  etapes: IEtape[] = [];

  editForm = this.fb.group({
    id: [],
    idaction: [null, [Validators.required]],
    libelleaction: [null, [Validators.maxLength(254)]],
    statutaction: [null, [Validators.maxLength(254)]],
    codeaction: [null, [Validators.maxLength(254)]],
    idetape: [],
  });

  constructor(
    protected actionService: ActionService,
    protected etapeService: EtapeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ action }) => {
      this.updateForm(action);

      this.etapeService.query().subscribe((res: HttpResponse<IEtape[]>) => (this.etapes = res.body || []));
    });
  }

  updateForm(action: IAction): void {
    this.editForm.patchValue({
      id: action.id,
      idaction: action.idaction,
      libelleaction: action.libelleaction,
      statutaction: action.statutaction,
      codeaction: action.codeaction,
      idetape: action.idetape,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const action = this.createFromForm();
    if (action.id !== undefined) {
      this.subscribeToSaveResponse(this.actionService.update(action));
    } else {
      this.subscribeToSaveResponse(this.actionService.create(action));
    }
  }

  private createFromForm(): IAction {
    return {
      ...new Action(),
      id: this.editForm.get(['id'])!.value,
      idaction: this.editForm.get(['idaction'])!.value,
      libelleaction: this.editForm.get(['libelleaction'])!.value,
      statutaction: this.editForm.get(['statutaction'])!.value,
      codeaction: this.editForm.get(['codeaction'])!.value,
      idetape: this.editForm.get(['idetape'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAction>>): void {
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

  trackById(index: number, item: IEtape): any {
    return item.id;
  }
}
