import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeycloakSampleSharedModule } from 'app/shared/shared.module';
import { EtapeComponent } from './etape.component';
import { EtapeDetailComponent } from './etape-detail.component';
import { EtapeUpdateComponent } from './etape-update.component';
import { EtapeDeleteDialogComponent } from './etape-delete-dialog.component';
import { etapeRoute } from './etape.route';

@NgModule({
  imports: [KeycloakSampleSharedModule, RouterModule.forChild(etapeRoute)],
  declarations: [EtapeComponent, EtapeDetailComponent, EtapeUpdateComponent, EtapeDeleteDialogComponent],
  entryComponents: [EtapeDeleteDialogComponent],
})
export class KeycloakSampleEtapeModule {}
