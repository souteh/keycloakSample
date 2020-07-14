import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IActionparam, Actionparam } from 'app/shared/model/actionparam.model';
import { ActionparamService } from './actionparam.service';
import { IEtapeparam } from 'app/shared/model/etapeparam.model';
import { EtapeparamService } from 'app/entities/etapeparam/etapeparam.service';

@Component({
  selector: 'jhi-actionparam-update',
  templateUrl: './actionparam-update.component.html',
})
export class ActionparamUpdateComponent implements OnInit {
  isSaving = false;
  etapeparams: IEtapeparam[] = [];

  editForm = this.fb.group({
    id: [],
    idactionparam: [null, [Validators.required]],
    libelleactionparam: [null, [Validators.maxLength(254)]],
    codeactionparam: [null, [Validators.maxLength(254)]],
    idetapeparam: [],
  });

  constructor(
    protected actionparamService: ActionparamService,
    protected etapeparamService: EtapeparamService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ actionparam }) => {
      this.updateForm(actionparam);

      this.etapeparamService.query().subscribe((res: HttpResponse<IEtapeparam[]>) => (this.etapeparams = res.body || []));
    });
  }

  updateForm(actionparam: IActionparam): void {
    this.editForm.patchValue({
      id: actionparam.id,
      idactionparam: actionparam.idactionparam,
      libelleactionparam: actionparam.libelleactionparam,
      codeactionparam: actionparam.codeactionparam,
      idetapeparam: actionparam.idetapeparam,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const actionparam = this.createFromForm();
    if (actionparam.id !== undefined) {
      this.subscribeToSaveResponse(this.actionparamService.update(actionparam));
    } else {
      this.subscribeToSaveResponse(this.actionparamService.create(actionparam));
    }
  }

  private createFromForm(): IActionparam {
    return {
      ...new Actionparam(),
      id: this.editForm.get(['id'])!.value,
      idactionparam: this.editForm.get(['idactionparam'])!.value,
      libelleactionparam: this.editForm.get(['libelleactionparam'])!.value,
      codeactionparam: this.editForm.get(['codeactionparam'])!.value,
      idetapeparam: this.editForm.get(['idetapeparam'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActionparam>>): void {
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

  trackById(index: number, item: IEtapeparam): any {
    return item.id;
  }
}
