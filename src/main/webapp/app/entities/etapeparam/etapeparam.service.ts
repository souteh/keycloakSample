import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEtapeparam } from 'app/shared/model/etapeparam.model';

type EntityResponseType = HttpResponse<IEtapeparam>;
type EntityArrayResponseType = HttpResponse<IEtapeparam[]>;

@Injectable({ providedIn: 'root' })
export class EtapeparamService {
  public resourceUrl = SERVER_API_URL + 'api/etapeparams';

  constructor(protected http: HttpClient) {}

  create(etapeparam: IEtapeparam): Observable<EntityResponseType> {
    return this.http.post<IEtapeparam>(this.resourceUrl, etapeparam, { observe: 'response' });
  }

  update(etapeparam: IEtapeparam): Observable<EntityResponseType> {
    return this.http.put<IEtapeparam>(this.resourceUrl, etapeparam, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEtapeparam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEtapeparam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
