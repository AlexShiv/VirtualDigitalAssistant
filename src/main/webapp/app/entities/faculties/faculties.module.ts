import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VirtualDigitalAssistantSharedModule } from 'app/shared/shared.module';
import { FacultiesComponent } from './faculties.component';
import { FacultiesDetailComponent } from './faculties-detail.component';
import { FacultiesUpdateComponent } from './faculties-update.component';
import { FacultiesDeleteDialogComponent } from './faculties-delete-dialog.component';
import { facultiesRoute } from './faculties.route';

@NgModule({
  imports: [VirtualDigitalAssistantSharedModule, RouterModule.forChild(facultiesRoute)],
  declarations: [FacultiesComponent, FacultiesDetailComponent, FacultiesUpdateComponent, FacultiesDeleteDialogComponent],
  entryComponents: [FacultiesDeleteDialogComponent]
})
export class VirtualDigitalAssistantFacultiesModule {}
