import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEtapeparam, Etapeparam } from 'app/shared/model/etapeparam.model';
import { EtapeparamService } from './etapeparam.service';
import { EtapeparamComponent } from './etapeparam.component';
import { EtapeparamDetailComponent } from './etapeparam-detail.component';
import { EtapeparamUpdateComponent } from './etapeparam-update.component';

@Injectable({ providedIn: 'root' })
export class EtapeparamResolve implements Resolve<IEtapeparam> {
  constructor(private service: EtapeparamService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtapeparam> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((etapeparam: HttpResponse<Etapeparam>) => {
          if (etapeparam.body) {
            return of(etapeparam.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Etapeparam());
  }
}

export const etapeparamRoute: Routes = [
  {
    path: '',
    component: EtapeparamComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'keycloakSampleApp.etapeparam.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EtapeparamDetailComponent,
    resolve: {
      etapeparam: EtapeparamResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.etapeparam.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EtapeparamUpdateComponent,
    resolve: {
      etapeparam: EtapeparamResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.etapeparam.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EtapeparamUpdateComponent,
    resolve: {
      etapeparam: EtapeparamResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.etapeparam.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
