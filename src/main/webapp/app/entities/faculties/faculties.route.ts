import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFaculties, Faculties } from 'app/shared/model/faculties.model';
import { FacultiesService } from './faculties.service';
import { FacultiesComponent } from './faculties.component';
import { FacultiesDetailComponent } from './faculties-detail.component';
import { FacultiesUpdateComponent } from './faculties-update.component';

@Injectable({ providedIn: 'root' })
export class FacultiesResolve implements Resolve<IFaculties> {
  constructor(private service: FacultiesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFaculties> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((faculties: HttpResponse<Faculties>) => {
          if (faculties.body) {
            return of(faculties.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Faculties());
  }
}

export const facultiesRoute: Routes = [
  {
    path: '',
    component: FacultiesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.faculties.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FacultiesDetailComponent,
    resolve: {
      faculties: FacultiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.faculties.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FacultiesUpdateComponent,
    resolve: {
      faculties: FacultiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.faculties.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FacultiesUpdateComponent,
    resolve: {
      faculties: FacultiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.faculties.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
