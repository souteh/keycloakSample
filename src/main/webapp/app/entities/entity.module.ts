import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'action',
        loadChildren: () => import('./action/action.module').then(m => m.KeycloakSampleActionModule),
      },
      {
        path: 'actionparam',
        loadChildren: () => import('./actionparam/actionparam.module').then(m => m.KeycloakSampleActionparamModule),
      },
      {
        path: 'etape',
        loadChildren: () => import('./etape/etape.module').then(m => m.KeycloakSampleEtapeModule),
      },
      {
        path: 'etapeparam',
        loadChildren: () => import('./etapeparam/etapeparam.module').then(m => m.KeycloakSampleEtapeparamModule),
      },
      {
        path: 'messageerreur',
        loadChildren: () => import('./messageerreur/messageerreur.module').then(m => m.KeycloakSampleMessageerreurModule),
      },
      {
        path: 'statutenum',
        loadChildren: () => import('./statutenum/statutenum.module').then(m => m.KeycloakSampleStatutenumModule),
      },
      {
        path: 'tfj',
        loadChildren: () => import('./tfj/tfj.module').then(m => m.KeycloakSampleTfjModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class KeycloakSampleEntityModule {}
