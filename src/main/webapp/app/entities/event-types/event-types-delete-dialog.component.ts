import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEventTypes } from 'app/shared/model/event-types.model';
import { EventTypesService } from './event-types.service';

@Component({
  templateUrl: './event-types-delete-dialog.component.html'
})
export class EventTypesDeleteDialogComponent {
  eventTypes?: IEventTypes;

  constructor(
    protected eventTypesService: EventTypesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.eventTypesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('eventTypesListModification');
      this.activeModal.close();
    });
  }
}
