import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VirtualDigitalAssistantSharedModule } from 'app/shared/shared.module';
import { StatCorrectAnswersComponent } from './stat-correct-answers.component';
import { StatCorrectAnswersDetailComponent } from './stat-correct-answers-detail.component';
import { StatCorrectAnswersUpdateComponent } from './stat-correct-answers-update.component';
import { StatCorrectAnswersDeleteDialogComponent } from './stat-correct-answers-delete-dialog.component';
import { statCorrectAnswersRoute } from './stat-correct-answers.route';

@NgModule({
  imports: [VirtualDigitalAssistantSharedModule, RouterModule.forChild(statCorrectAnswersRoute)],
  declarations: [
    StatCorrectAnswersComponent,
    StatCorrectAnswersDetailComponent,
    StatCorrectAnswersUpdateComponent,
    StatCorrectAnswersDeleteDialogComponent
  ],
  entryComponents: [StatCorrectAnswersDeleteDialogComponent]
})
export class VirtualDigitalAssistantStatCorrectAnswersModule {}
