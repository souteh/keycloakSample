import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeycloakSampleSharedModule } from 'app/shared/shared.module';
import { StatutenumComponent } from './statutenum.component';
import { StatutenumDetailComponent } from './statutenum-detail.component';
import { StatutenumUpdateComponent } from './statutenum-update.component';
import { StatutenumDeleteDialogComponent } from './statutenum-delete-dialog.component';
import { statutenumRoute } from './statutenum.route';

@NgModule({
  imports: [KeycloakSampleSharedModule, RouterModule.forChild(statutenumRoute)],
  declarations: [StatutenumComponent, StatutenumDetailComponent, StatutenumUpdateComponent, StatutenumDeleteDialogComponent],
  entryComponents: [StatutenumDeleteDialogComponent],
})
export class KeycloakSampleStatutenumModule {}
