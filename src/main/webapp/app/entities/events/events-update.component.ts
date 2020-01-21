import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEvents, Events } from 'app/shared/model/events.model';
import { EventsService } from './events.service';
import { IClients } from 'app/shared/model/clients.model';
import { ClientsService } from 'app/entities/clients/clients.service';
import { IEventTypes } from 'app/shared/model/event-types.model';
import { EventTypesService } from 'app/entities/event-types/event-types.service';

type SelectableEntity = IClients | IEventTypes;

@Component({
  selector: 'jhi-events-update',
  templateUrl: './events-update.component.html'
})
export class EventsUpdateComponent implements OnInit {
  isSaving = false;

  clients: IClients[] = [];

  eventtypes: IEventTypes[] = [];

  editForm = this.fb.group({
    id: [],
    nameEvent: [],
    description: [],
    beginDate: [],
    endDate: [],
    client: [],
    eventTypes: []
  });

  constructor(
    protected eventsService: EventsService,
    protected clientsService: ClientsService,
    protected eventTypesService: EventTypesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ events }) => {
      this.updateForm(events);

      this.clientsService
        .query({ filter: 'events-is-null' })
        .pipe(
          map((res: HttpResponse<IClients[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IClients[]) => {
          if (!events.client || !events.client.id) {
            this.clients = resBody;
          } else {
            this.clientsService
              .find(events.client.id)
              .pipe(
                map((subRes: HttpResponse<IClients>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IClients[]) => {
                this.clients = concatRes;
              });
          }
        });

      this.eventTypesService
        .query()
        .pipe(
          map((res: HttpResponse<IEventTypes[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEventTypes[]) => (this.eventtypes = resBody));
    });
  }

  updateForm(events: IEvents): void {
    this.editForm.patchValue({
      id: events.id,
      nameEvent: events.nameEvent,
      description: events.description,
      beginDate: events.beginDate != null ? events.beginDate.format(DATE_TIME_FORMAT) : null,
      endDate: events.endDate != null ? events.endDate.format(DATE_TIME_FORMAT) : null,
      client: events.client,
      eventTypes: events.eventTypes
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const events = this.createFromForm();
    if (events.id !== undefined) {
      this.subscribeToSaveResponse(this.eventsService.update(events));
    } else {
      this.subscribeToSaveResponse(this.eventsService.create(events));
    }
  }

  private createFromForm(): IEvents {
    return {
      ...new Events(),
      id: this.editForm.get(['id'])!.value,
      nameEvent: this.editForm.get(['nameEvent'])!.value,
      description: this.editForm.get(['description'])!.value,
      beginDate:
        this.editForm.get(['beginDate'])!.value != null ? moment(this.editForm.get(['beginDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value != null ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      client: this.editForm.get(['client'])!.value,
      eventTypes: this.editForm.get(['eventTypes'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvents>>): void {
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
