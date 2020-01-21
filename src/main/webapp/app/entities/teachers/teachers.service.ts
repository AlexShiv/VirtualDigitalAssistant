import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITeachers } from 'app/shared/model/teachers.model';

type EntityResponseType = HttpResponse<ITeachers>;
type EntityArrayResponseType = HttpResponse<ITeachers[]>;

@Injectable({ providedIn: 'root' })
export class TeachersService {
  public resourceUrl = SERVER_API_URL + 'api/teachers';

  constructor(protected http: HttpClient) {}

  create(teachers: ITeachers): Observable<EntityResponseType> {
    return this.http.post<ITeachers>(this.resourceUrl, teachers, { observe: 'response' });
  }

  update(teachers: ITeachers): Observable<EntityResponseType> {
    return this.http.put<ITeachers>(this.resourceUrl, teachers, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITeachers>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITeachers[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
