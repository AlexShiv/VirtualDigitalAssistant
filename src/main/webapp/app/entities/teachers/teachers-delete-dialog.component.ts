import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeachers } from 'app/shared/model/teachers.model';
import { TeachersService } from './teachers.service';

@Component({
  templateUrl: './teachers-delete-dialog.component.html'
})
export class TeachersDeleteDialogComponent {
  teachers?: ITeachers;

  constructor(protected teachersService: TeachersService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.teachersService.delete(id).subscribe(() => {
      this.eventManager.broadcast('teachersListModification');
      this.activeModal.close();
    });
  }
}
