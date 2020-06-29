import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStatCorrectAnswers, StatCorrectAnswers } from 'app/shared/model/stat-correct-answers.model';
import { StatCorrectAnswersService } from './stat-correct-answers.service';
import { StatCorrectAnswersComponent } from './stat-correct-answers.component';
import { StatCorrectAnswersDetailComponent } from './stat-correct-answers-detail.component';
import { StatCorrectAnswersUpdateComponent } from './stat-correct-answers-update.component';

@Injectable({ providedIn: 'root' })
export class StatCorrectAnswersResolve implements Resolve<IStatCorrectAnswers> {
  constructor(private service: StatCorrectAnswersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStatCorrectAnswers> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((statCorrectAnswers: HttpResponse<StatCorrectAnswers>) => {
          if (statCorrectAnswers.body) {
            return of(statCorrectAnswers.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StatCorrectAnswers());
  }
}

export const statCorrectAnswersRoute: Routes = [
  {
    path: '',
    component: StatCorrectAnswersComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.statCorrectAnswers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StatCorrectAnswersDetailComponent,
    resolve: {
      statCorrectAnswers: StatCorrectAnswersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.statCorrectAnswers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StatCorrectAnswersUpdateComponent,
    resolve: {
      statCorrectAnswers: StatCorrectAnswersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.statCorrectAnswers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StatCorrectAnswersUpdateComponent,
    resolve: {
      statCorrectAnswers: StatCorrectAnswersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.statCorrectAnswers.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
