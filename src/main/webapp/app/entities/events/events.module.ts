import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VirtualDigitalAssistantSharedModule } from 'app/shared/shared.module';
import { EventsComponent } from './events.component';
import { EventsDetailComponent } from './events-detail.component';
import { EventsUpdateComponent } from './events-update.component';
import { EventsDeleteDialogComponent } from './events-delete-dialog.component';
import { eventsRoute } from './events.route';

@NgModule({
  imports: [VirtualDigitalAssistantSharedModule, RouterModule.forChild(eventsRoute)],
  declarations: [EventsComponent, EventsDetailComponent, EventsUpdateComponent, EventsDeleteDialogComponent],
  entryComponents: [EventsDeleteDialogComponent]
})
export class VirtualDigitalAssistantEventsModule {}
