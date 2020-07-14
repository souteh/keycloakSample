import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAction } from 'app/shared/model/action.model';

type EntityResponseType = HttpResponse<IAction>;
type EntityArrayResponseType = HttpResponse<IAction[]>;

@Injectable({ providedIn: 'root' })
export class ActionService {
  public resourceUrl = SERVER_API_URL + 'api/actions';

  constructor(protected http: HttpClient) {}

  create(action: IAction): Observable<EntityResponseType> {
    return this.http.post<IAction>(this.resourceUrl, action, { observe: 'response' });
  }

  update(action: IAction): Observable<EntityResponseType> {
    return this.http.put<IAction>(this.resourceUrl, action, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
