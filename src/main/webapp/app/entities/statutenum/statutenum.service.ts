import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStatutenum } from 'app/shared/model/statutenum.model';

type EntityResponseType = HttpResponse<IStatutenum>;
type EntityArrayResponseType = HttpResponse<IStatutenum[]>;

@Injectable({ providedIn: 'root' })
export class StatutenumService {
  public resourceUrl = SERVER_API_URL + 'api/statutenums';

  constructor(protected http: HttpClient) {}

  create(statutenum: IStatutenum): Observable<EntityResponseType> {
    return this.http.post<IStatutenum>(this.resourceUrl, statutenum, { observe: 'response' });
  }

  update(statutenum: IStatutenum): Observable<EntityResponseType> {
    return this.http.put<IStatutenum>(this.resourceUrl, statutenum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStatutenum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStatutenum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
