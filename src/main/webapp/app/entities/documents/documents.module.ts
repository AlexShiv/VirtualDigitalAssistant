import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VirtualDigitalAssistantSharedModule } from 'app/shared/shared.module';
import { DocumentsComponent } from './documents.component';
import { DocumentsDetailComponent } from './documents-detail.component';
import { DocumentsUpdateComponent } from './documents-update.component';
import { DocumentsDeleteDialogComponent } from './documents-delete-dialog.component';
import { documentsRoute } from './documents.route';

@NgModule({
  imports: [VirtualDigitalAssistantSharedModule, RouterModule.forChild(documentsRoute)],
  declarations: [DocumentsComponent, DocumentsDetailComponent, DocumentsUpdateComponent, DocumentsDeleteDialogComponent],
  entryComponents: [DocumentsDeleteDialogComponent]
})
export class VirtualDigitalAssistantDocumentsModule {}
