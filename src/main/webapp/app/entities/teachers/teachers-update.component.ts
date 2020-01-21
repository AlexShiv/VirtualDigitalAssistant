import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITeachers, Teachers } from 'app/shared/model/teachers.model';
import { TeachersService } from './teachers.service';
import { IFaculties } from 'app/shared/model/faculties.model';
import { FacultiesService } from 'app/entities/faculties/faculties.service';

@Component({
  selector: 'jhi-teachers-update',
  templateUrl: './teachers-update.component.html'
})
export class TeachersUpdateComponent implements OnInit {
  isSaving = false;

  faculties: IFaculties[] = [];

  editForm = this.fb.group({
    id: [],
    surname: [],
    name: [],
    patronymic: [],
    isDecan: [],
    faculties: []
  });

  constructor(
    protected teachersService: TeachersService,
    protected facultiesService: FacultiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teachers }) => {
      this.updateForm(teachers);

      this.facultiesService
        .query()
        .pipe(
          map((res: HttpResponse<IFaculties[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IFaculties[]) => (this.faculties = resBody));
    });
  }

  updateForm(teachers: ITeachers): void {
    this.editForm.patchValue({
      id: teachers.id,
      surname: teachers.surname,
      name: teachers.name,
      patronymic: teachers.patronymic,
      isDecan: teachers.isDecan,
      faculties: teachers.faculties
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const teachers = this.createFromForm();
    if (teachers.id !== undefined) {
      this.subscribeToSaveResponse(this.teachersService.update(teachers));
    } else {
      this.subscribeToSaveResponse(this.teachersService.create(teachers));
    }
  }

  private createFromForm(): ITeachers {
    return {
      ...new Teachers(),
      id: this.editForm.get(['id'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      name: this.editForm.get(['name'])!.value,
      patronymic: this.editForm.get(['patronymic'])!.value,
      isDecan: this.editForm.get(['isDecan'])!.value,
      faculties: this.editForm.get(['faculties'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeachers>>): void {
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

  trackById(index: number, item: IFaculties): any {
    return item.id;
  }
}
