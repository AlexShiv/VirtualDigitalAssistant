import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStatPopularCategories, StatPopularCategories } from 'app/shared/model/stat-popular-categories.model';
import { StatPopularCategoriesService } from './stat-popular-categories.service';

@Component({
  selector: 'jhi-stat-popular-categories-update',
  templateUrl: './stat-popular-categories-update.component.html'
})
export class StatPopularCategoriesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nameCategory: [],
    countAnswers: []
  });

  constructor(
    protected statPopularCategoriesService: StatPopularCategoriesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ statPopularCategories }) => {
      this.updateForm(statPopularCategories);
    });
  }

  updateForm(statPopularCategories: IStatPopularCategories): void {
    this.editForm.patchValue({
      id: statPopularCategories.id,
      nameCategory: statPopularCategories.nameCategory,
      countAnswers: statPopularCategories.countAnswers
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const statPopularCategories = this.createFromForm();
    if (statPopularCategories.id !== undefined) {
      this.subscribeToSaveResponse(this.statPopularCategoriesService.update(statPopularCategories));
    } else {
      this.subscribeToSaveResponse(this.statPopularCategoriesService.create(statPopularCategories));
    }
  }

  private createFromForm(): IStatPopularCategories {
    return {
      ...new StatPopularCategories(),
      id: this.editForm.get(['id'])!.value,
      nameCategory: this.editForm.get(['nameCategory'])!.value,
      countAnswers: this.editForm.get(['countAnswers'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatPopularCategories>>): void {
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
