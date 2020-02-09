import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEventTypes, EventTypes } from 'app/shared/model/event-types.model';
import { EventTypesService } from './event-types.service';

@Component({
  selector: 'jhi-event-types-update',
  templateUrl: './event-types-update.component.html'
})
export class EventTypesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nameEventType: []
  });

  constructor(protected eventTypesService: EventTypesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eventTypes }) => {
      this.updateForm(eventTypes);
    });
  }

  updateForm(eventTypes: IEventTypes): void {
    this.editForm.patchValue({
      id: eventTypes.id,
      nameEventType: eventTypes.nameEventType
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const eventTypes = this.createFromForm();
    if (eventTypes.id !== undefined) {
      this.subscribeToSaveResponse(this.eventTypesService.update(eventTypes));
    } else {
      this.subscribeToSaveResponse(this.eventTypesService.create(eventTypes));
    }
  }

  private createFromForm(): IEventTypes {
    return {
      ...new EventTypes(),
      id: this.editForm.get(['id'])!.value,
      nameEventType: this.editForm.get(['nameEventType'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEventTypes>>): void {
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
