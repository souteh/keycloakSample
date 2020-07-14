import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMessageerreur, Messageerreur } from 'app/shared/model/messageerreur.model';
import { MessageerreurService } from './messageerreur.service';
import { MessageerreurComponent } from './messageerreur.component';
import { MessageerreurDetailComponent } from './messageerreur-detail.component';
import { MessageerreurUpdateComponent } from './messageerreur-update.component';

@Injectable({ providedIn: 'root' })
export class MessageerreurResolve implements Resolve<IMessageerreur> {
  constructor(private service: MessageerreurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMessageerreur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((messageerreur: HttpResponse<Messageerreur>) => {
          if (messageerreur.body) {
            return of(messageerreur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Messageerreur());
  }
}

export const messageerreurRoute: Routes = [
  {
    path: '',
    component: MessageerreurComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'keycloakSampleApp.messageerreur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MessageerreurDetailComponent,
    resolve: {
      messageerreur: MessageerreurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.messageerreur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MessageerreurUpdateComponent,
    resolve: {
      messageerreur: MessageerreurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.messageerreur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MessageerreurUpdateComponent,
    resolve: {
      messageerreur: MessageerreurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keycloakSampleApp.messageerreur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
