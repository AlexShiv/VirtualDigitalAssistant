import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFaculties, Faculties } from 'app/shared/model/faculties.model';
import { FacultiesService } from './faculties.service';

@Component({
  selector: 'jhi-faculties-update',
  templateUrl: './faculties-update.component.html'
})
export class FacultiesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nameFaculty: []
  });

  constructor(protected facultiesService: FacultiesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ faculties }) => {
      this.updateForm(faculties);
    });
  }

  updateForm(faculties: IFaculties): void {
    this.editForm.patchValue({
      id: faculties.id,
      nameFaculty: faculties.nameFaculty
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const faculties = this.createFromForm();
    if (faculties.id !== undefined) {
      this.subscribeToSaveResponse(this.facultiesService.update(faculties));
    } else {
      this.subscribeToSaveResponse(this.facultiesService.create(faculties));
    }
  }

  private createFromForm(): IFaculties {
    return {
      ...new Faculties(),
      id: this.editForm.get(['id'])!.value,
      nameFaculty: this.editForm.get(['nameFaculty'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFaculties>>): void {
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
