import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEvents } from 'app/shared/model/events.model';
import { EventsService } from './events.service';
import { EventsDeleteDialogComponent } from './events-delete-dialog.component';

@Component({
  selector: 'jhi-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit, OnDestroy {
  events?: IEvents[];
  eventSubscriber?: Subscription;

  constructor(protected eventsService: EventsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.eventsService.query().subscribe((res: HttpResponse<IEvents[]>) => {
      this.events = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEvents): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEvents(): void {
    this.eventSubscriber = this.eventManager.subscribe('eventsListModification', () => this.loadAll());
  }

  delete(events: IEvents): void {
    const modalRef = this.modalService.open(EventsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.events = events;
  }
}
