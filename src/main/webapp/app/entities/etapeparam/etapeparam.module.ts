import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeycloakSampleSharedModule } from 'app/shared/shared.module';
import { EtapeparamComponent } from './etapeparam.component';
import { EtapeparamDetailComponent } from './etapeparam-detail.component';
import { EtapeparamUpdateComponent } from './etapeparam-update.component';
import { EtapeparamDeleteDialogComponent } from './etapeparam-delete-dialog.component';
import { etapeparamRoute } from './etapeparam.route';

@NgModule({
  imports: [KeycloakSampleSharedModule, RouterModule.forChild(etapeparamRoute)],
  declarations: [EtapeparamComponent, EtapeparamDetailComponent, EtapeparamUpdateComponent, EtapeparamDeleteDialogComponent],
  entryComponents: [EtapeparamDeleteDialogComponent],
})
export class KeycloakSampleEtapeparamModule {}
