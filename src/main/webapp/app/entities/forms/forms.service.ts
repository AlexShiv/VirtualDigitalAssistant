import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IForms } from 'app/shared/model/forms.model';

type EntityResponseType = HttpResponse<IForms>;
type EntityArrayResponseType = HttpResponse<IForms[]>;

@Injectable({ providedIn: 'root' })
export class FormsService {
  public resourceUrl = SERVER_API_URL + 'api/forms';

  constructor(protected http: HttpClient) {}

  create(forms: IForms): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(forms);
    return this.http
      .post<IForms>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(forms: IForms): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(forms);
    return this.http
      .put<IForms>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IForms>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IForms[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(forms: IForms): IForms {
    const copy: IForms = Object.assign({}, forms, {
      createDate: forms.createDate && forms.createDate.isValid() ? forms.createDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createDate = res.body.createDate ? moment(res.body.createDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((forms: IForms) => {
        forms.createDate = forms.createDate ? moment(forms.createDate) : undefined;
      });
    }
    return res;
  }
}
