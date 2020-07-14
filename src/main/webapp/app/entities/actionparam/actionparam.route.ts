import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IActionparam, Actionparam } from 'app/shared/model/actionparam.model';
import { ActionparamService } from './actionparam.service';
import { ActionparamComponent } from './actionparam.component';
import { ActionparamDetailComponent } from './actionparam-detail.component';
import { ActionparamUpdateComponent } from './actionparam-update.component';

@Injectable({ providedIn: 'root' })
export class ActionparamResolve implements Resolve<IActionparam> {
  constructor(private service: ActionparamService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IActionparam> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((actionparam: HttpResponse<Actionparam>) => {
          if (actionparam.body) {
            return of(actionparam.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Actionparam());
  }
}

export const actionparamRoute: Routes = [
  {
    path: '',
    component: ActionparamComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'keycloakSampleApp.actionparam.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ActionparamDetailComponent,
    resolve: {
      actionparam: ActionparamResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.actionparam.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ActionparamUpdateComponent,
    resolve: {
      actionparam: ActionparamResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.actionparam.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ActionparamUpdateComponent,
    resolve: {
      actionparam: ActionparamResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.actionparam.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
