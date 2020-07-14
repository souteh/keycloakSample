import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEtape, Etape } from 'app/shared/model/etape.model';
import { EtapeService } from './etape.service';
import { ITfj } from 'app/shared/model/tfj.model';
import { TfjService } from 'app/entities/tfj/tfj.service';

@Component({
  selector: 'jhi-etape-update',
  templateUrl: './etape-update.component.html',
})
export class EtapeUpdateComponent implements OnInit {
  isSaving = false;
  tfjs: ITfj[] = [];

  editForm = this.fb.group({
    id: [],
    idetape: [null, [Validators.required]],
    libelleetape: [null, [Validators.maxLength(254)]],
    statutetape: [null, [Validators.maxLength(254)]],
    heureexecutionetape: [null, [Validators.maxLength(254)]],
    codeetape: [null, [Validators.maxLength(254)]],
    idtfj: [],
  });

  constructor(
    protected etapeService: EtapeService,
    protected tfjService: TfjService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etape }) => {
      this.updateForm(etape);

      this.tfjService.query().subscribe((res: HttpResponse<ITfj[]>) => (this.tfjs = res.body || []));
    });
  }

  updateForm(etape: IEtape): void {
    this.editForm.patchValue({
      id: etape.id,
      idetape: etape.idetape,
      libelleetape: etape.libelleetape,
      statutetape: etape.statutetape,
      heureexecutionetape: etape.heureexecutionetape,
      codeetape: etape.codeetape,
      idtfj: etape.idtfj,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etape = this.createFromForm();
    if (etape.id !== undefined) {
      this.subscribeToSaveResponse(this.etapeService.update(etape));
    } else {
      this.subscribeToSaveResponse(this.etapeService.create(etape));
    }
  }

  private createFromForm(): IEtape {
    return {
      ...new Etape(),
      id: this.editForm.get(['id'])!.value,
      idetape: this.editForm.get(['idetape'])!.value,
      libelleetape: this.editForm.get(['libelleetape'])!.value,
      statutetape: this.editForm.get(['statutetape'])!.value,
      heureexecutionetape: this.editForm.get(['heureexecutionetape'])!.value,
      codeetape: this.editForm.get(['codeetape'])!.value,
      idtfj: this.editForm.get(['idtfj'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtape>>): void {
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

  trackById(index: number, item: ITfj): any {
    return item.id;
  }
}
