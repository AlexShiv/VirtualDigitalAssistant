import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStatPopularCategories } from 'app/shared/model/stat-popular-categories.model';

type EntityResponseType = HttpResponse<IStatPopularCategories>;
type EntityArrayResponseType = HttpResponse<IStatPopularCategories[]>;

@Injectable({ providedIn: 'root' })
export class StatPopularCategoriesService {
  public resourceUrl = SERVER_API_URL + 'api/stat-popular-categories';

  constructor(protected http: HttpClient) {}

  create(statPopularCategories: IStatPopularCategories): Observable<EntityResponseType> {
    return this.http.post<IStatPopularCategories>(this.resourceUrl, statPopularCategories, { observe: 'response' });
  }

  update(statPopularCategories: IStatPopularCategories): Observable<EntityResponseType> {
    return this.http.put<IStatPopularCategories>(this.resourceUrl, statPopularCategories, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStatPopularCategories>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStatPopularCategories[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
