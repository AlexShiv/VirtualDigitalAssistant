import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VirtualDigitalAssistantSharedModule } from 'app/shared/shared.module';
import { ClientsComponent } from './clients.component';
import { ClientsDetailComponent } from './clients-detail.component';
import { ClientsUpdateComponent } from './clients-update.component';
import { ClientsDeleteDialogComponent } from './clients-delete-dialog.component';
import { clientsRoute } from './clients.route';

@NgModule({
  imports: [VirtualDigitalAssistantSharedModule, RouterModule.forChild(clientsRoute)],
  declarations: [ClientsComponent, ClientsDetailComponent, ClientsUpdateComponent, ClientsDeleteDialogComponent],
  entryComponents: [ClientsDeleteDialogComponent]
})
export class VirtualDigitalAssistantClientsModule {}
