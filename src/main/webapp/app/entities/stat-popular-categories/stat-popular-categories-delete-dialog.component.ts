import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStatPopularCategories } from 'app/shared/model/stat-popular-categories.model';
import { StatPopularCategoriesService } from './stat-popular-categories.service';

@Component({
  templateUrl: './stat-popular-categories-delete-dialog.component.html'
})
export class StatPopularCategoriesDeleteDialogComponent {
  statPopularCategories?: IStatPopularCategories;

  constructor(
    protected statPopularCategoriesService: StatPopularCategoriesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.statPopularCategoriesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('statPopularCategoriesListModification');
      this.activeModal.close();
    });
  }
}
