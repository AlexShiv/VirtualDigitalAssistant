import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStatPopularCategories, StatPopularCategories } from 'app/shared/model/stat-popular-categories.model';
import { StatPopularCategoriesService } from './stat-popular-categories.service';
import { StatPopularCategoriesComponent } from './stat-popular-categories.component';
import { StatPopularCategoriesDetailComponent } from './stat-popular-categories-detail.component';
import { StatPopularCategoriesUpdateComponent } from './stat-popular-categories-update.component';

@Injectable({ providedIn: 'root' })
export class StatPopularCategoriesResolve implements Resolve<IStatPopularCategories> {
  constructor(private service: StatPopularCategoriesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStatPopularCategories> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((statPopularCategories: HttpResponse<StatPopularCategories>) => {
          if (statPopularCategories.body) {
            return of(statPopularCategories.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StatPopularCategories());
  }
}

export const statPopularCategoriesRoute: Routes = [
  {
    path: '',
    component: StatPopularCategoriesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.statPopularCategories.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StatPopularCategoriesDetailComponent,
    resolve: {
      statPopularCategories: StatPopularCategoriesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.statPopularCategories.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StatPopularCategoriesUpdateComponent,
    resolve: {
      statPopularCategories: StatPopularCategoriesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.statPopularCategories.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StatPopularCategoriesUpdateComponent,
    resolve: {
      statPopularCategories: StatPopularCategoriesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.statPopularCategories.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
