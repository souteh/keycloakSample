import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IActionparam } from 'app/shared/model/actionparam.model';

type EntityResponseType = HttpResponse<IActionparam>;
type EntityArrayResponseType = HttpResponse<IActionparam[]>;

@Injectable({ providedIn: 'root' })
export class ActionparamService {
  public resourceUrl = SERVER_API_URL + 'api/actionparams';

  constructor(protected http: HttpClient) {}

  create(actionparam: IActionparam): Observable<EntityResponseType> {
    return this.http.post<IActionparam>(this.resourceUrl, actionparam, { observe: 'response' });
  }

  update(actionparam: IActionparam): Observable<EntityResponseType> {
    return this.http.put<IActionparam>(this.resourceUrl, actionparam, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActionparam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IActionparam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
