import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IClients, Clients } from 'app/shared/model/clients.model';
import { ClientsService } from './clients.service';
import { IGroups } from 'app/shared/model/groups.model';
import { GroupsService } from 'app/entities/groups/groups.service';
import { IRoles } from 'app/shared/model/roles.model';
import { RolesService } from 'app/entities/roles/roles.service';

type SelectableEntity = IGroups | IRoles;

@Component({
  selector: 'jhi-clients-update',
  templateUrl: './clients-update.component.html'
})
export class ClientsUpdateComponent implements OnInit {
  isSaving = false;

  groups: IGroups[] = [];

  roles: IRoles[] = [];

  editForm = this.fb.group({
    id: [],
    surname: [],
    name: [],
    patronymic: [],
    phone: [],
    groups: [],
    role: []
  });

  constructor(
    protected clientsService: ClientsService,
    protected groupsService: GroupsService,
    protected rolesService: RolesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clients }) => {
      this.updateForm(clients);

      this.groupsService
        .query()
        .pipe(
          map((res: HttpResponse<IGroups[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IGroups[]) => (this.groups = resBody));

      this.rolesService
        .query()
        .pipe(
          map((res: HttpResponse<IRoles[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IRoles[]) => (this.roles = resBody));
    });
  }

  updateForm(clients: IClients): void {
    this.editForm.patchValue({
      id: clients.id,
      surname: clients.surname,
      name: clients.name,
      patronymic: clients.patronymic,
      phone: clients.phone,
      groups: clients.groups,
      role: clients.role
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clients = this.createFromForm();
    if (clients.id !== undefined) {
      this.subscribeToSaveResponse(this.clientsService.update(clients));
    } else {
      this.subscribeToSaveResponse(this.clientsService.create(clients));
    }
  }

  private createFromForm(): IClients {
    return {
      ...new Clients(),
      id: this.editForm.get(['id'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      name: this.editForm.get(['name'])!.value,
      patronymic: this.editForm.get(['patronymic'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      groups: this.editForm.get(['groups'])!.value,
      role: this.editForm.get(['role'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClients>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
