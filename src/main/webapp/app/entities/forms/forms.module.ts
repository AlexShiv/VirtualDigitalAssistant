import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VirtualDigitalAssistantSharedModule } from 'app/shared/shared.module';
import { FormsComponent } from './forms.component';
import { FormsDetailComponent } from './forms-detail.component';
import { FormsUpdateComponent } from './forms-update.component';
import { FormsDeleteDialogComponent } from './forms-delete-dialog.component';
import { formsRoute } from './forms.route';

@NgModule({
  imports: [VirtualDigitalAssistantSharedModule, RouterModule.forChild(formsRoute)],
  declarations: [FormsComponent, FormsDetailComponent, FormsUpdateComponent, FormsDeleteDialogComponent],
  entryComponents: [FormsDeleteDialogComponent]
})
export class VirtualDigitalAssistantFormsModule {}
