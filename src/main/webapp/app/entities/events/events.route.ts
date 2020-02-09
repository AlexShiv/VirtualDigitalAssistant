import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEvents, Events } from 'app/shared/model/events.model';
import { EventsService } from './events.service';
import { EventsComponent } from './events.component';
import { EventsDetailComponent } from './events-detail.component';
import { EventsUpdateComponent } from './events-update.component';

@Injectable({ providedIn: 'root' })
export class EventsResolve implements Resolve<IEvents> {
  constructor(private service: EventsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEvents> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((events: HttpResponse<Events>) => {
          if (events.body) {
            return of(events.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Events());
  }
}

export const eventsRoute: Routes = [
  {
    path: '',
    component: EventsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.events.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EventsDetailComponent,
    resolve: {
      events: EventsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.events.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EventsUpdateComponent,
    resolve: {
      events: EventsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.events.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EventsUpdateComponent,
    resolve: {
      events: EventsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.events.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
