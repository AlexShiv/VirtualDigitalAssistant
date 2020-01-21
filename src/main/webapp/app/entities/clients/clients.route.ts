import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClients, Clients } from 'app/shared/model/clients.model';
import { ClientsService } from './clients.service';
import { ClientsComponent } from './clients.component';
import { ClientsDetailComponent } from './clients-detail.component';
import { ClientsUpdateComponent } from './clients-update.component';

@Injectable({ providedIn: 'root' })
export class ClientsResolve implements Resolve<IClients> {
  constructor(private service: ClientsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClients> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((clients: HttpResponse<Clients>) => {
          if (clients.body) {
            return of(clients.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Clients());
  }
}

export const clientsRoute: Routes = [
  {
    path: '',
    component: ClientsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.clients.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClientsDetailComponent,
    resolve: {
      clients: ClientsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.clients.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClientsUpdateComponent,
    resolve: {
      clients: ClientsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.clients.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClientsUpdateComponent,
    resolve: {
      clients: ClientsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.clients.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
