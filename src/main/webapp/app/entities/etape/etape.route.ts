import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEtape, Etape } from 'app/shared/model/etape.model';
import { EtapeService } from './etape.service';
import { EtapeComponent } from './etape.component';
import { EtapeDetailComponent } from './etape-detail.component';
import { EtapeUpdateComponent } from './etape-update.component';

@Injectable({ providedIn: 'root' })
export class EtapeResolve implements Resolve<IEtape> {
  constructor(private service: EtapeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtape> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((etape: HttpResponse<Etape>) => {
          if (etape.body) {
            return of(etape.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Etape());
  }
}

export const etapeRoute: Routes = [
  {
    path: '',
    component: EtapeComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'keycloakSampleApp.etape.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EtapeDetailComponent,
    resolve: {
      etape: EtapeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.etape.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EtapeUpdateComponent,
    resolve: {
      etape: EtapeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.etape.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EtapeUpdateComponent,
    resolve: {
      etape: EtapeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.etape.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
