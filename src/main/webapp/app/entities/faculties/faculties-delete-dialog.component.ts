import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFaculties } from 'app/shared/model/faculties.model';
import { FacultiesService } from './faculties.service';

@Component({
  templateUrl: './faculties-delete-dialog.component.html'
})
export class FacultiesDeleteDialogComponent {
  faculties?: IFaculties;

  constructor(protected facultiesService: FacultiesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.facultiesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('facultiesListModification');
      this.activeModal.close();
    });
  }
}
