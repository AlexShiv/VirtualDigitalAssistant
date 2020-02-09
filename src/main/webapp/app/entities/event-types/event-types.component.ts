import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEventTypes } from 'app/shared/model/event-types.model';
import { EventTypesService } from './event-types.service';
import { EventTypesDeleteDialogComponent } from './event-types-delete-dialog.component';

@Component({
  selector: 'jhi-event-types',
  templateUrl: './event-types.component.html'
})
export class EventTypesComponent implements OnInit, OnDestroy {
  eventTypes?: IEventTypes[];
  eventSubscriber?: Subscription;

  constructor(protected eventTypesService: EventTypesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.eventTypesService.query().subscribe((res: HttpResponse<IEventTypes[]>) => {
      this.eventTypes = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEventTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEventTypes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEventTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('eventTypesListModification', () => this.loadAll());
  }

  delete(eventTypes: IEventTypes): void {
    const modalRef = this.modalService.open(EventTypesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.eventTypes = eventTypes;
  }
}
