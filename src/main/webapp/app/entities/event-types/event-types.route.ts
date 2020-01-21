import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEventTypes, EventTypes } from 'app/shared/model/event-types.model';
import { EventTypesService } from './event-types.service';
import { EventTypesComponent } from './event-types.component';
import { EventTypesDetailComponent } from './event-types-detail.component';
import { EventTypesUpdateComponent } from './event-types-update.component';

@Injectable({ providedIn: 'root' })
export class EventTypesResolve implements Resolve<IEventTypes> {
  constructor(private service: EventTypesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEventTypes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((eventTypes: HttpResponse<EventTypes>) => {
          if (eventTypes.body) {
            return of(eventTypes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EventTypes());
  }
}

export const eventTypesRoute: Routes = [
  {
    path: '',
    component: EventTypesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.eventTypes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EventTypesDetailComponent,
    resolve: {
      eventTypes: EventTypesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.eventTypes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EventTypesUpdateComponent,
    resolve: {
      eventTypes: EventTypesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.eventTypes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EventTypesUpdateComponent,
    resolve: {
      eventTypes: EventTypesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.eventTypes.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
