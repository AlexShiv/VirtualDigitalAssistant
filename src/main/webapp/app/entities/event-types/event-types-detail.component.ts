import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEventTypes } from 'app/shared/model/event-types.model';

@Component({
  selector: 'jhi-event-types-detail',
  templateUrl: './event-types-detail.component.html'
})
export class EventTypesDetailComponent implements OnInit {
  eventTypes: IEventTypes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eventTypes }) => {
      this.eventTypes = eventTypes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
