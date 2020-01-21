import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VirtualDigitalAssistantSharedModule } from 'app/shared/shared.module';
import { TeachersComponent } from './teachers.component';
import { TeachersDetailComponent } from './teachers-detail.component';
import { TeachersUpdateComponent } from './teachers-update.component';
import { TeachersDeleteDialogComponent } from './teachers-delete-dialog.component';
import { teachersRoute } from './teachers.route';

@NgModule({
  imports: [VirtualDigitalAssistantSharedModule, RouterModule.forChild(teachersRoute)],
  declarations: [TeachersComponent, TeachersDetailComponent, TeachersUpdateComponent, TeachersDeleteDialogComponent],
  entryComponents: [TeachersDeleteDialogComponent]
})
export class VirtualDigitalAssistantTeachersModule {}
