import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDocuments, Documents } from 'app/shared/model/documents.model';
import { DocumentsService } from './documents.service';
import { DocumentsComponent } from './documents.component';
import { DocumentsDetailComponent } from './documents-detail.component';
import { DocumentsUpdateComponent } from './documents-update.component';

@Injectable({ providedIn: 'root' })
export class DocumentsResolve implements Resolve<IDocuments> {
  constructor(private service: DocumentsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocuments> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((documents: HttpResponse<Documents>) => {
          if (documents.body) {
            return of(documents.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Documents());
  }
}

export const documentsRoute: Routes = [
  {
    path: '',
    component: DocumentsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.documents.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocumentsDetailComponent,
    resolve: {
      documents: DocumentsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.documents.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocumentsUpdateComponent,
    resolve: {
      documents: DocumentsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.documents.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocumentsUpdateComponent,
    resolve: {
      documents: DocumentsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'virtualDigitalAssistantApp.documents.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
