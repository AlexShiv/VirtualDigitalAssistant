import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VirtualDigitalAssistantSharedModule } from 'app/shared/shared.module';
import { EventTypesComponent } from './event-types.component';
import { EventTypesDetailComponent } from './event-types-detail.component';
import { EventTypesUpdateComponent } from './event-types-update.component';
import { EventTypesDeleteDialogComponent } from './event-types-delete-dialog.component';
import { eventTypesRoute } from './event-types.route';

@NgModule({
  imports: [VirtualDigitalAssistantSharedModule, RouterModule.forChild(eventTypesRoute)],
  declarations: [EventTypesComponent, EventTypesDetailComponent, EventTypesUpdateComponent, EventTypesDeleteDialogComponent],
  entryComponents: [EventTypesDeleteDialogComponent]
})
export class VirtualDigitalAssistantEventTypesModule {}
