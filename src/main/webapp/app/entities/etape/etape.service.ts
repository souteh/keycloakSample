import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEtape } from 'app/shared/model/etape.model';

type EntityResponseType = HttpResponse<IEtape>;
type EntityArrayResponseType = HttpResponse<IEtape[]>;

@Injectable({ providedIn: 'root' })
export class EtapeService {
  public resourceUrl = SERVER_API_URL + 'api/etapes';

  constructor(protected http: HttpClient) {}

  create(etape: IEtape): Observable<EntityResponseType> {
    return this.http.post<IEtape>(this.resourceUrl, etape, { observe: 'response' });
  }

  update(etape: IEtape): Observable<EntityResponseType> {
    return this.http.put<IEtape>(this.resourceUrl, etape, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEtape>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEtape[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
