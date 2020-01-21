import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IForms, Forms } from 'app/shared/model/forms.model';
import { FormsService } from './forms.service';
import { FormsComponent } from './forms.component';
import { FormsDetailComponent } from './forms-detail.component';
import { FormsUpdateComponent } from './forms-update.component';

@Injectable({ providedIn: 'root' })
export class FormsResolve implements Resolve<IForms> {
  constructor(private service: FormsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IForms> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((forms: HttpResponse<Forms>) => {
          if (forms.body) {
            return of(forms.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Forms());
  }
}

export const formsRoute: Routes = [
  {
    path: '',
    component: FormsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.forms.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FormsDetailComponent,
    resolve: {
      forms: FormsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.forms.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FormsUpdateComponent,
    resolve: {
      forms: FormsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.forms.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FormsUpdateComponent,
    resolve: {
      forms: FormsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.forms.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
