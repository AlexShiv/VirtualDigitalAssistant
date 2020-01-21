import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGroups, Groups } from 'app/shared/model/groups.model';
import { GroupsService } from './groups.service';
import { GroupsComponent } from './groups.component';
import { GroupsDetailComponent } from './groups-detail.component';
import { GroupsUpdateComponent } from './groups-update.component';

@Injectable({ providedIn: 'root' })
export class GroupsResolve implements Resolve<IGroups> {
  constructor(private service: GroupsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGroups> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((groups: HttpResponse<Groups>) => {
          if (groups.body) {
            return of(groups.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Groups());
  }
}

export const groupsRoute: Routes = [
  {
    path: '',
    component: GroupsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.groups.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GroupsDetailComponent,
    resolve: {
      groups: GroupsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.groups.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GroupsUpdateComponent,
    resolve: {
      groups: GroupsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.groups.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GroupsUpdateComponent,
    resolve: {
      groups: GroupsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.groups.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
