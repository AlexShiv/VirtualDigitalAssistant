import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VirtualDigitalAssistantSharedModule } from 'app/shared/shared.module';
import { StatPopularCategoriesComponent } from './stat-popular-categories.component';
import { StatPopularCategoriesDetailComponent } from './stat-popular-categories-detail.component';
import { StatPopularCategoriesUpdateComponent } from './stat-popular-categories-update.component';
import { StatPopularCategoriesDeleteDialogComponent } from './stat-popular-categories-delete-dialog.component';
import { statPopularCategoriesRoute } from './stat-popular-categories.route';

@NgModule({
  imports: [VirtualDigitalAssistantSharedModule, RouterModule.forChild(statPopularCategoriesRoute)],
  declarations: [
    StatPopularCategoriesComponent,
    StatPopularCategoriesDetailComponent,
    StatPopularCategoriesUpdateComponent,
    StatPopularCategoriesDeleteDialogComponent
  ],
  entryComponents: [StatPopularCategoriesDeleteDialogComponent]
})
export class VirtualDigitalAssistantStatPopularCategoriesModule {}
