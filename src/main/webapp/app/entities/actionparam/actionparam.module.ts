import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeycloakSampleSharedModule } from 'app/shared/shared.module';
import { ActionparamComponent } from './actionparam.component';
import { ActionparamDetailComponent } from './actionparam-detail.component';
import { ActionparamUpdateComponent } from './actionparam-update.component';
import { ActionparamDeleteDialogComponent } from './actionparam-delete-dialog.component';
import { actionparamRoute } from './actionparam.route';

@NgModule({
  imports: [KeycloakSampleSharedModule, RouterModule.forChild(actionparamRoute)],
  declarations: [ActionparamComponent, ActionparamDetailComponent, ActionparamUpdateComponent, ActionparamDeleteDialogComponent],
  entryComponents: [ActionparamDeleteDialogComponent],
})
export class KeycloakSampleActionparamModule {}
