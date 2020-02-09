import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITeachers, Teachers } from 'app/shared/model/teachers.model';
import { TeachersService } from './teachers.service';
import { TeachersComponent } from './teachers.component';
import { TeachersDetailComponent } from './teachers-detail.component';
import { TeachersUpdateComponent } from './teachers-update.component';

@Injectable({ providedIn: 'root' })
export class TeachersResolve implements Resolve<ITeachers> {
  constructor(private service: TeachersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITeachers> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((teachers: HttpResponse<Teachers>) => {
          if (teachers.body) {
            return of(teachers.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Teachers());
  }
}

export const teachersRoute: Routes = [
  {
    path: '',
    component: TeachersComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.teachers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TeachersDetailComponent,
    resolve: {
      teachers: TeachersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.teachers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TeachersUpdateComponent,
    resolve: {
      teachers: TeachersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.teachers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TeachersUpdateComponent,
    resolve: {
      teachers: TeachersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.teachers.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
