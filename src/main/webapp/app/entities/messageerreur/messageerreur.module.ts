import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeycloakSampleSharedModule } from 'app/shared/shared.module';
import { MessageerreurComponent } from './messageerreur.component';
import { MessageerreurDetailComponent } from './messageerreur-detail.component';
import { MessageerreurUpdateComponent } from './messageerreur-update.component';
import { MessageerreurDeleteDialogComponent } from './messageerreur-delete-dialog.component';
import { messageerreurRoute } from './messageerreur.route';

@NgModule({
  imports: [KeycloakSampleSharedModule, RouterModule.forChild(messageerreurRoute)],
  declarations: [MessageerreurComponent, MessageerreurDetailComponent, MessageerreurUpdateComponent, MessageerreurDeleteDialogComponent],
  entryComponents: [MessageerreurDeleteDialogComponent],
})
export class KeycloakSampleMessageerreurModule {}
