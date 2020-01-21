import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEvents } from 'app/shared/model/events.model';
import { EventsService } from './events.service';

@Component({
  templateUrl: './events-delete-dialog.component.html'
})
export class EventsDeleteDialogComponent {
  events?: IEvents;

  constructor(protected eventsService: EventsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.eventsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('eventsListModification');
      this.activeModal.close();
    });
  }
}
