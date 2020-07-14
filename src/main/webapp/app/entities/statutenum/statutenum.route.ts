import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStatutenum, Statutenum } from 'app/shared/model/statutenum.model';
import { StatutenumService } from './statutenum.service';
import { StatutenumComponent } from './statutenum.component';
import { StatutenumDetailComponent } from './statutenum-detail.component';
import { StatutenumUpdateComponent } from './statutenum-update.component';

@Injectable({ providedIn: 'root' })
export class StatutenumResolve implements Resolve<IStatutenum> {
  constructor(private service: StatutenumService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStatutenum> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((statutenum: HttpResponse<Statutenum>) => {
          if (statutenum.body) {
            return of(statutenum.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Statutenum());
  }
}

export const statutenumRoute: Routes = [
  {
    path: '',
    component: StatutenumComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'keycloakSampleApp.statutenum.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StatutenumDetailComponent,
    resolve: {
      statutenum: StatutenumResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.statutenum.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StatutenumUpdateComponent,
    resolve: {
      statutenum: StatutenumResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.statutenum.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StatutenumUpdateComponent,
    resolve: {
      statutenum: StatutenumResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.statutenum.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
