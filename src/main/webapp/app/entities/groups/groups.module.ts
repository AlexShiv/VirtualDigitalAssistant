import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VirtualDigitalAssistantSharedModule } from 'app/shared/shared.module';
import { GroupsComponent } from './groups.component';
import { GroupsDetailComponent } from './groups-detail.component';
import { GroupsUpdateComponent } from './groups-update.component';
import { GroupsDeleteDialogComponent } from './groups-delete-dialog.component';
import { groupsRoute } from './groups.route';

@NgModule({
  imports: [VirtualDigitalAssistantSharedModule, RouterModule.forChild(groupsRoute)],
  declarations: [GroupsComponent, GroupsDetailComponent, GroupsUpdateComponent, GroupsDeleteDialogComponent],
  entryComponents: [GroupsDeleteDialogComponent]
})
export class VirtualDigitalAssistantGroupsModule {}
