import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEventTypes } from 'app/shared/model/event-types.model';

type EntityResponseType = HttpResponse<IEventTypes>;
type EntityArrayResponseType = HttpResponse<IEventTypes[]>;

@Injectable({ providedIn: 'root' })
export class EventTypesService {
  public resourceUrl = SERVER_API_URL + 'api/event-types';

  constructor(protected http: HttpClient) {}

  create(eventTypes: IEventTypes): Observable<EntityResponseType> {
    return this.http.post<IEventTypes>(this.resourceUrl, eventTypes, { observe: 'response' });
  }

  update(eventTypes: IEventTypes): Observable<EntityResponseType> {
    return this.http.put<IEventTypes>(this.resourceUrl, eventTypes, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEventTypes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEventTypes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
