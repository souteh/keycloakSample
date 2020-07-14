import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITfj, Tfj } from 'app/shared/model/tfj.model';
import { TfjService } from './tfj.service';

@Component({
  selector: 'jhi-tfj-update',
  templateUrl: './tfj-update.component.html',
})
export class TfjUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idtfj: [null, [Validators.required]],
    datetfj: [],
    statuttfj: [null, [Validators.maxLength(254)]],
  });

  constructor(protected tfjService: TfjService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tfj }) => {
      if (!tfj.id) {
        const today = moment().startOf('day');
        tfj.datetfj = today;
      }

      this.updateForm(tfj);
    });
  }

  updateForm(tfj: ITfj): void {
    this.editForm.patchValue({
      id: tfj.id,
      idtfj: tfj.idtfj,
      datetfj: tfj.datetfj ? tfj.datetfj.format(DATE_TIME_FORMAT) : null,
      statuttfj: tfj.statuttfj,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tfj = this.createFromForm();
    if (tfj.id !== undefined) {
      this.subscribeToSaveResponse(this.tfjService.update(tfj));
    } else {
      this.subscribeToSaveResponse(this.tfjService.create(tfj));
    }
  }

  private createFromForm(): ITfj {
    return {
      ...new Tfj(),
      id: this.editForm.get(['id'])!.value,
      idtfj: this.editForm.get(['idtfj'])!.value,
      datetfj: this.editForm.get(['datetfj'])!.value ? moment(this.editForm.get(['datetfj'])!.value, DATE_TIME_FORMAT) : undefined,
      statuttfj: this.editForm.get(['statuttfj'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITfj>>): void {
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
