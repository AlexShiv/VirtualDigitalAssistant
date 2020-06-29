import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStatCorrectAnswers } from 'app/shared/model/stat-correct-answers.model';

type EntityResponseType = HttpResponse<IStatCorrectAnswers>;
type EntityArrayResponseType = HttpResponse<IStatCorrectAnswers[]>;

@Injectable({ providedIn: 'root' })
export class StatCorrectAnswersService {
  public resourceUrl = SERVER_API_URL + 'api/stat-correct-answers';

  constructor(protected http: HttpClient) {}

  create(statCorrectAnswers: IStatCorrectAnswers): Observable<EntityResponseType> {
    return this.http.post<IStatCorrectAnswers>(this.resourceUrl, statCorrectAnswers, { observe: 'response' });
  }

  update(statCorrectAnswers: IStatCorrectAnswers): Observable<EntityResponseType> {
    return this.http.put<IStatCorrectAnswers>(this.resourceUrl, statCorrectAnswers, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStatCorrectAnswers>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStatCorrectAnswers[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
