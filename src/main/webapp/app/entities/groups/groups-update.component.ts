import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IGroups, Groups } from 'app/shared/model/groups.model';
import { GroupsService } from './groups.service';
import { IFaculties } from 'app/shared/model/faculties.model';
import { FacultiesService } from 'app/entities/faculties/faculties.service';

@Component({
  selector: 'jhi-groups-update',
  templateUrl: './groups-update.component.html'
})
export class GroupsUpdateComponent implements OnInit {
  isSaving = false;

  faculties: IFaculties[] = [];

  editForm = this.fb.group({
    id: [],
    nameGroup: [],
    faculty: []
  });

  constructor(
    protected groupsService: GroupsService,
    protected facultiesService: FacultiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groups }) => {
      this.updateForm(groups);

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

  updateForm(groups: IGroups): void {
    this.editForm.patchValue({
      id: groups.id,
      nameGroup: groups.nameGroup,
      faculty: groups.faculty
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const groups = this.createFromForm();
    if (groups.id !== undefined) {
      this.subscribeToSaveResponse(this.groupsService.update(groups));
    } else {
      this.subscribeToSaveResponse(this.groupsService.create(groups));
    }
  }

  private createFromForm(): IGroups {
    return {
      ...new Groups(),
      id: this.editForm.get(['id'])!.value,
      nameGroup: this.editForm.get(['nameGroup'])!.value,
      faculty: this.editForm.get(['faculty'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroups>>): void {
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
