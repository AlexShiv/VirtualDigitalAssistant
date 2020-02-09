import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGroups } from 'app/shared/model/groups.model';

type EntityResponseType = HttpResponse<IGroups>;
type EntityArrayResponseType = HttpResponse<IGroups[]>;

@Injectable({ providedIn: 'root' })
export class GroupsService {
  public resourceUrl = SERVER_API_URL + 'api/groups';

  constructor(protected http: HttpClient) {}

  create(groups: IGroups): Observable<EntityResponseType> {
    return this.http.post<IGroups>(this.resourceUrl, groups, { observe: 'response' });
  }

  update(groups: IGroups): Observable<EntityResponseType> {
    return this.http.put<IGroups>(this.resourceUrl, groups, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGroups>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGroups[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
