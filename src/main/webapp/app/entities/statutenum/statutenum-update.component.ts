import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStatutenum, Statutenum } from 'app/shared/model/statutenum.model';
import { StatutenumService } from './statutenum.service';

@Component({
  selector: 'jhi-statutenum-update',
  templateUrl: './statutenum-update.component.html',
})
export class StatutenumUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idstatut: [],
    libellestatut: [null, [Validators.maxLength(254)]],
    codestatut: [null, [Validators.maxLength(254)]],
  });

  constructor(protected statutenumService: StatutenumService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ statutenum }) => {
      this.updateForm(statutenum);
    });
  }

  updateForm(statutenum: IStatutenum): void {
    this.editForm.patchValue({
      id: statutenum.id,
      idstatut: statutenum.idstatut,
      libellestatut: statutenum.libellestatut,
      codestatut: statutenum.codestatut,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const statutenum = this.createFromForm();
    if (statutenum.id !== undefined) {
      this.subscribeToSaveResponse(this.statutenumService.update(statutenum));
    } else {
      this.subscribeToSaveResponse(this.statutenumService.create(statutenum));
    }
  }

  private createFromForm(): IStatutenum {
    return {
      ...new Statutenum(),
      id: this.editForm.get(['id'])!.value,
      idstatut: this.editForm.get(['idstatut'])!.value,
      libellestatut: this.editForm.get(['libellestatut'])!.value,
      codestatut: this.editForm.get(['codestatut'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatutenum>>): void {
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
