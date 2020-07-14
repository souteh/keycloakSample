import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITfj } from 'app/shared/model/tfj.model';

type EntityResponseType = HttpResponse<ITfj>;
type EntityArrayResponseType = HttpResponse<ITfj[]>;

@Injectable({ providedIn: 'root' })
export class TfjService {
  public resourceUrl = SERVER_API_URL + 'api/tfjs';

  constructor(protected http: HttpClient) {}

  create(tfj: ITfj): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tfj);
    return this.http
      .post<ITfj>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tfj: ITfj): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tfj);
    return this.http
      .put<ITfj>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITfj>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITfj[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tfj: ITfj): ITfj {
    const copy: ITfj = Object.assign({}, tfj, {
      datetfj: tfj.datetfj && tfj.datetfj.isValid() ? tfj.datetfj.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datetfj = res.body.datetfj ? moment(res.body.datetfj) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tfj: ITfj) => {
        tfj.datetfj = tfj.datetfj ? moment(tfj.datetfj) : undefined;
      });
    }
    return res;
  }
}
