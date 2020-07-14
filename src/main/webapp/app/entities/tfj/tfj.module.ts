import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeycloakSampleSharedModule } from 'app/shared/shared.module';
import { TfjComponent } from './tfj.component';
import { TfjDetailComponent } from './tfj-detail.component';
import { TfjUpdateComponent } from './tfj-update.component';
import { TfjDeleteDialogComponent } from './tfj-delete-dialog.component';
import { tfjRoute } from './tfj.route';

@NgModule({
  imports: [KeycloakSampleSharedModule, RouterModule.forChild(tfjRoute)],
  declarations: [TfjComponent, TfjDetailComponent, TfjUpdateComponent, TfjDeleteDialogComponent],
  entryComponents: [TfjDeleteDialogComponent],
})
export class KeycloakSampleTfjModule {}
