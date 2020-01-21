import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IForms, Forms } from 'app/shared/model/forms.model';
import { FormsService } from './forms.service';
import { IEvents } from 'app/shared/model/events.model';
import { EventsService } from 'app/entities/events/events.service';
import { IClients } from 'app/shared/model/clients.model';
import { ClientsService } from 'app/entities/clients/clients.service';

type SelectableEntity = IEvents | IClients;

@Component({
  selector: 'jhi-forms-update',
  templateUrl: './forms-update.component.html'
})
export class FormsUpdateComponent implements OnInit {
  isSaving = false;

  events: IEvents[] = [];

  clients: IClients[] = [];

  editForm = this.fb.group({
    id: [],
    createDate: [],
    event: [],
    client: []
  });

  constructor(
    protected formsService: FormsService,
    protected eventsService: EventsService,
    protected clientsService: ClientsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ forms }) => {
      this.updateForm(forms);

      this.eventsService
        .query()
        .pipe(
          map((res: HttpResponse<IEvents[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEvents[]) => (this.events = resBody));

      this.clientsService
        .query()
        .pipe(
          map((res: HttpResponse<IClients[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IClients[]) => (this.clients = resBody));
    });
  }

  updateForm(forms: IForms): void {
    this.editForm.patchValue({
      id: forms.id,
      createDate: forms.createDate != null ? forms.createDate.format(DATE_TIME_FORMAT) : null,
      event: forms.event,
      client: forms.client
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const forms = this.createFromForm();
    if (forms.id !== undefined) {
      this.subscribeToSaveResponse(this.formsService.update(forms));
    } else {
      this.subscribeToSaveResponse(this.formsService.create(forms));
    }
  }

  private createFromForm(): IForms {
    return {
      ...new Forms(),
      id: this.editForm.get(['id'])!.value,
      createDate:
        this.editForm.get(['createDate'])!.value != null ? moment(this.editForm.get(['createDate'])!.value, DATE_TIME_FORMAT) : undefined,
      event: this.editForm.get(['event'])!.value,
      client: this.editForm.get(['client'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IForms>>): void {
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
