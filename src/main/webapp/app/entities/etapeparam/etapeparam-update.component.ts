import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEtapeparam, Etapeparam } from 'app/shared/model/etapeparam.model';
import { EtapeparamService } from './etapeparam.service';

@Component({
  selector: 'jhi-etapeparam-update',
  templateUrl: './etapeparam-update.component.html',
})
export class EtapeparamUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idetapeparam: [null, [Validators.required]],
    libelleetapeparam: [null, [Validators.maxLength(254)]],
    codeetapeparam: [null, [Validators.maxLength(254)]],
  });

  constructor(protected etapeparamService: EtapeparamService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etapeparam }) => {
      this.updateForm(etapeparam);
    });
  }

  updateForm(etapeparam: IEtapeparam): void {
    this.editForm.patchValue({
      id: etapeparam.id,
      idetapeparam: etapeparam.idetapeparam,
      libelleetapeparam: etapeparam.libelleetapeparam,
      codeetapeparam: etapeparam.codeetapeparam,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etapeparam = this.createFromForm();
    if (etapeparam.id !== undefined) {
      this.subscribeToSaveResponse(this.etapeparamService.update(etapeparam));
    } else {
      this.subscribeToSaveResponse(this.etapeparamService.create(etapeparam));
    }
  }

  private createFromForm(): IEtapeparam {
    return {
      ...new Etapeparam(),
      id: this.editForm.get(['id'])!.value,
      idetapeparam: this.editForm.get(['idetapeparam'])!.value,
      libelleetapeparam: this.editForm.get(['libelleetapeparam'])!.value,
      codeetapeparam: this.editForm.get(['codeetapeparam'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtapeparam>>): void {
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
}
