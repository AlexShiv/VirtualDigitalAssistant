import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStatCorrectAnswers, StatCorrectAnswers } from 'app/shared/model/stat-correct-answers.model';
import { StatCorrectAnswersService } from './stat-correct-answers.service';

@Component({
  selector: 'jhi-stat-correct-answers-update',
  templateUrl: './stat-correct-answers-update.component.html'
})
export class StatCorrectAnswersUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nameCriteria: [],
    countResult: []
  });

  constructor(
    protected statCorrectAnswersService: StatCorrectAnswersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ statCorrectAnswers }) => {
      this.updateForm(statCorrectAnswers);
    });
  }

  updateForm(statCorrectAnswers: IStatCorrectAnswers): void {
    this.editForm.patchValue({
      id: statCorrectAnswers.id,
      nameCriteria: statCorrectAnswers.nameCriteria,
      countResult: statCorrectAnswers.countResult
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const statCorrectAnswers = this.createFromForm();
    if (statCorrectAnswers.id !== undefined) {
      this.subscribeToSaveResponse(this.statCorrectAnswersService.update(statCorrectAnswers));
    } else {
      this.subscribeToSaveResponse(this.statCorrectAnswersService.create(statCorrectAnswers));
    }
  }

  private createFromForm(): IStatCorrectAnswers {
    return {
      ...new StatCorrectAnswers(),
      id: this.editForm.get(['id'])!.value,
      nameCriteria: this.editForm.get(['nameCriteria'])!.value,
      countResult: this.editForm.get(['countResult'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatCorrectAnswers>>): void {
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
